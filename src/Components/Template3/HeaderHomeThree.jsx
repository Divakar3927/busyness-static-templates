import StickyMenu from '../lib/StickyMenu.js';
import Navigation from '../Navigation.jsx';
import React, {useEffect} from 'react';
function HeaderHomeThree({action}) {
    useEffect(() => {
        StickyMenu();
    });
    return (
        <>  
            <header className="appie-header-area appie-header-3-area appie-sticky">
                <div className="container">
                    <div className="header-nav-box header-nav-box-3">
                        <div className="row align-items-center">
                            <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
                                <div className="appie-logo-box" >
                                    <a href="/">
                                        <img 
                                        src="src/assets/images/Decorative Flourishes Antique Ornamental Crown Logo.png"
                                        alt="logo"
                                        width='90'
                                        height='90'/>   
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
                                <div className="appie-header-main-menu">
                                    <Navigation />
                                </div>
                            </div>
                            <div className="col-lg-4  col-md-7 col-sm-6 col-6 order-2 order-sm-3">
                                <div className="appie-btn-box text-right">
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
        </>
    );
}

export default HeaderHomeThree;
