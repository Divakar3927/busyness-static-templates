// this is popular products page

import { useEffect,useState } from 'react';

import axios from 'axios';
import TeamMember from './ProductCard';
import { logoutTemp1, logoutTemp3 } from '../../constants/auth';
import { useRef } from 'react';
import { handleSuccess,handleError } from '../Toast';
import { FaCheck } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';

function TeamHomeOne({isAdminTemp3,bg}) {
    const [products, setProducts] = useState([]);
    const [nestedImages, setNestedImages] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [formData, setFormData] = useState({
      id: '',
      title: '',
      description: '',
      nestedImages: [],
    });
    

    const editModalRef = useRef(null); // For edit form modal
  
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
            const domain = window.location.hostname;
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Products`,
            {
                headers: {
                  'X-Frontend-Domain': domain,
                },
              }
          );
          const data = res.data;
          setProducts(data);
          setNestedImages(data[0]?.nestedImages || []); // Set nested images from the first product
          if (data.length > 0) {
            setFormData({
              id: data[0]._id,
              title: data[0].title,
              description: data[0].description,
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
      //   const file = e.target.files[0];
      //   if (file) {
      //     setSelectedFiles((prevFiles) => ({
      //       ...prevFiles,
      //       [index]: file,
      //     }));
      //   }
      // };
      const handleFileChange = async (e, index) => {
        const file = e.target.files[0];
        // console.log(`compressedFile size ${file.size / 1024 / 1024} MB`);
        if (file) {
          try {
            // Set compression options
            // setLoading(true);
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
            // setLoading(false);
          } catch (error) {
            console.error('Error compressing file:', error);
          }
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const updateFormData = new FormData();
        updateFormData.append('title', formData.title);
        updateFormData.append('description', formData.description);
    
        nestedImages.forEach((image) => {
          if (selectedFiles[image.index]) {
            updateFormData.append(`images_${image.index}`, selectedFiles[image.index]);
          }
          updateFormData.append(`name_${image.index}`, image.name);
          updateFormData.append(`description_${image.index}`, image.description);
          updateFormData.append(`rating_${image.index}`, image.rating);
        });
        const token=localStorage.getItem('token_temp_3');
        try {
            const domain = window.location.hostname;
          await axios.post(`${import.meta.env.VITE_BASE_URL}/api/productsPage/update`, updateFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`, // Include token in the headers
              'X-Frontend-Domain': domain,
            },
          }).catch(error => {
            if (error.response.status === 401) {
                // Token has expired, log the user out
                logoutTemp3();
            }
        });
          // alert('Content updated successfully');
          setEditMode(false); 
          setSelectedFiles({});
          fetchProducts(); 
          handleSuccess()
          closeForm()
        } catch (error) {
          console.error('Error updating content:', error);
          // alert('Failed to update content. Please try again.');
          handleError();
        }
      };
    
      const closeForm = () => {
        setEditMode(false);
        setSelectedFiles({});
      };
    

    return (
        <>
            <section id='Products' className={"appie-team-area pt-40 pb-100 position-relative"} style={{ backgroundColor: `${bg}` }}>
                 {/* Edit button positioned in the top-right corner */}
                 {isAdminTemp3 && (<div className="position-absolute" style={{ right: 20, top: 40 , zIndex: 100}}>
            <button className="btn btn-primary" onClick={() => setEditMode(!editMode)}>Edit</button>
        </div>)}

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
                        
                        {/* Title 1 */}
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
                            required
                        />
                        </div>

                        {/* Subheading */}
                        <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: '600' }}>Description: {"  "}<small>(max characters limit is 150)</small></label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            maxLength={150}
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
                                            width: '100px',
                                            height: '100px',
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
                                    {selectedFiles[image.index] && (
                                   <div style={{ marginLeft: '8px', color: 'green' }}>
                                    <FaCheck /> {/* Tick mark icon */}
                               </div>)}
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
                                        placeholder="1.0 - 5.0"
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        required
                                    />
                                    <small className="text-muted">Enter a rating between 1 and 5, with up to 1 decimal place.</small>
                                </div>
                                {/* Update Name and Subtext */}
                                <div style={{ flexGrow: 1 }}>
                                    <label className='font-weight-bold mb-2' style={{ fontSize: '1rem' }}>Image Name: {"  "}<small>(max char limit is 25)</small></label>
                                    <input
                                        type='text'
                                        value={image.name}
                                        onChange={(e) => handleNestedFieldChange(e, image.index, 'name')}
                                        maxLength={25}
                                        className='form-control mt-1'
                                        required
                                    />
                                    <label className='font-weight-bold mt-3 mb-2' style={{ fontSize: '1rem' }}>Image description: (stored in backend) {"  "}<small>(max characters limit is 200)</small></label>
                                    <textarea
                                        value={image.description}
                                        onChange={(e) => handleNestedFieldChange(e, image.index, 'description')}
                                        maxLength={200}
                                        className='form-control mt-1'
                                        rows='2'
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                        </div>

                        {/* Submit Button */}
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
                        </button>
                    </form>
                    </div>
                </div>
                )}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">
                                    {/* Meet our Team Members */}
                                    {products[0]?.title}
                                    </h3>
                                <p>
                                    {/* Different layouts and styles for team sections. */}
                                    {products[0]?.description}

                                    </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {nestedImages.map((image) => (
                            <TeamMember
                                key={image.name}
                                image={image.imageUrl}
                                name={image.name}
                                role={image.rating}
                                delay="200ms"
                            />
                        ))}
                                          
                            
                    {/* <div className="col-lg-3 col-md-6">
                            <div
                                className="appie-team-item mt-30 wow animated fadeInUp"
                                data-wow-duration="2000ms"
                                data-wow-delay="200ms"
                            >
                                <div className="thumb">
                                    <img src={nestedImages[0]?.imageUrl} alt="" />
                                </div>
                                <div className="content text-center">
                                    <h5 className="title">Benjamin Evalent</h5>
                                    <span>CEO-Founder</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="appie-team-item mt-30 wow animated fadeInUp"
                                data-wow-duration="2000ms"
                                data-wow-delay="400ms"
                            >
                                <div className="thumb">
                                    <img src={nestedImages[1]?.imageUrl} alt="" />
                                </div>
                                <div className="content text-center">
                                    <h5 className="title">Benjamin Evalent</h5>
                                    <span>CEO-Founder</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="appie-team-item mt-30 wow animated fadeInUp"
                                data-wow-duration="2000ms"
                                data-wow-delay="600ms"
                            >
                                <div className="thumb">
                                    <img src={nestedImages[2]?.imageUrl} alt="" />
                                </div>
                                <div className="content text-center">
                                    <h5 className="title">Benjamin Evalent</h5>
                                    <span>CEO-Founder</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="appie-team-item mt-30 wow animated fadeInUp"
                                data-wow-duration="2000ms"
                                data-wow-delay="800ms"
                            >
                                <div className="thumb">
                                    <img src={nestedImages[1]?.imageUrl} alt="" />
                                </div>
                                <div className="content text-center">
                                    <h5 className="title">Benjamin Evalent</h5>
                                    <span>CEO-Founder</span>
                                </div>
                            </div>
                        </div> */}
                        
                    </div>
                  


                    <div className="team-btn text-center mt-70" style={{ display: 'flex', justifyContent: 'center' }}>
                        <a 
                            href="#" 
                            style={{
                                backgroundColor: 'black', // Black color initially
                                color: 'white', // White text
                                textDecoration: 'none', // Remove underline
                                padding: '10px 20px', // Add some padding
                                borderRadius: '5px', // Rounded corners
                                transition: 'background-color 0.3s ease, color 0.3s ease' // Smooth transition
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#007bff'; // Blue background on hover
                                e.currentTarget.style.color = 'white'; // Keep text white on hover
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'black'; // Return to black
                                e.currentTarget.style.color = 'white'; // Keep text white
                            }}
                        >
                            Order Now <i className="fal fa-arrow-right" />
                        </a>
                    </div>


                </div>
            </section>
        </>
    );
}

export default TeamHomeOne;
