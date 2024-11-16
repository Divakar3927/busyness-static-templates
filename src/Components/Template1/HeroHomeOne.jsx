import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function HeroHomeOne() {
  return (
    <>
      <section  className={`appie-hero-area `}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="appie-hero-content">
              <span></span>
              <h6 className="appie-title">
                Showcase your Application.{' '}
                <span style={{ color: 'orange' }}></span>This is your go-to app for all
              </h6>
              <ToastContainer />
              <p></p>
              <ul>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-apple" /> Download for iOS
                  </a>
                </li>
                <li>
                  <a
                    className="item-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-google-play" /> Download for Android
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="appie-hero-thumb ms-lg-4">
              <div
                className="thumb wow animated fadeInUp"
                data-wow-duration="2000ms"
                data-wow-delay="200ms"
              >
                <img
                  src="src/assets/images/hero-thumb-9.png"
                  className="ml-10"
                  style={{ maxHeight: '500px' }}
                  alt="Footwear"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

export default HeroHomeOne;
