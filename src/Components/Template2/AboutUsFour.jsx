import { Container} from '@mui/material';
import animation from '../../assets/animations/aboutUsAnimation.gif'

function AboutUsFour() {
  return (
        <section id="about-us" className={`appie-traffic-area  position-relative`}>
  <div className="min-vh-100 pt-5 pb-5 px-3 d-flex align-items-center" style={{ backgroundColor: '#f8fffb' }}>
            <Container>
               {/* Centered About Us Title */}
               <div className="text-center mb-5">
                    <h1 className="display-5 font-weight-bold text-success">
                        About Us
                    </h1>
                </div>
                <div className="row align-items-center mx-auto max-w-7xl">
                    
                    {/* Animation - Right Column */}
                    <div className="col-lg-6 text-center order-lg-last mb-4 mb-lg-0">
                        <img
                            className="img-fluid"
                            src={animation}
                            alt="About Us Animation"
                            style={{
                                maxHeight: '30rem',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                    
                    {/* Text Content - Left Column */}
                    <div className="col-lg-6 text-left">
                        <h2 className="display-5 font-weight-bold text-dark mb-4">
                            Welcome to Our Grocery App
                        </h2>
                        <p className="text-muted">
                            At <strong>Grocery</strong>, we are committed to providing you with the freshest,
                            highest quality products for all your daily needs. Explore our extensive selection
                            of fresh vegetables, meats, dairy products, pantry staples, and more. We handpick
                            our suppliers to ensure that you receive only the best.
                        </p>
                        <p className="text-muted">
                            Enjoy a seamless shopping experience with our easy-to-use platform and dependable
                            delivery service. Say goodbye to long lines and heavy bags — simply browse, add to
                            cart, and relax as we bring the store to your door.
                        </p>
                        <p className="text-muted">
                            Our commitment to excellent customer service is at the heart of everything we do.
                            Whether you have a question or need support, our dedicated team is here for you,
                            ensuring that your shopping experience is nothing short of exceptional.
                        </p>
                        <p className="text-muted">
                            Discover the convenience of shopping from home with <strong>Grocery</strong>.
                            Start shopping today and elevate your everyday life.
                        </p>
                    </div>

                </div>
            </Container>
        </div>
      </section>

    );
}

export default AboutUsFour;
