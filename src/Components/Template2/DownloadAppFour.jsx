import React from 'react';
import shape13 from '../../assets/images/shape/shape-13.png';
import shape14 from '../../assets/images/shape/shape-14.png';
import shape15 from '../../assets/images/shape/shape-15.png';

function DownloadAppFour({ className }) {
  const formData = {
    title: 'Experience Our Smooth Interface',
    subheading: 'Providing seamless car rental services, tailored for every journey and needd.',
    imageUrl: 'src/assets/images/fresh.jpg'
  }
  
    return (
        <>
           <section className={`appie-download-area-Home-Four pt-100 pd-150 ${className || ''}`} >
           <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="appie-hero-content">
              <span>Download Our App</span>
                <h1 className="appie-title">
                  {formData.title}{' '}
                </h1>
                {/* <ToastContainer/> */}
                
                <p>{formData.subheading}</p>
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
                  <img src={formData.imageUrl} className="ml-10" style={{ maxHeight: '500px' }} alt="" />
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
  <br />
  <br />
  <br />
</section>


 
        </>
    );
}

export default DownloadAppFour;
