import React from 'react';
import shape13 from '../../assets/images/shape/shape-13.png';
import shape14 from '../../assets/images/shape/shape-14.png';
function showCaseHomeThree() {
    
    return (
        <>
            <section id='Products' className={"appie-team-area pt-40 pb-100 position-relative"} style={{ backgroundColor: '#eef1f6' }}>
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="appie-section-title text-center">
                            <h3 className="appie-title">Our User-Friendly Interface</h3>
                        </div>
                    </div>
                </div>
                <div className="row appie-showcase-slider">
                    <div className="col-lg-12">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="appie-showcase-item mt-30" style={{ margin: '0px 0px' }}>
                                <a className="appie-image-popup">
                                    <img src="src/assets/images/1.jpeg" alt="1" />
                                </a>
                            </div>
                            <div className="appie-showcase-item mt-30" style={{ margin: '0 10px' }}>
                                <a className="appie-image-popup">
                                    <img src="src/assets/images/2.jpeg" alt="2" />
                                </a>
                            </div>
                            <div className="appie-showcase-item mt-30" style={{ margin: '0 10px' }}>
                                <a className="appie-image-popup">
                                    <img src="src/assets/images/3.jpeg" alt="3" />
                                </a>
                            </div>
                            <div className="appie-showcase-item mt-30" style={{ margin: '0 10px' }}>
                                <a className="appie-image-popup">
                                    <img src="src/assets/images/4.jpeg" alt="4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div className="showcase-shape-1">
                  <img src={shape14} alt="shape-14" />
              </div>
              <div className="showcase-shape-2">
                  <img src={shape13} alt="" />
              </div>

            </section>
        </>
    );
}

export default showCaseHomeThree;
