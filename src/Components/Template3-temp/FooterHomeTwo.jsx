import React,{useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-2.png';
import { handleAdminSuccess,handleAdminerror, handleSuccess,handleAdminlogout,handleError } from '../Toast';
import TopToBottom from '../lib/TopToBottom';
import { FaCheck } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import { autoLogoutTemp3 } from '../../constants/auth';
import useReloadingButton from '../useReloadingButton';

function FooterHomeTwo({ setIsAdminTemp3 }) {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isAdminTemp3, setIsAdminTemp3Local] = useState(false);
    const [uploaded, setIsUploaded] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [products, setProducts] = useState([]);
    const [nestedImages, setNestedImages] = useState([]);
    const [nestedData, setNestedData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
      id: '',
      email: '',
      phone: '',
      android_1: '',
      ios_1: '',
    });
    const [selectedFiles, setSelectedFiles] = useState({});
    const [loading, setLoading] = useState(false);
    
  
  
    useEffect(() => {
      const token = localStorage.getItem('token_temp_3');
      if (token) {
        setIsAdminTemp3Local(true);
        setIsAdminTemp3(true); // Call the prop function to update the parent state
      }
    }, 
    [
      setIsAdminTemp3
    ]
  );
  const modalRef = useRef(null); // For login form modal
  const editModalRef = useRef(null); // For edit form modal
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLoginForm(false);
      }
      if (editModalRef.current && !editModalRef.current.contains(event.target)) {
        setEditMode(false);
      }
    };
  
    if (showLoginForm || editMode) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showLoginForm, editMode]);
  
  
    const toggleLoginForm = () => {
      setShowLoginForm(!showLoginForm)
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      try {
        const domain = window.location.hostname;
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/FooterPage`,{headers:{
          'x-frontend-domain':domain
        }});
        const data = res.data;
        setProducts(data);
        setFormData({
          id: data[0]._id,
          email: data[0].email,
          phone: data[0].phone,
          android_1: data[0]?.footerLinks[2]?.links.find(link => link.name === 'Android')?.link || '',
          ios_1: data[0]?.footerLinks[2]?.links.find(link => link.name === 'iOS')?.link || '',
          nestedImages: data[0].nestedIcons,
        });
        setNestedImages(data[0]?.nestedIcons || []);
        setNestedData(data[0]?.footerLinks);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    const [errors, setErrors] = useState({
      phone: '',
    });
    
    const validatePhoneNumber = (phone) => {
      const phoneRegex = /^\d{10}$/; // Regex for exactly 10 digits
      return phoneRegex.test(phone);
    };
    
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
    
      if (name === 'phone') {
        // Validate phone number
        if (!validatePhoneNumber(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone: 'Phone number must be 10 digits.',
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone: '',
          }));
        }
      }
    
      if (name.startsWith('nestedIcon_')) {
        // Handle nested icon URL changes
        const updatedIcons = [...nestedImages];
        updatedIcons[index].url = value;
        setNestedImages(updatedIcons);
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const updateFormData = new FormData();
      updateFormData.append('id', formData.id);
      updateFormData.append('email', formData.email);
      updateFormData.append('phone', formData.phone);
      updateFormData.append('android_1', formData.android_1);
      updateFormData.append('ios_1', formData.ios_1);
  
      if (selectedFiles['imageUrl']) {
        updateFormData.append('imageUrl', selectedFiles['imageUrl']);
      }
  
      nestedImages.forEach((image, index) => {
        updateFormData.append(`url_${index + 1}`, image.url);
      });
  
      const token = localStorage.getItem('token_temp_3');
      try {
        const domain = window.location.hostname;
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/footerPage/update`, updateFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'x-frontend-domain':domain
          }
        });
        // alert('Footer updated successfully');
        setEditMode(false);
        setSelectedFiles({});
        fetchProducts();
        handleSuccess();
        window.location.reload();
      } catch (error) {
        console.error('Error updating footer:', error);
        // alert('Failed to update footer. Please try again.');
        handleError();
      }
    };
  
    // const handleFileChange = (e, key) => {
    //   setSelectedFiles((prev) => ({
    //     ...prev,
    //     [key]: e.target.files[0],
    //   }));
    //   setIsUploaded(true)
    // };
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
      setIsUploaded(true)
    };
  
    
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/login`, {
          username,
          password,
        });
        const { token } = response.data;
        
      const expiresIn = 60 * 60 * 1000; // 60 minutes in ms
      const expirationTime = new Date().getTime() + expiresIn;
        localStorage.setItem('token_temp_3', token);
        localStorage.setItem('tokenExpiration_temp_3', expirationTime);
        setIsAdminTemp3Local(true);
        setIsAdminTemp3(true); // Call the prop function to update the parent state
        autoLogoutTemp3();
        setShowLoginForm(false);
        // alert('Login successful');
     
        handleAdminSuccess();
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Smooth scrolling
      });
  
      } catch (error) {
        console.error('Login failed:', error);
        // alert('Login failed. Please check your credentials.');
        handleAdminerror()
      }
    };
  
    const handleLogout = () => {
      localStorage.removeItem('token_temp_3');
      localStorage.removeItem('tokenExpiration_temp_3');
      setIsAdminTemp3Local(false);
      setIsAdminTemp3(false); // Call the prop function to update the parent state
      // alert('Logged out successfully');
      handleAdminlogout()
      // window.location.reload()
    };
    const { buttonText, isDisabled, handleClick } = useReloadingButton(handleSubmit);
    return (
        <>
            <section id="footer" className="appie-footer-area position-relative">
                <div className="container">
                  <div className="row justify-content-center text-center text-lg-start">
                    {/* Left Column - Logo and Contact Information */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <div className="footer-about-widget">
                        {/* Logo Section */}
                        <div className="logo mb-3">
                          <a href="#">
                            <img src={products[0]?.imageUrl} alt="logo" width={80} height={80} />
                          </a>
                        </div>
                        {/* Contact Information */}
                        <div className="text-muted">
                          <div>{products[0]?.email}</div>
                          <div className="mt-2">+91 {products[0]?.phone}</div>
                          <div className="mt-3 fw-bold">Follow us on:</div>
                        </div>
                        {/* Social Media Links */}
                        <ul className="d-flex align-items-center justify-content-center gap-3 mt-2 list-unstyled">
                          {nestedImages.map((icon) => (
                            <li key={icon.imageUrl}>
                              <a href={icon.url} target="_blank" rel="noopener noreferrer">
                                <img src={icon.imageUrl} alt={icon.alt} width={35} height={35} style={{marginLeft:'20px'}}/>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column - Link Sections */}
                    <div className="col-lg-8 col-md-12 d-flex flex-wrap justify-content-between text-center text-lg-start gap-4 mt-50">
                      {nestedData.map((section) => (
                        <div key={section.title} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                          {/* Section Title with Margin Top */}
                          <h4 className="h5 text-black mt-3 mb-3">{section.title}</h4>
                          {/* Links */}
                          <ul className="list-unstyled">
                            {section.links.map((link) => (
                              <li className="mt-2 text-muted" key={link.name}>
                                {section.title === "Let’s Try Out" ? (
                                  <a href={link.link} className="btn btn-danger text-white px-4 py-2 rounded">
                                    {link.name}
                                  </a>
                                ) : (
                                  <a href={link.link} className="text-reset text-decoration-none">
                                    {link.name}
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Bottom Section */}
                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <div className="footer-copyright d-flex align-items-center justify-content-center justify-content-lg-between pt-3">
                        {/* Copyright Text */}
                        <div className="text-muted">
                          <p>&copy; 2024 Busyness.App. All rights reserved.</p>
                        </div>
                        {/* Admin Controls */}
                        <div>
                          {!isAdminTemp3 ? (
                            <button
                              onClick={() => toggleLoginForm()}
                              className="btn btn-outline-dark rounded px-4 py-2"
                            >
                              Admin Login
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => setEditMode(true)}
                                className="btn btn-outline-dark rounded px-4 py-2 me-2"
                              >
                                Edit Content
                              </button>
                              <button
                                onClick={handleLogout}
                                className="btn btn-outline-dark rounded px-4 py-2"
                              >
                                Logout
                              </button>
                            </>
                          )}

                            
                            {showLoginForm && (
                                <div 
                                    className="position-fixed d-flex justify-content-center align-items-center w-100 h-100" 
                                    style={{ 
                                        top: 0, 
                                        left: 0, 
                                        backgroundColor: "rgba(0, 0, 0, 0.5)", 
                                        zIndex: 1050 // Higher z-index to overlay over the footer content
                                    }}
                                >
                                    <div 
                                        ref={modalRef} 
                                        className="bg-white rounded-lg p-4 position-relative" 
                                        style={{ maxWidth: "400px" }}
                                    >

                                        <h3 className="mb-4" style={{ fontWeight: "bold" }}>Admin Login</h3>
                                        <form onSubmit={handleLogin}>
                                            <input
                                                type="text"
                                                placeholder="Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                                className="form-control mb-3"
                                            />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="form-control mb-3"
                                            />
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100"
                                            >
                                                Login
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
                                    zIndex: 1050,
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
                                      onClick={() => setEditMode(false)}
                                    >
                                      <span className='close'></span>
                                    </button>

                                    <form onSubmit={handleSubmit}>

                                      {/* Email Field */}
                                      <div style={{ marginTop: '1rem' }}>
                                        <label style={{ display: 'block', fontWeight: '600' }}>Email:</label>
                                        <input
                                          type='email'
                                          name='email'
                                          value={formData.email}
                                          maxLength={320}
                                          onChange={handleInputChange}
                                          style={{
                                            border: '1px solid #ced4da',
                                            padding: '8px',
                                            width: '100%',
                                            borderRadius: '0.375rem',
                                          }}
                                          required
                                        />
                                      </div>

                                      {/* Phone Field */}
                                      <div style={{ marginTop: '1rem' }}>
                                      <label style={{ display: 'block', fontWeight: '600' }}>Phone:</label>
                                      <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        maxLength={10}
                                        style={{
                                          border: '1px solid #ced4da',
                                          padding: '8px',
                                          width: '100%',
                                          borderRadius: '0.375rem',
                                        }}
                                        required
                                      />
                                      {errors.phone && (
                                        <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.phone}</span>
                                      )}
                                    </div>

                                      {/* Logo Image */}
                                      <div style={{ marginTop: '1.5rem' }}>
                                        <label style={{ display: 'block', fontWeight: '600' }}>Logo Image:</label>
                                        <img src={products[0]?.imageUrl} alt="" 
                                        style={{
                                            width: '64px',
                                            height: '64px',
                                            objectFit: 'cover',
                                            borderRadius: '0.375rem',
                                            border: '1px solid #ced4da',
                                            backgroundColor: 'black',
                                            margin: '3px'
                                        }} />
                                        <input
                                          type='file'
                                          name='imageUrl'
                                          accept="image/*"
                                          onChange={(e) => handleFileChange(e, 'imageUrl')}
                                          style={{
                                            border: '1px solid #ced4da',
                                            padding: '8px',
                                            width: '100%',
                                            borderRadius: '0.375rem',
                                          }}
                                        
                                        />
                                          {uploaded && (
                                   <div style={{ marginLeft: '8px', color: 'green' }}>
                                    <FaCheck /> {/* Tick mark icon */}
                               </div>
                                )}
                                      </div>

                                      {/* Social Media Icons */}
                                      <div style={{ marginTop: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Update Social Media Icons:</h3>
                                        {nestedImages.map((icon, index) => (
                                          <div key={index} style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem', gap: '1rem', border: '1px solid #ced4da', padding: '1rem', borderRadius: '0.375rem', backgroundColor: '#f8f9fa' }}>
                                            <img
                                              src={icon.imageUrl}
                                              alt={`Icon ${index + 1}`}
                                              style={{
                                                width: '48px',
                                                height: '48px',
                                                objectFit: 'cover',
                                                borderRadius: '0.375rem',
                                                border: '1px solid #ced4da',
                                              }}
                                            />
                                            <input
                                              type='text'
                                              name={`nestedIcon_${index}`}
                                              value={icon.url}
                                              onChange={(e) => handleInputChange(e, index)}
                                              style={{
                                                border: '1px solid #ced4da',
                                                padding: '8px',
                                                width: '100%',
                                                borderRadius: '0.375rem',
                                              }}
                                            />
                                          </div>
                                        ))}
                                      </div>

                                      {/* Android Link */}
                                      <div style={{ marginTop: '1.5rem' }}>
                                        <label style={{ display: 'block', fontWeight: '600' }}>Android Link:</label>
                                        <input
                                          type='text'
                                          name='android_1'
                                          value={formData.android_1}
                                          onChange={handleInputChange}
                                          style={{
                                            border: '1px solid #ced4da',
                                            padding: '8px',
                                            width: '100%',
                                            borderRadius: '0.375rem',
                                          }}
                                        />
                                      </div>

                                      {/* iOS Link */}
                                      <div style={{ marginTop: '1.5rem' }}>
                                        <label style={{ display: 'block', fontWeight: '600' }}>iOS Link:</label>
                                        <input
                                          type='text'
                                          name='ios_1'
                                          value={formData.ios_1}
                                          onChange={handleInputChange}
                                          style={{
                                            border: '1px solid #ced4da',
                                            padding: '8px',
                                            width: '100%',
                                            borderRadius: '0.375rem',
                                          }}
                                        />
                                      </div>

                                      {/* Submit Button */}
                                      {loading? "saving.........":
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





                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

        </>
    );
}

export default FooterHomeTwo;
