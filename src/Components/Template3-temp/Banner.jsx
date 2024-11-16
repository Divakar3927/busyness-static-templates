import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handleSuccess, handleError } from '../Toast';
import imageCompression from 'browser-image-compression';
import { logoutTemp1, logoutTemp3 } from '../../constants/auth';
import "../../assets/css/main.css";
import shapeSix from '../../assets/images/shape/shape-6.png';
import shapeSeven from '../../assets/images/shape/shape-7.png';
import shapeEight from '../../assets/images/shape/shape-8.png';
import useReloadingButton from '../useReloadingButton';
import { FaCheck } from 'react-icons/fa';

const Banner = ({isAdminTemp3}) => {
    const [products, setProducts] = useState([]);
    const [nestedImages, setNestedImages] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [formData, setFormData] = useState({
        id: '',
        title:'',
        nestedImages: [],
    });
    const [newTestimonialMode, setNewTestimonialMode] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [imageUpload, setImageUpload] = useState(false);
    const editModalRef = useRef(null);
    const addModalRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (editModalRef.current && !editModalRef.current.contains(event.target)) {
                setEditMode(false);
            }
            if (addModalRef.current && !addModalRef.current.contains(event.target)) {
                setNewTestimonialMode(false);
            }
        };
      
        if (editMode || newTestimonialMode) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
      
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [editMode, newTestimonialMode]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const domain = window.location.hostname;
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/BannerPage`, {
                headers: { 'X-Frontend-Domain': domain },
            });
            const data = res.data;
            setProducts(data);
            setNestedImages(data[0]?.nestedImages || []);
            if (data.length > 0) {
                setFormData({
                    id: data[0]._id,
                    title: data[0].title,
                    nestedImages: data[0].nestedImages,
                });
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleNestedFieldChange = (e, index, fieldName) => {
        const updatedImages = [...nestedImages];
        const image = updatedImages.find((img) => img.index === index);
        if (image) {
            image[fieldName] = e.target.value;
            setNestedImages(updatedImages);
            setFormData((prev) => ({
                ...prev,
                nestedImages: updatedImages,
            }));
        }
    };

    const handleFileChange = async (e, index) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setImageUpload(true);
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 850,
                    useWebWorker: true,
                };
                const compressedFile = await imageCompression(file, options);
                setSelectedFiles((prevFiles) => ({
                    ...prevFiles,
                    [index]: compressedFile,
                }));
                setImageUpload(false);
            } catch (error) {
                console.error('Error compressing file:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const updateFormData = new FormData();
        updateFormData.append('title', formData.title);
        nestedImages.forEach((image) => {
            if (selectedFiles[image.index]) {
                updateFormData.append(`images_${image.index}`, selectedFiles[image.index]);
            }
            updateFormData.append(`description1_${image.index}`, image.description1);
            updateFormData.append(`description2_${image.index}`, image.description2);
            updateFormData.append(`banner_${image.index}`, image.banner);
        });
        
        const token = localStorage.getItem('token_temp_3');
        try {
            const domain = window.location.hostname;
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/BannerPage/update`, updateFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                    'X-Frontend-Domain': domain,
                },
            }).catch(error => {
                if (error.response.status === 401) {
                    logoutTemp3();
                }
            });
            fetchProducts();
            setEditMode(false);
            setSelectedFiles({});
            handleSuccess();
            closeForm();
        } catch (error) {
            console.error('Error updating content:', error);
            handleError();
        } finally {
            setLoading(false);
        }
    };

    const closeForm = () => {
        setEditMode(false);
        setSelectedFiles({});
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const deleteTestimonials = async (idToDelete) => {
        const token = localStorage.getItem('token_temp_3');
        try {
            const domain = window.location.hostname;
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/BannerPage/deleteData/${idToDelete}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Frontend-Domain': domain,
                },
            });
            fetchProducts();  // Re-fetch the testimonials after deletion
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            if (error.response.status === 401) {
                // Token has expired, log the user out
                logoutTemp3();
            }
            handleError();
        }
    };


    
    const openNewTestimonialForm = () => {
        setNewTestimonialMode(true);
        setFormData({ new_name: '', new_description: '', new_rating: '' }); // Reset form for new data
    };

    const handleNewTestimonialSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            const newFormData = new FormData();

            newFormData.append('new_description1', formData.new_description1);
            newFormData.append('new_description2', formData.new_description2);
            newFormData.append('new_banner', formData.new_banner);
            
            if (selectedFiles['new_image']) {
                newFormData.append('new_image', selectedFiles['new_image']);
            } else {
                console.error('Image file is required');
                setLoading(false);
                return;
            }

            const token = localStorage.getItem('token_temp_3');
            try {
                const domain = window.location.hostname;
                const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/BannerPage/addNewData`, newFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                        'X-Frontend-Domain': domain,
                    },
                });

                fetchProducts(); // Re-fetch the products (testimonials)
                setNewTestimonialMode(false); // Close the form
                setSelectedFiles({}); // Clear the file input
                handleSuccess(); // Success toast
            } catch (error) {
                console.error('Error adding new testimonial:', error);
                if (error.response.status === 401) {
                    // Token has expired, log the user out
                    logoutTemp3();
                }
                handleError(); // Error toast
            } finally {
                setLoading(false);
            }
        };
        const { buttonText, isDisabled, handleClick } = useReloadingButton(handleSubmit);
        const handleBannerSelect = (bannerIndex, imageIndex) => {
            const updatedImages = [...nestedImages];
            const image = updatedImages.find((img) => img.index === imageIndex);
        
            if (image) {
                // Set the new banner index
                image.banner = bannerIndex;
                setNestedImages(updatedImages);
        
                // Update the formData with the modified nestedImages array
                setFormData((prev) => ({
                    ...prev,
                    nestedImages: updatedImages,
                }));
            }
        };
        
        const totalBanners = 33; // Total number of banners per card
        const initialDisplayCount = 5; // Initial number of banners to display per card
    
        // State for tracking display counts for each card by index
        const [displayCounts, setDisplayCounts] = useState({}); // Holds display counts for each image index
    
        // Toggle "Show More" and "Show Less" functionality for each card
        const toggleShowBanners = (imageIndex) => {
            setDisplayCounts((prevCounts) => ({
                ...prevCounts,
                [imageIndex]: (prevCounts[imageIndex] || initialDisplayCount) < totalBanners
                    ? totalBanners // Show all banners if not all are currently shown
                    : initialDisplayCount, // Otherwise, revert to the initial display count
            }));
        };
    return (
        <>
            <section className='appie-features-area-2 pt-100'>
            {isAdminTemp3 && 
                (<div className="position-absolute" style={{ 
                    right: 20, top:20, zIndex:100
                    }}>
                    <button className="btn btn-primary" onClick={() => setEditMode(!editMode)}>Edit</button>
                    {nestedImages.length>=5 ? " ":(<button className="btn btn-success ml-2" 
                        onClick={() => openNewTestimonialForm()}>
                            Add New Testimonial</button>)} 
                            {/* Add button */}
                </div>)}
                {newTestimonialMode && (
                    <div
                        style={{
                            position: 'fixed',
                            inset: '0',
                            zIndex: 9999,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <div
                            ref={addModalRef}
                            style={{
                                position: 'relative',
                                backgroundColor: 'white',
                                padding: '24px',
                                borderRadius: '0.375rem',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                maxWidth: '800px',
                                width: '100%',
                                overflowY: 'auto',
                                maxHeight: '70vh',
                                marginTop: '2.5rem',
                            }}
                        >
                            <button
                                style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    color: '#dc3545',
                                    fontWeight: 'bold',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setNewTestimonialMode(false)}
                            >
                                <span className='close'></span>
                            </button>

                            <form onSubmit={handleNewTestimonialSubmit}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                                    Add New Testimonial
                                </h3>

                                {/* Name Input
                                <input
                                    type="text"
                                    name="new_title"
                                    placeholder="Enter page Title (max 30 characters)"
                                    value={formData.new_title || ''}
                                    maxLength={30}
                                    onChange={handleInputChange}
                                    className="form-control mb-3"
                                    required
                                /> */}

                                {/* Description Input */}
                                <input
                                    name="new_description1"
                                    placeholder="Banner Title  (max 30 characters)"
                                    value={formData.new_description1 || ''}
                                    onChange={handleInputChange}
                                    maxLength={30}
                                    className="form-control mb-3"
                                    rows="4"
                                    required
                                />
                                 <input
                                    name="new_description2"
                                    placeholder="Banner Code or Description  (max 30 characters)"
                                    value={formData.new_description2 || ''}
                                    onChange={handleInputChange}
                                    maxLength={30}
                                    className="form-control mb-3"
                                    rows="4"
                                    required
                                />

                                {/* Rating Input */}
                                <input
                                    type="number"
                                    name="new_banner"
                                    placeholder="banner"
                                    value={formData.new_banner|| ''}
                                    onChange={handleInputChange}
                                    className="form-control mb-3"
                                    min="1"
                                    max="5"
                                    required
                                />

                                {/* Image Upload Input */}
                                <input
                                    type="file"
                                    name="new_image"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'new_image')}
                                    className="form-control mb-3"
                                    required
                                />

                                <button
                                    type="submit"
                                    style={{
                                        marginTop: '1rem',
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        padding: '10px',
                                        borderRadius: '0.375rem',
                                        width: '100%',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s',
                                    }}
                                >
                                    {loading ? 'Saving...' : 'Add Testimonial'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}


{editMode && (
    <div
        style={{
            position: 'fixed',
            inset: '0',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
    >
        <div
            ref={editModalRef}
            style={{
                position: 'relative',
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                maxWidth: '1000px',
                width: '100%',
                overflowY: 'auto',
                maxHeight: '70vh',
                marginTop: '2.5rem',
            }}
        >
            <button
                style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    color: '#dc3545',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onClick={closeForm}
            >
                <span className='close'></span>
            </button>

            <form onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="row mb-3 align-items-center">
                    <label className="col-form-label fw-bold col-auto">
                        Update title: <small>(max 25 characters)</small>
                    </label>
                    <div className="col">
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            maxLength={25}
                            className="form-control"
                            required
                        />
                    </div>
                </div>

                <h3 className="fw-bold mb-4">Update Images:</h3>
                {nestedImages.sort((a, b) => a.index - b.index).map((image) => (
                    <div key={image.index} className="border rounded p-3 mb-3 col gap-3 align-items-center" style={{ position: 'relative' }}>
                        {/* Thumbnail Preview */}
                        <div className="row-auto text-center">
                            <img
                                src={`${image.imageUrl.replace(/\\/g, '/')}`}
                                alt={image.name}
                                className="img-thumbnail"
                                style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                            />
                            {/* Delete Button */}
                            {nestedImages.length > 1 && (
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                    }}
                                    onClick={() => deleteTestimonials(image.index)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div className="col">
                            <label className="fw-bold m-2">Update Image:</label>
                            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, image.index)} className="form-control-file" />
                            {selectedFiles[image.index] && <div className="text-success mt-1"><FaCheck /></div>}
                        </div>

                        {/* Banner Selection Section */}
                        <div className="col d-flex flex-wrap gap-2 mt-2">
                            {/* {Array.from({ length: 33 }).map((_, idx)  */}
                            {Array.from({ length: totalBanners })
                            .slice(0, displayCounts[image.index] || initialDisplayCount)
                            .map((_, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleBannerSelect(idx + 1, image.index)}
                                    className={`p-1 rounded shadow-sm ${image.banner === idx + 1 ? 'border-primary border-3' : 'border'}`}
                                    style={{
                                        border: image.banner === idx + 1 ? '3px solid #007bff' : '1px solid #ced4da',
                                        cursor: 'pointer',
                                        padding: '5px',
                                        borderRadius: '0.375rem',
                                        boxShadow: image.banner === idx + 1 ? '0 0 5px #007bff' : 'none',
                                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                    }}
                                >
                                    <img
                                        src={`https://busynesss3practise.s3.ap-south-1.amazonaws.com/Orange+Easter+Sale+Facebook+Fundraiser+Cover+Photo+(1)/${idx + 1}.png`}
                                        alt={`Banner ${idx + 1}`}
                                        className="rounded"
                                        style={{
                                            width: '100px',
                                            height: '60px',
                                            objectFit: 'cover',
                                            opacity: image.banner === idx + 1 ? 1 : 0.7,
                                            transform: image.banner === idx + 1 ? 'scale(1.05)' : 'scale(1)',
                                        }}
                                    />
                                </div>
                            ))}
                        
                        {/* Show More / Show Less button */}
                        <button
                            type="button"
                            onClick={() => toggleShowBanners(image.index)}
                            className="btn btn-link text-primary mt-3"
                        >
                            {displayCounts[image.index] === totalBanners ? 'Show Less' : 'Show More'}
                        </button>
                        </div>

                        {/* Text Input Fields */}
                        <div className="col">
                            <label className="fw-bold mt-2">Update Banner title: <small>(max 25 characters)</small></label>
                            <input
                                type="text"
                                value={image.description1}
                                onChange={(e) => handleNestedFieldChange(e, image.index, 'description1')}
                                maxLength={25}
                                className="form-control mt-1"
                                required
                            />
                            <label className="fw-bold mt-2">Update Banner code or description: <small>(max 25 characters)</small></label>
                            <input
                                type="text"
                                value={image.description2}
                                onChange={(e) => handleNestedFieldChange(e, image.index, 'description2')}
                                maxLength={25}
                                className="form-control mt-1"
                                required
                            />
                        </div>
                    </div>
                ))}

                {/* Submit Button */}
                {imageUpload ? 'Compressing Image...' : (<button
                    type="submit"
                    onClick={handleClick}
                    disabled={isDisabled}
                    className={`btn mt-3 w-100 ${isDisabled ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ transition: 'background-color 0.2s' }}
                >
                  {buttonText}
                </button>) }
                
            </form>
        </div>
    </div>
)}



                <div>
                <div className="row mb-4">
                    <div className="col-lg-12 text-center">
                        <h2 className="special-offer-title" style={{ color: 'white' }}>
                            {products[0]?.title}
                        </h2>
                    </div>
                </div>
                <Slider {...settings}>
                        {nestedImages.map((item, index) => (
                            <div key={index}>
                          
                                    <div className="container mt-5">
                                        <div
                                            className="row align-items-center appie-project-box pt-10 banner-container"
                                            style={{
                                                backgroundImage: `url("https://busynesss3practise.s3.ap-south-1.amazonaws.com/Orange+Easter+Sale+Facebook+Fundraiser+Cover+Photo+(1)/${nestedImages[index]?.banner}.png")`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        >
                                            <div className="col-lg-6 col-md-6 order-lg-1 order-2">
                                                <div className="appie-project-content">
                                                    <h3 className="title">{nestedImages[index]?.description1}</h3>
                                                    <p>{nestedImages[index]?.description2}</p>
                                                    <div className="team-btn mt-50">
                                                        <a className="main-btn" href="#">
                                                            <span style={{ fontWeight: 'bold', color: '#fff' }}>Order Now</span>
                                                            <i className="fal fa-arrow-right" style={{ color: '#fff' }} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 order-lg-2 order-1 text-center d-flex justify-content-center align-items-center">
                                                <div className="appie-project-thumb mt-3">
                                                    <img
                                                        src={nestedImages[index]?.imageUrl}
                                                        alt={item.title}
                                                        className="img-fluid responsive-img"
                                                        style={{
                                                            maxHeight: '300px',
                                                            maxWidth: '100%',
                                                            width: 'auto',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                            </div>
                        ))}
                    </Slider>



                <div className="features-shape-1">
                    <img src={shapeSix} alt="" />
                </div>
                <div className="features-shape-2">
                    <img src={shapeSeven} alt="" />
                </div>
                <div className="features-shape-3">
                    <img src={shapeEight} alt="" />
                </div>
                </div>
            </section>
        </>
    );
};

export default Banner;
