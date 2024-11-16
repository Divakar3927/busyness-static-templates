import React,{useRef} from 'react';
import shape13 from '../../assets/images/shape/shape-13.png';
import shape14 from '../../assets/images/shape/shape-14.png';
import shape15 from '../../assets/images/shape/shape-15.png';
import { handleSuccess,handleError } from '../Toast';
import { FaCheck } from 'react-icons/fa';
import { useState,useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import { logoutTemp1 } from '../../constants/auth';

function DownloadHomeTwo({ className }) {
    const [products, setProducts] = useState([]);
  const [nestedImages, setNestedImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    nestedImages: [],
  });
  const [loading, setLoading] = useState(true); // Loading state


  
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
    setLoading(true);
    fetchProducts();
  }, []);

  

  const fetchProducts = async () => {
    try {
        const domain = window.location.hostname;
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/service`,{
        headers: {
          'X-Frontend-Domain': domain,
        },
      });
      const data = res.data;
      setProducts(data);
      setNestedImages(data[0]?.nestedImages || []); // Set nested images from the first product
      if (data.length > 0) {
        setFormData({
          title: data[0].title,
          subheading: data[0].subheading,
          nestedImages: data[0].nestedImages,
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
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
    const updateFormData = new FormData();
    updateFormData.append('title', formData.title);
    updateFormData.append('subheading', formData.subheading);

    nestedImages.forEach((image) => {
      if (selectedFiles[image.index]) {
        updateFormData.append(`images_${image.index}`, selectedFiles[image.index]);
      }
      updateFormData.append(`name_${image.index}`, image.name);
      updateFormData.append(`subtext_${image.index}`, image.subtext);
    });
    const token=localStorage.getItem('token');
    try {
    const domain = window.location.hostname;
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/servicePage/update`, updateFormData, {
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
      setEditMode(false); 
      setSelectedFiles({});
      fetchProducts(); 
      handleSuccess();
      closeForm();
    } catch (error) {
      console.error('Error updating content:', error);
      // alert('Failed to update content. Please try again.');
      handleError()
    }
  };

  const closeForm = () => {
    setEditMode(false);
    setSelectedFiles({});
  };
    return (
        <>
           <section className={`appie-download-area pt-150 pb-160 mb-90 ${className || ''}`}>
           <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="appie-hero-content">
              <span>Download Our App</span>
                <h1 className="appie-title">
                  {products[0]?.title}{' '}
                </h1>
                {/* <ToastContainer/> */}
                
                <p>{products[0]?.subheading}</p>
                <ul>
                  <li>
                    <a href="#"><i className="fab fa-apple" /> Download for iOS</a>
                    
                  </li>
                  <li>
                    <a className="item-2" href="#"><i className="fab fa-google-play" /> Download for Android</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="appie-hero-thumb ms-lg-4">
                <div className="thumb wow animated fadeInUp" data-wow-duration="2000ms" data-wow-delay="200ms" 
                // style={{ marginLeft: '10px' }}
                >
                  <img src={nestedImages[0]?.imageUrl} className="ml-10" style={{ maxHeight: '500px' }} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
  {/* Decorative Shapes */}
 <div className="download-shape-1">
    <img src={shape15} alt="Shape 1" />
  </div>
  <div className="download-shape-2">
    <img src={shape14} alt="Shape 2" />
  </div>
  <div className="download-shape-3">
    <img src={shape13} alt="Shape 3" />
  </div>
</section>


 
        </>
    );
}

export default DownloadHomeTwo;
