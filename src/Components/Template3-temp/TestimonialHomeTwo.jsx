import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { logoutTemp1, logoutTemp3 } from '../../constants/auth';
import { handleSuccess,handleError } from '../Toast';
import { FaCheck } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';
import TestimonialSlider from './TestimonialSlider';
import useReloadingButton from '../useReloadingButton';


function TestimonialHomeTwo({isAdminTemp3}) {
    const sliderRef = useRef();
    const sliderNext = () => {
        sliderRef.current.slickNext();
    };
    const sliderPrev = () => {
        sliderRef.current.slickPrev();
    };
    const settings = {
        autoplay: true,
        arrows: false,
        dots: false,
    };
    const [products, setProducts] = useState([]);
    const [nestedImages, setNestedImages] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [formData, setFormData] = useState({
        id: '',
        nestedImages: [],
    });
    const [newTestimonialMode, setNewTestimonialMode] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [imageUpload, setImageUpload] = useState(false);
    const editModalRef = useRef(null); // For edit form modal
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
  
    if ( editMode || newTestimonialMode) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [editMode,newTestimonialMode]);

  
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const domain = window.location.hostname;
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/reviewPage`,
            {
                headers: {
                    'X-Frontend-Domain': domain,
                  },
            });
        const data = res.data;
        setProducts(data);
        setNestedImages(data[0]?.nestedImages || []);
        if (data.length > 0) {
            setFormData({
            id: data[0]._id,
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
    

    // const handleFileChange = (e, index) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //     setSelectedFiles((prevFiles) => ({
    //         ...prevFiles,
    //         [index]: file,
    //     }));
    //     }
    // };
    const handleFileChange = async (e, index) => {
        const file = e.target.files[0];
        // console.log(`compressedFile size ${file.size / 1024 / 1024} MB`);
        if (file) {
          try {
            // Set compression options
            setImageUpload(true);
            const options = {
              maxSizeMB: 1,        // Max size in MB
              maxWidthOrHeight: 850, // Max width or height (in pixels)
              useWebWorker: true,   // Use web worker for performance
            };
      
            // Compress the image
            const compressedFile = await imageCompression(file, options);
            // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
      
            // Update state with the compressed file
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
        updateFormData.append('id', formData.id);
        updateFormData.append('titleLeft', formData.titleLeft);
        updateFormData.append('titleOrg', formData.titleOrg);
        updateFormData.append('titleRight', formData.titleRight);
        updateFormData.append('description', formData.description);
        nestedImages.forEach((image) => {
        if (selectedFiles[image.index]) {
            updateFormData.append(`images_${image.index}`, selectedFiles[image.index]);
        }
        updateFormData.append(`name_${image.index}`, image.name);
        updateFormData.append(`description_${image.index}`, image.description);
        updateFormData.append(`rating_${image.index}`, image.rating);
        });
        const token = localStorage.getItem('token_temp_3'); // Retrieve token from local storage
        // console.log(token)
        try {
            const domain = window.location.hostname;
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/reviewPage/update`, updateFormData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, // Include token in the headers
            'X-Frontend-Domain': domain,
            },
        }).catch(error => {
            if (error.response.status === 401) {
                // Token has expired, log the user out
                logoutTemp1();
            }
        });
        // alert('Content updated successfully');
        fetchProducts();
        setEditMode(false);
        setSelectedFiles({});
        handleSuccess();
        // window.location.reload();
        closeForm()
        } catch (error) {
        console.error('Error updating content:', error);
        // alert('Failed to update content. Please try again.');
        handleError();
        } finally {
            setLoading(false); // Set loading state back to false
          }
    };

    const closeForm = () => {
        setEditMode(false);
        setSelectedFiles({});
        
    };


    const deleteTestimonials = async (idToDelete) => {
        const token = localStorage.getItem('token_temp_3');
        try {
            const domain = window.location.hostname;
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/reviewPage/deleteData/${idToDelete}`, {
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
                logoutTemp1();
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
            newFormData.append('new_name', formData.new_name);
            newFormData.append('new_description', formData.new_description);
            newFormData.append('new_rating', formData.new_rating);
            
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
                const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/reviewPage/addNewData`, newFormData, {
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

    return (
        <>
            <section className="appie-testimonial-2-area mb-90 position-relative" id="testimonial">
   {/* Edit button positioned in the top-right corner */}
   {isAdminTemp3 && (<div className="position-absolute" style={{ 
             right: 20, top:-50, zIndex:100
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

                {/* Name Input */}
                <input
                    type="text"
                    name="new_name"
                    placeholder="Enter Name (max 25 characters)"
                    value={formData.new_name || ''}
                    maxLength={25}
                    onChange={handleInputChange}
                    className="form-control mb-3"
                    required
                />

                {/* Description Input */}
                <textarea
                    name="new_description"
                    placeholder="Enter Review  (max 500 characters)"
                    value={formData.new_description || ''}
                    onChange={handleInputChange}
                    maxLength={500}
                    className="form-control mb-3"
                    rows="4"
                    required
                />

                {/* Rating Input */}
                <input
                    type="number"
                    name="new_rating"
                    placeholder="Rating (1-5)"
                    value={formData.new_rating || ''}
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
                        onClick={closeForm}
                    >
                         <span className='close'></span>
                    </button>

                    <form onSubmit={handleSubmit}>
                        
                        {/* Image Uploads */}
                        <div style={{ marginTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Update Images:</h3>
                        {nestedImages.sort((a, b) => a.index - b.index).map((image) => (
                            <div key={image.index} className='d-flex flex-column flex-md-row align-items-start align-items-md-center border rounded-lg p-4 mb-4 shadow-sm bg-light' style={{ gap: '2rem' }}>
                                <div style={{ marginTop: '1rem' }}>
                                    <img
                                        src={`${image.imageUrl.replace(/\\/g, '/')}`}
                                        alt={image.name}
                                        style={{
                                            width: '64px',
                                            height: '64px',
                                            objectFit: 'cover',
                                            borderRadius: '0.375rem',
                                            border: '1px solid #ced4da',
                                            backgroundColor: 'black',
                                            margin: '3px'
                                        }}
                                    />
                                </div>
                                {/* Image Upload First */}
                                <div style={{ flexShrink: 0, marginBottom: '1rem' }}>
                                    <label className='font-weight-bold mb-2' style={{ fontSize: '1rem' }}>Update Image:</label>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => handleFileChange(e, image.index)}
                                        className='form-control-file mt-1'
                                    />
                                    <div className='mt-2'>
                                    {selectedFiles[image.index] && (
                                   <div style={{ marginLeft: '8px', color: 'green' }}>
                                    <FaCheck /> {/* Tick mark icon */}
                               </div>
                                )}
                                    </div>
                                    {selectedFiles[image.index] && (
                                        <p className='text-success mt-2'>
                                            uploaded
                                            {/* Selected: {selectedFiles[image.index].name} */}
                                        </p>
                                    )}
                                    <label className='font-weight-bold mt-3 mb-2' style={{ fontSize: '1rem' }}>Update Rating:</label>
                                    <input
                                        type='number'
                                        value={image.rating}
                                        onChange={(e) => handleNestedFieldChange(e, image.index, 'rating')}
                                        className='form-control mt-1'
                                        style={{ maxWidth: '120px' }}
                                        placeholder="1 - 5"
                                        min="1"
                                        max="5"
                                        required
                                    />
                                     <small className="text-muted">Enter a rating between 1 and 5, with up to 1 decimal place.</small>
                                </div>
                                {/* Update Name and Subtext */}
                                <div style={{ flexGrow: 1 }}>
                                    <label className='font-weight-bold mb-2' style={{ fontSize: '1rem' }}>Update Name:  {"  "}<small>(max characters limit is 25)</small></label>
                                    <input
                                        type='text'
                                        value={image.name}
                                        onChange={(e) => handleNestedFieldChange(e, image.index, 'name')}
                                        maxLength={25}
                                        className='form-control mt-1'
                                        required
                                    />
                                    <label className='font-weight-bold mt-3 mb-2' style={{ fontSize: '1rem' }}>Update Review:  {"  "}<small>(max characters limit is 200)</small></label>
                                    <textarea
                                        value={image.description}
                                        onChange={(e) => handleNestedFieldChange(e, image.index, 'description')}
                                        maxLength={200}
                                        className='form-control mt-1'
                                        rows='5'
                                        required
                                    />
                                </div>
                                {nestedImages.length <= 1 ? (
                                        " "
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm mt-2 mt-md-0"
                                            onClick={() => deleteTestimonials(image.index)}
                                        >
                                            Delete
                                        </button>
                                    )}

                            </div>
                        ))}


                        </div>

                        {/* Submit Button */}
                        {imageUpload?                     
                            "Compressing Image... "                
                           : 
                           <button
                              type='submit'
                              onClick={handleClick}
                              disabled={isDisabled}
                              style={{
                                marginTop: '1.5rem',
                                backgroundColor: isDisabled ? '#5a9bff' : '#007bff',
                                color: 'white',
                                padding: '8px',
                                borderRadius: '0.375rem',
                                width: '100%',
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s',
                              }}
                            >
                              {buttonText}
                            </button>}
                    </form>
                    </div>
                </div>
                )}
           {loading ? "saving...." : (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-testimonial-2-box">
                                <div
                                    className="appie-testimonial-slider-2"
                                    style={{ position: 'relative' }}
                                >
                                    <span
                                        onClick={sliderPrev}
                                        className="prev slick-arrow"
                                        style={{ display: 'block' }}
                                    >
                                        <i className="fal fa-arrow-left" />
                                    </span>
                                    <TestimonialSlider sliderRef={sliderRef} settings={settings} testimonials={nestedImages} />
                                    <span
                                        onClick={sliderNext}
                                        className="next slick-arrow"
                                        style={{ display: 'block' }}
                                    >
                                        <i className="fal fa-arrow-right" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </section>
        </>
    );
}

export default TestimonialHomeTwo;
