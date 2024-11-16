import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handleSuccess, handleError } from '../Toast';
import imageCompression from 'browser-image-compression';
import { logoutTemp1 } from '../../constants/auth';
import "../../assets/css/main.css";
// import thumb from '../../assets/images/features-thumb-1.png';
import shapeSix from '../../assets/images/shape/shape-6.png';
import shapeSeven from '../../assets/images/shape/shape-7.png';
import shapeEight from '../../assets/images/shape/shape-8.png';

const FeaturesHomeTwo = () => {
    const [products, setProducts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        title1: '',
        titleOrg: '',
        description1: '',
        description2: '',
        imageUrl: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const editModalRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (editModalRef.current && !editModalRef.current.contains(event.target)) {
                setEditMode(false);
            }
        };

        if (editMode) {
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
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/offerPage/`, {
                headers: {
                    'X-Frontend-Domain': domain
                }
            });
            const data = res.data;
            setProducts(data);

            if (data.length > 0) {
                setFormData({
                    id: data[0]._id,
                    title1: data[0].title1,
                    titleOrg: data[0].titleOrg,
                    description1: data[0].description1,
                    description2: data[0].description2,
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

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setLoading(true);
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 850,
                    useWebWorker: true,
                };

                const compressedFile = await imageCompression(file, options);
                setSelectedFile(compressedFile);
                setLoading(false);
            } catch (error) {
                console.error('Error compressing file:', error);
            }
        }
        setImageUploaded(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateFormData = new FormData();
        updateFormData.append('id', formData.id);
        updateFormData.append('title1', formData.title1);
        updateFormData.append('titleOrg', formData.titleOrg);
        updateFormData.append('description1', formData.description1);
        updateFormData.append('description2', formData.description2);

        if (selectedFile) {
            updateFormData.append('image', selectedFile);
        }
        const token = localStorage.getItem('token');
        try {
            const domain = window.location.hostname;
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/offerPage/update`, updateFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                    'x-frontend-domain': domain
                },
            }).catch(error => {
                if (error.response.status === 401) {
                    logoutTemp1();
                }
            });
            setEditMode(false);
            fetchProducts();
            handleSuccess();
            closeForm();
        } catch (error) {
            console.error('Error updating content:', error);
            handleError();
        }
    };

    const closeForm = () => {
        setEditMode(false);
    };

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
        <section className='appie-features-area-2 pt-100'>
                           <div className="row mb-4">
                                <div className="col-lg-12 text-center">
                                    <h2 className="special-offer-title" style={{color:'white'}}>
                                        <span>{products[0]?.titleOrg || "Special "} </span>
                                        {' '}
                                        {products[0]?.title1}
                                    </h2>
                                </div>
                            </div>
            <Slider {...settings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <section className="appie-project-area pb-150">
                        <div className="container mt-5">
                            {/* Special Offer Heading */}
                            <div className="row align-items-center appie-project-box pt-10"
                            style={{
                                backgroundImage: `url("https://busynesss3practise.s3.ap-south-1.amazonaws.com/Orange+Easter+Sale+Facebook+Fundraiser+Cover+Photo+(1)/${products[0]?.banner}.png")`,
                                backgroundSize: 'cover',     // Ensures the image covers the entire section
                                backgroundPosition: 'center' // Centers the image within the section
                            }}>
                                {/* Content Section */}
                                <div className="col-lg-6 col-md-12 order-lg-1 order-2">
                                    <div className="appie-project-content">
                                        <h3 className="title">{products[0]?.description1 || "Get 25% off on fruits"}</h3>
                                        <p>{products[0]?.description2 || "Download the app & order now"}</p>
                                        <div className="team-btn mt-50">
                                            <a className="main-btn" href="#">
                                                <span style={{ fontWeight: 'bold', color: '#fff' }}>Order Now</span>
                                                <i className="fal fa-arrow-right" style={{ color: '#fff' }} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Section */}
                                <div className="col-lg-6 col-md-12 order-lg-2 order-1 text-center d-flex justify-content-center align-items-center">
                                    <div className="appie-project-thumb mt-3">
                                        <img
                                            src={products[0]?.imageUrl || "/path-to-your-image.jpg"}
                                            alt="Offer Image"
                                            className="img-fluid responsive-img"
                                            style={{ maxHeight: '300px', maxWidth: '100%', width: 'auto' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
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
            </section>
        </>
    );
};

export default FeaturesHomeTwo;
