
import Navigation from '../Navigation.jsx';
function HomeOneHeader({action}) {
    return (
        <header className={`appie-header-area appie-sticky `}>
        <div className="container">
            <div className="header-nav-box">
                <div className="row align-items-center">
                    <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1 mb-lg-1 mt-lg-1">
                        <div className="appie-logo-box">
                                <a href="/">
                                    <img src="src/assets/images/WhatsApp Image 2024-08-19 at 17.28.07_53dae6d7.jpg" 
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

export default HomeOneHeader;
