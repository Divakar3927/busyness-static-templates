import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handleSuccess, handleError } from './Toast';
import imageCompression from 'browser-image-compression';
import { logoutTemp1, logoutTemp3 } from '../../constants/auth';
import "../../assets/css/main.css";
import shapeSix from '../../assets/images/shape/shape-6.png';
import shapeSeven from '../../assets/images/shape/shape-7.png';
import shapeEight from '../../assets/images/shape/shape-8.png';
import useReloadingButton from '../useReloadingButton';
import { FaCheck } from 'react-icons/fa';

const Banner = ({isAdmin}) => {
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
            const res = await axios.get('http://localhost:3000/api/BannerPage', {
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
        
        const token = localStorage.getItem('token');
        try {
            const domain = window.location.hostname;
            await axios.post('http://localhost:3000/api/BannerPage/update', updateFormData, {
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
        const token = localStorage.getItem('token');
        try {
            const domain = window.location.hostname;
            await axios.delete(`http://localhost:3000/api/BannerPage/deleteData/${idToDelete}`, {
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

            const token = localStorage.getItem('token');
            try {
                const domain = window.location.hostname;
                const res = await axios.post('http://localhost:3000/api/BannerPage/addNewData', newFormData, {
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
            <section className='h-150' id="banner">
            <div style={{width: '400px', height: '200px', border: '2px'}}></div>
            </section>
            <section className='appie-features-area-2 pt-100' >


                <div>
                <div className="row mb-4">
                    <div className="col-lg-12 text-center">
                        <h2 className="special-offer-title" style={{ color: 'white' }}>
                        Our User-Friendly Interface
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