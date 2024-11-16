import React from 'react';
function FooterHomeFour({ setIsAdminTempFour }) {
    const socialHandles = [
      {
        id: 1,
        imageUrl: 'src/assets/images/facebook.jpeg'
      },
      {
        id: 2,
        imageUrl: 'src/assets/images/whatsapp.jpeg'
      },
      {
        id: 3,
        imageUrl: 'src/assets/images/instagram.jpeg'
      }
    ];
    return (
        <>
            <section id="footer" className="appie-footer-area position-relative tw-text-white" style={{ backgroundColor: '#123F1E',color: '#faf5f5' }}>
                <div className="container">
                  <div className="row justify-content-center text-center text-lg-start">
                    {/* Left Column - Logo and Contact Information */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <div className="footer-about-widget">
                        {/* Logo Section */}
                        <div className="logo mb-3">
                          <a href="#">
                            <img src="src/assets/images/logo2.jpeg" alt="logo" width={80} height={80} />
                          </a>
                        </div>
                        {/* Contact Information */}
                        <div className="text-muted tw-text-white tw-text-xl sm:tw-text-sm">
                          <div style={{color:'white'}}>Busy1234@gmail.com</div>
                          <div className="mt-2 sm:tw-text-xl" style={{color:'white'}}>+91 9999988888</div>
                          <div className="mt-3 fw-bold" style={{color:'white'}}>Follow us on:</div>
                        </div>
                        {/* Social Media Links */}
                        <ul className="d-flex align-items-center justify-content-center gap-3 mt-2 list-unstyled">
                          {socialHandles.map((socialHandles) => (
                            <li key={socialHandles.id}>
                              <a href="" target="_blank" rel="noopener noreferrer">
                                <img src={socialHandles.imageUrl} alt="" width={35} height={35} style={{marginLeft:'20px', borderRadius: '10px'}}/>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column - Link Sections */}
                    <div className="col-lg-8 col-md-12 d-flex flex-wrap justify-content-between text-center text-lg-start gap-4 mt-10">
  {/* Section 1 */}
  <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
    <h4 className="h5 text-black mt-3 mb-3" style={{ color: 'white' }}>Useful Links</h4>
    <ul className="list-unstyled">
    <li className="mt-2 text-muted">
        <a href="#link1" className="text-reset text-decoration-none" style={{ color: 'white' }}>
          <span style={{ color: 'white' }}>Home</span>
        </a>
      </li>
      <li className="mt-2 text-muted">
        <a href="#link2" className="text-reset text-decoration-none" style={{ color: 'white' }}>
          <span style={{ color: 'white' }}>Products</span>
        </a>
      </li>
      <li className="mt-2 text-muted">
        <a href="#link1" className="text-reset text-decoration-none" style={{ color: 'white' }}>
          <span style={{ color: 'white' }}>About Us</span>
        </a>
      </li>
      <li className="mt-2 text-muted">
        <a href="#link2" className="text-reset text-decoration-none" style={{ color: 'white' }}>
          <span style={{ color: 'white' }}>Services</span>
        </a>
      </li>
      <li className="mt-2 text-muted">
        <a href="#link2" className="text-reset text-decoration-none" style={{ color: 'white' }}>
          <span style={{ color: 'white' }}>Contact Us</span>
        </a>
      </li>
      {/* Add more links here as needed */}
    </ul>
  </div>

  {/* Section 2 */}
  <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
    <h4 className="h5 text-black mt-3 mb-3" style={{ color: 'white' }}>Help & Support</h4>
    <ul className="list-unstyled">
      <li className="mt-2 text-muted">
        <a href="#link1" className="text-reset text-decoration-none" style={{ color: 'white' }}>
          <span style={{ color: 'white' }}>FAQs</span>
        </a>
      </li>
      <li className="mt-2 text-muted">
        <a href="#link2" className="text-reset text-decoration-none" style={{ color: 'white' }}>
          <span style={{ color: 'white' }}>How It Works</span>
        </a>
      </li>
      <li className="mt-2 text-muted">
        <a href="#link1" className="text-reset text-decoration-none" style={{ color: 'white' }}>
          <span style={{ color: 'white' }}>Privacy Policy</span>
        </a>
      </li>
      <li className="mt-2 text-muted">
        <a href="#link2" className="text-reset text-decoration-none" style={{ color: 'white' }}>
          <span style={{ color: 'white' }}>Payment Policy</span>
        </a>
      </li>
      {/* Add more links here as needed */}
    </ul>
  </div>

  {/* Section 3 with Button Links */}
  <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
    <h4 className="h5 text-black mt-3 mb-3" style={{ color: 'white' }}>Let’s Try Out</h4>
    <ul className="list-unstyled">
      <li className="mt-2 text-muted">
        <a href="#link1" className="btn btn-danger text-white px-4 py-2 rounded" style={{ color: 'white', width: '105px' }}>
          <span style={{ color: 'white' }}>Android</span>
        </a>
      </li>
      <li className="mt-2 text-muted">
        <a href="#link2" className="btn btn-danger text-white px-4 py-2 rounded" style={{ color: 'white', width: '105px'}}>
          <span style={{ color: 'white' }}>iOS</span>
        </a>
      </li>
      {/* Add more button links here as needed */}
    </ul>
  </div>

  {/* Add more sections as needed */}
</div>

                  </div>

                  {/* Footer Bottom Section */}
                  <div className="row mt-1">
                    <div className="col-lg-12">
                      <div className="footer-copyright d-flex align-items-center justify-content-center justify-content-lg-between pt-3 mt-10">
                        {/* Copyright Text */}
                        <div className="text-muted" >
                          <p style={{color:'white'}}>&copy; 2024 Busyness.App. All rights reserved.</p>
                        </div>
                        {/* Admin Controls */}
                        <div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
    );
}

export default FooterHomeFour;
