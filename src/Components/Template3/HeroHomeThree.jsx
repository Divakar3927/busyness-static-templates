import React from 'react';
function HeroHomeThree() {
    return (
        <>
          <section className="appie-hero-area appie-hero-3-area position-relative">
                
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-11">
                        <div className="appie-hero-content text-center">
                            <h1 className="appie-title">Sri Vasista Mart</h1>
                            <p>
                            A one-stop solution for all your needed groceries
                            </p>
                            <div className="hero-btns">
                                <a className="main-btn" href="">
                                <i className="fab fa-google-play" /> Download for Android
                                </a>
                                <a className="main-btn" href="">
                                <i className="fab fa-apple" /> Download for iOS
                                </a>
                            </div>
                            <div
                                className="thumb mt-100 wow animated fadeInUp"
                                data-wow-duration="2000ms"
                                data-wow-delay="400ms"
                            >
                                <img src="src/assets/images/super-mart.jpg" alt="" style={{
                                    marginBottom: '3rem',
                                }}/>
                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>
        </>
    );
}
export default HeroHomeThree;