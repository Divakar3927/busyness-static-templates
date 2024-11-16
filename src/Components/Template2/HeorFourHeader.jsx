
// import logo7 from '../../assets/images/logo-7.png';
// import logo from '../../assets/images/logo.png';
import StickyMenu from '../lib/StickyMenu.js';
import Navigation from '../Navigation.jsx';
import { useEffect, useState} from 'react';
import axios from 'axios';


function HomeFourHeader({
    action,
}) {
    const [products, setProducts] = useState([]);
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
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    
    useEffect(() => {
        StickyMenu();
    });
    
    return (
        <header className={`appie-header-area-home-four appie-sticky `}>
        <div className="container">
            <div className="header-nav-box">
                <div className="row align-items-center">
                    <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1 mb-lg-1 mt-lg-1">
                        <div className="appie-logo-box">
                                <a href="/">
                                    <img src={products[0]?.imageUrl} 
                                    style={{ width: window.innerWidth > 768 ? '85px' : '60px', maxWidth: '90px' }}alt="" />
                                </a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
                        <div className="appie-header-main-menu">
                            <Navigation />
                        </div>
                    </div>
                    <div className="col-lg-4  col-md-7 col-sm-6 col-6 order-2 order-sm-3 " >
                        <div className="appie-btn-box text-right">
                            <a className="main-btn ml-30" href="#">
                                Order Now
                            </a>
                            <div
                                onClick={(e) => action(e)}
                                className="toggle-btn ml-30 canvas_open d-lg-none d-block"
                            >
                                <i className="fa fa-bars" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    );
}

export default HomeFourHeader;
