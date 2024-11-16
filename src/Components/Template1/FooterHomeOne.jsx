import React from 'react';

function FooterHomeOne() {
  return (
    <>
      <section id="footer" className="appie-footer-area position-relative pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-about-widget" style={{ textAlign: "left" }}>
                <div className="logo">
                  <a href="#">
                    <img 
                      src="src/assets/images/WhatsApp Image 2024-08-19 at 17.28.07_53dae6d7.jpg"
                      alt="logo"
                      width={100}
                      height={100} 
                    />
                  </a>
                </div>
                <span className="d-block text-muted mt-3">
                  Busy1234@gmail.com
                  <br />
                  <div className="mt-2">9999988888</div>
                  <div className="d-flex align-items-center gap-3 mt-3 ms-2">
                    <ul className="d-flex gap-3 list-unstyled">
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-reset mr-3"
                        >
                          <img 
                            src="src/assets/images/facebook.jpeg" 
                            alt="Facebook" 
                            width={39} 
                            height={39} 
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-reset mr-3"
                        >
                          <img 
                            src="src/assets/images/whatsapp.jpeg" 
                            alt="whatsapp" 
                            width={39} 
                            height={39} 
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-reset mr-3"
                        >
                          <img 
                            src="src/assets/images/instagram.jpeg" 
                            alt="Instagram" 
                            width={39} 
                            height={39} 
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </span>
              </div>
            </div>
            
            <div className="col-lg-8 col-md-12 mt-20 d-flex justify-content-between flex-wrap gap-4">
              {/* Useful Links Section */}
              <div 
                className="col-lg-3 col-md-4 col-sm-6 mb-4" 
                style={{ marginTop: "30px" }}
              >
                <h4 className="h5 text-black mb-3" style={{ textAlign: "left" }}>
                  Useful Links
                </h4>
                <ul className="list-unstyled">
                  <li className="mt-2 text-muted"><a href="#" className="text-reset text-decoration-none">Home</a></li>
                  <li className="mt-2 text-muted"><a href="#Products" className="text-reset text-decoration-none">Products</a></li>
                  <li className="mt-2 text-muted"><a href="#about-us" className="text-reset text-decoration-none">About Us</a></li>
                  <li className="mt-2 text-muted"><a href="#Service" className="text-reset text-decoration-none">Services</a></li>
                  <li className="mt-2 text-muted"><a href="#footer" className="text-reset text-decoration-none">Contact Us</a></li>
                </ul>
              </div>
              
              {/* Help & Support Section */}
              <div 
                className="col-lg-3 col-md-4 col-sm-6 mb-4" 
                style={{ marginTop: "30px" }}
              >
                <h4 className="h5 text-black mb-3" style={{ textAlign: "left" }}>
                  Help & Support
                </h4>
                <ul className="list-unstyled">
                  <li className="mt-2 text-muted"><a href="/" className="text-reset text-decoration-none">FAQs</a></li>
                  <li className="mt-2 text-muted"><a href="/" className="text-reset text-decoration-none">How It Works</a></li>
                  <li className="mt-2 text-muted"><a href="/" className="text-reset text-decoration-none">Privacy Policy</a></li>
                  <li className="mt-2 text-muted"><a href="/" className="text-reset text-decoration-none">Payment Policy</a></li>
                </ul>
              </div>
              
              {/* Let’s Try Out Section */}
              <div 
                className="col-lg-3 col-md-4 col-sm-6 mb-4" 
                style={{ marginTop: "30px" }}
              >
                <h4 className="h5 text-black mb-3" style={{ textAlign: "left" }}>
                  Let’s Try Out
                </h4>
                <ul className="list-unstyled">
                  <li className="mt-2 text-muted">
                    <a
                      href="https://play.google.com/store/apps/details?id=srivasistafoods.busyness.app"
                      className="btn text-white px-4 py-2 rounded"
                      style={{ backgroundColor: '#2a70fa', border: 'none', width: '103.58px' }}
                    >
                      Android
                    </a>
                  </li>
                  <li className="mt-2 text-muted">
                    <a
                      href="https://apps.apple.com/in/app/sri-vasista-mart/id6443676161"
                      className="btn text-white px-4 py-2 rounded"
                      style={{ backgroundColor: '#2a70fa', border: 'none', width: '103.58px' }}
                    >
                      iOS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FooterHomeOne;
