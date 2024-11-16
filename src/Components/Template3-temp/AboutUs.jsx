// this is about us page

import {useState,useEffect,useRef} from 'react';
// import thumb from '../../assets/images/traffic-thumb.png';
import axios from 'axios';
import {logoutTemp1, logoutTemp3 } from '../../constants/auth';
import { handleSuccess,handleError } from '../Toast';
import { FaCheck } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';


function AboutUs({isAdminTemp3}) {
    const [products, setProducts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
      id: '',
      title: '',
      subheading:'',
      descriptionOne: '',
      descriptionTwo: '',
      imageUrl: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const editModalRef = useRef(null); // For edit form modal
    const [loading, setLoading] = useState(false);
  
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


    useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      try {
        const domain=window.location.hostname
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/aboutUs/`,{
          headers:{
            'x-frontend-domain':domain
          }
        });
        const data = res.data;
        setProducts(data);
        // Pre-populate the form with the first product for editing
        if (data.length > 0) {
          setFormData({
            id: data[0]._id,
            title: data[0].title,
            subheading: data[0].subheading,
            descriptionOne: data[0].descriptionOne,
            descriptionTwo: data[0].descriptionTwo,
            imageUrl: data[0].imageUrl,
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
  
    // const handleFileChange = (e) => {
    //   setSelectedFile(e.target.files[0]);
    // };

    const handleFileChange = async (e) => {
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
          setSelectedFile(compressedFile);
          setLoading(false);
        } catch (error) {
          console.error('Error compressing file:', error);
        }
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const updateFormData = new FormData();
      updateFormData.append('id', formData.id);
      updateFormData.append('title', formData.title);
      updateFormData.append('subheading',formData.subheading);
      updateFormData.append('descriptionOne', formData.descriptionOne);
      updateFormData.append('descriptionTwo', formData.descriptionTwo);
      if (selectedFile) {
        updateFormData.append('image', selectedFile);
      }
      const token = localStorage.getItem('token_temp_3'); // Retrieve token from local storage
      // console.log(token)
      try {
        const domain = window.location.hostname
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/aboutUs/update`, updateFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, // Include token in the headers
            'x-frontend-domain':domain
          },
        }).catch(error => {
          if (error.response.status === 401) {
              // Token has expired, log the user out
              logoutTemp3();
          }
      });
        // alert('Content updated successfully');
        setEditMode(false); // Exit edit mode after successful update
        fetchProducts(); // Fetch the updated content
        handleSuccess();
        closeForm()
      } catch (error) {
        console.error('Error updating content:', error);
        handleError();
      }
    };
  
    const closeForm = () => {
      setEditMode(false);
    };
    return (
        <section id="about-us" className={`appie-traffic-area pt-120 pb-150 position-relative`}>
          {/* Show Edit Button only if isAdmin is true */}
            {isAdminTemp3 && (
              <div className="position-absolute" style={{ right: 20, top: 20 , zIndex: 100}}>
                <button className="btn btn-primary" onClick={() => setEditMode(!editMode)}>Edit</button>
              </div>
            )}

            {/* Popup form */}
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
                    zIndex: 9999
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
                    {/* Title */}
                    <div style={{ marginTop: '1rem' }}>
                      <label style={{ display: 'block', fontWeight: '600' }}>Title: {"  "}<small>(max characters limit is 25)</small></label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        maxLength={25} 
                        onChange={handleInputChange}
                        style={{
                          border: '1px solid #ced4da',
                          padding: '8px',
                          width: '100%',
                          borderRadius: '0.375rem',
                        }}
                      />
                    </div>
                    {/* Subheading */}
                    <div style={{ marginTop: '1rem' }}>
                      <label style={{ display: 'block', fontWeight: '600' }}>Sub Heading: {"  "}<small>(max characters limit is 60)</small></label>
                      <input
                        type="text"
                        name="subheading"
                        maxLength={60} 
                        value={formData.subheading}
                        onChange={handleInputChange}
                        style={{
                          border: '1px solid #ced4da',
                          padding: '8px',
                          width: '100%',
                          borderRadius: '0.375rem',
                        }}
                      />
                    </div>
                    {/* Description */}
                    <div style={{ marginTop: '1rem' }}>
                      <label style={{ display: 'block', fontWeight: '600' }}>Description1: {"  "}<small>(max characters limit is 500)</small></label>
                      <textarea
                        name="descriptionOne"
                        value={formData.descriptionOne}
                        maxLength={500} 
                        onChange={handleInputChange}
                        style={{
                          border: '1px solid #ced4da',
                          padding: '8px',
                          width: '100%',
                          borderRadius: '0.375rem',
                        }}
                        rows="4"
                      />
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                      <label style={{ display: 'block', fontWeight: '600' }}>Description2: {"  "}<small>(max characters limit is 500)</small></label>
                      <textarea
                        name="descriptionTwo"
                        value={formData.descriptionTwo}
                        onChange={handleInputChange}
                        maxLength={500} 
                        style={{
                          border: '1px solid #ced4da',
                          padding: '8px',
                          width: '100%',
                          borderRadius: '0.375rem',
                        }}
                        rows="4"
                      />
                    </div>
                    {/* Image Upload */}
                    <div style={{ marginTop: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Upload Image</h3>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {formData.imageUrl && (
                          <img
                            src={formData.imageUrl}
                            alt="Current image"
                            style={{ width: '4rem', height: '4rem', objectFit: 'cover', marginRight: '0.5rem', borderRadius: '0.375rem', border: '1px solid #ced4da' }}
                          />
                        )}
                        <input type="file" 
                            onChange={handleFileChange} 
                            accept='image/*'
                            style={{ border: '1px solid #ced4da', 
                            padding: '8px',
                            borderRadius: '0.375rem' }} 
                        />
                        {selectedFile && (
                                   <div style={{ marginLeft: '8px', color: 'green' }}>
                                    <FaCheck /> {/* Tick mark icon */}
                               </div>
                                )}
                      </div>
                    </div>
                    {/* Submit Button */}
                    {loading? "saving.......":
                    <button
                      type="submit"
                      style={{
                        marginTop: '1.5rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '8px',
                        borderRadius: '0.375rem',
                        width: '100%',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      Update Content
                    </button>}
                  </form>
                </div>
              </div>
            )}

<div className="container">
    <div className="row align-items-center">
      
      {/* Left Column - Text Content */}
      <div className="col-lg-6">
        <div className="appie-about-title mb-40">
          <h2 className="title">{products[0]?.title}</h2>
          <h4 className="subheading text-primary">{products[0]?.subheading}</h4>
        </div>
        <div className="about-description">
          <ul className="list-unstyled">
            <li className="mb-3" style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
              {products[0]?.descriptionOne}
            </li>
            <li className="mb-3" style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
              {products[0]?.descriptionTwo}
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="col-lg-6 text-center">
        <div className="about-image-wrapper">
          <img
            src={products[0]?.imageUrl}
            alt="About Us"
            style={{
              width: '100%',
              maxWidth: '450px',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
            }}
            className="img-fluid"
          />
        </div>
      </div>

    </div>
  </div>
</section>

    );
}

export default AboutUs;
