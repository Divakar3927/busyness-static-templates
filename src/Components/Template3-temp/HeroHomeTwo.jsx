import React,{useState,useRef,useEffect} from 'react';
import shapeTen from '../../assets/images/shape/shape-10.png';
import shapeEleven from '../../assets/images/shape/shape-11.png';
import shapeTwelve from '../../assets/images/shape/shape-12.png';
import shapeNine from '../../assets/images/shape/shape-9.png';
import { logoutTemp1, logoutTemp3 } from '../../constants/auth';
import axios from 'axios';
import { showSuccessToast,showErrorToast } from '../Toast';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from '@mui/material/Alert';
import { FaCheck } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';
import useReloadingButton from '../useReloadingButton';

function HeroHomeTwo({isAdminTemp3}) {
  const [products, setProducts] = useState([]);
  const [urls, setUrl] = useState([]);
  const [nestedImages, setNestedImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [formData, setFormData] = useState({
    id: '',
    title1: '',
    title2: '',
    description: '',
    title2Org: '',
    subheading: '',
    nestedImages: [],
  });
  const [loading, setLoading] = useState(false); // Added loading state
  
  const editModalRef = useRef(null); // For edit form modal
  const handleSuccess = () => {
    showSuccessToast('Updated Succesfully!');
  };
  const handleError = () => {
    showErrorToast('Failed to update. Please try again.');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (editModalRef.current && !editModalRef.current.contains(event.target)) {
        setEditMode(false);
      }
    };
  
    if ( editMode) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [editMode]);


  // const navigate = useNavigate(); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const domain = window.location.hostname;
      // console.log(import.meta.env.VITE_BASE_URL)
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/home`, {
        headers: {
          'X-Frontend-Domain': domain,
        },
      });
      const links = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/FooterPage`, {
        headers: {
          'X-Frontend-Domain': domain,
        },
      });
      const link=links.data;
      const data = res.data;
      if (!data || data.length === 0) {
        // If data is empty, redirect to maintenance page
        // navigate('/maintenance');
        return; // Exit early
      }
      setProducts(data || []);
      setUrl(link||[]);
      setNestedImages(data[0]?.nestedImages || []);

      if (data.length > 0) {
        setFormData({
          id: data[0]._id,
          title1: data[0].title1,
          title2: data[0].title2,
          title2Org: data[0].title2Org,
          description: data[0].description,
          subheading: data[0].subheading,
          nestedImages: data[0].nestedImages,
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    //   navigate('/maintenance');
    }
  };

 

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];
    // console.log(`compressedFile size ${file.size / 1024 / 1024} MB`);
    if (file) {
      try {
        // Set compression options
        setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.error('Error compressing file:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const domain = window.location.hostname;
    const updateFormData = new FormData();
    updateFormData.append('id', formData.id);
    updateFormData.append('title1', formData.title1);
    updateFormData.append('title2', formData.title2);
    updateFormData.append('title2Org', formData.title2Org);
    updateFormData.append('subheading', formData.subheading);
    updateFormData.append('description', formData.description);

    Object.keys(selectedFiles).forEach((index) => {
      const file = selectedFiles[index];
      updateFormData.append(`images_${index}`, file);
    });

    const token = localStorage.getItem('token_temp_3');
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/home/update`, updateFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          'X-Frontend-Domain': domain,
        },
      }).catch((error) => {
        if (error.response.status === 401) {
          logoutTemp3();
        }
      });
      // alert('Content updated successfully');
      setEditMode(false);
      setSelectedFiles({});
      fetchProducts();
      handleSuccess();
      closeForm();
    } catch (error) {
      // alert('Failed to update content. Please try again.');
      console.error('Error updating content:', error);
      handleError();
      // closeForm();
    }
  };
 
  const closeForm = () => {
    setEditMode(false);
    setSelectedFiles({});
  };
  const { buttonText, isDisabled, handleClick } = useReloadingButton(handleSubmit);



    return (
        <>
            <ToastContainer/>
            <section className="appie-hero-area-2">
               {/* Edit button positioned in the top-right corner */}
        {isAdminTemp3 && (<div className="position-absolute" style={{ right: 20, top: 100, zIndex:100}}>
            <button className="btn btn-primary" onClick={() => setEditMode(!editMode)}>Edit</button>           
        </div>)}
       
        {editMode && (
                <div
                    style={{
                    position: 'fixed',
                    inset: '0',
                    zIndex: 999,
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
                        {/* Subheading */}
                        <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: '600' }}>Top Heading 1: {"  "}<small>(max characters limit is 45)</small></label>
                        
                        <input
                            type="text"
                            name="subheading"
                            value={formData.subheading}
                            maxLength={45} 
                            onChange={handleInputChange}
                            onInput={(e) => {
                              const wordLimit = 10; // Set your word limit here
                              const words = e.target.value.trim().split(/\s+/);
                              if (words.length <= wordLimit) {
                                  handleInputChange(e);
                              }
                          }}
                            style={{
                            border: '1px solid #ced4da',
                            padding: '8px',
                            width: '100%',
                            borderRadius: '0.375rem',
                            maxlength:"10",
                            }}
                            
                        />
                        </div>

                        {/* Title 1 */}
                        <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: '600' }}>Title 1: {"  "}<small>(max characters limit is 30)</small></label>
                        <input
                            type="text"
                            name="title1"
                            value={formData.title1}
                            onChange={handleInputChange}
                            maxLength={30}  // corrected character limit to 20
                            style={{
                                border: '1px solid #ced4da',
                                padding: '8px',
                                width: '100%',
                                borderRadius: '0.375rem',
                            }}
                            required
                        />

                        </div>

                        {/* Orange Text */}
                        <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: '600' }}>Colored Text: {"  "}<small>(max characters limit is 30)</small></label>
                        <input
                            type="text"
                            name="title2Org"
                            value={formData.title2Org}
                            onChange={handleInputChange}
                            maxLength={30} 
                            style={{
                            border: '1px solid #ced4da',
                            padding: '8px',
                            width: '100%',
                            borderRadius: '0.375rem',
                            }}
                            required
                        />
                        </div>

                        {/* Title 2 */}
                        <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: '600' }}>Title 2: {"  "}<small>(max characters limit is 30)</small></label>
                        <input
                            type="text"
                            name="title2"
                            value={formData.title2}
                            onChange={handleInputChange}
                            maxLength={30} 
                            style={{
                            border: '1px solid #ced4da',
                            padding: '8px',
                            width: '100%',
                            borderRadius: '0.375rem',
                            }}
                            required
                        />
                        </div>

                        {/* Description */}
                        <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: '600' }}>Description: {"  "}<small>(max characters limit is 120)</small></label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            maxLength={120} 
                            style={{
                            border: '1px solid #ced4da',
                            padding: '8px',
                            width: '100%',
                            borderRadius: '0.375rem',
                            }}
                            rows="2"
                            required
                        />
                        </div>

                        {/* Image Uploads */}
                        <div style={{ marginTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Update Images:</h3>
                        {nestedImages
                            .filter((image) => image.index === 1) // Filter to get only the first image (index 0)
                            .map((image) => (
                                <div key={image.index} style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.25rem' }}>
                                    <img
                                    src={`${image.imageUrl}`}
                                    alt={image.name}
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        objectFit: 'cover',
                                        marginRight: '0.75rem',
                                        border: '1px solid #ced4da',
                                        borderRadius: '0.25rem',
                                    }}
                                    />
                                    <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, image.index)}
                                    style={{
                                        border: '1px solid #ced4da',
                                        padding: '8px',
                                        borderRadius: '0.375rem',
                                    }}                                  
                                    />
                                    {selectedFiles[image.index] && (
                                   <div style={{ marginLeft: '8px', color: 'green' }}>
                                    <FaCheck /> {/* Tick mark icon */}
                               </div>
                                )}
                                </div>
                                {selectedFiles[image.index] && (
                                    <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#28a745' }}>
                                    Selected: {selectedFiles[image.index].name}
                                    </p>
                                )}
                                </div>
                            ))}
                        </div>
                        
                        
                        <div>
                            <Alert severity="info">
                              
                              <h6>
                                <span>Note: {' '}</span>
                             {"  "} In the footer, insert the app store URLs for iOS and Android, and similarly, include the Logo.
                                </h6></Alert>
                        </div>
                        {/* Submit Button */}
                        {loading ?                     
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
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="appie-hero-content-2">
                                {/* <span>14 day free gsvdgf efewfgweuy weyfwe</span> */}
                                <span>{products[0]?.subheading}</span>
                                <h2 className="appie-title">
                                    {products[0]?.title1}{' '}
                                    {/* Ready to launch your app in one,  */}
                                    <span style={{ color: '#ff3e66' }}>
                                        {products[0]?.title2Org}
                                        {/* Application */}
                                    </span>{' '}
                                    {products[0]?.title2}
                                </h2>
                                <p>Find the best application in the appie.</p>
                            </div>
                        </div>

                        <div
                            className="col-lg-7 appie-hero-thumb wow animated fadeInRight"
                            data-wow-duration="2000ms"
                            data-wow-delay="400ms"
                        >
                            <img src={nestedImages[0]?.imageUrl} alt="" style={{ maxHeight: '500px' }} />
                        </div>
                    </div>
                </div>
                
                <div className="hero-shape-1">
                    <img src={shapeNine} alt="" />
                </div>
                <div className="hero-shape-2">
                    <img src={shapeTen} alt="" />
                </div>
                <div className="hero-shape-3">
                    <img src={shapeEleven} alt="" />
                </div>
                <div className="hero-shape-4">
                    <img src={shapeTwelve} alt="" />
                </div>
            </section>
        </>
    );
}

export default HeroHomeTwo;
