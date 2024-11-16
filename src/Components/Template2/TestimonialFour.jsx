import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./TestimonialFour.css";
const TestimonialSliderOne = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  const testimonials = [
    {
      id: 1,
      imageUrl: 'src/assets/images/AAA.jpeg',
      name: 'Bharath',
      rating: 4,
      description: 'This grocery store has an impressive selection of fresh produce, organic items, and international foods! I can always find what I am looking for, and the quality of fruits and vegetables is top-notch. They clearly prioritize freshness and variety, which makes shopping here a pleasure.'
    },
    {
      id : 2,
      imageUrl: 'src/assets/images/AAAA.jpeg',
      name: 'Rohit',
      rating: 5,
      description: 'I love that this store supports local farmers and offers a variety of organic options. It is so reassuring to know I am buying high-quality, locally sourced products. It is wonderful to shop somewhere that cares about sustainability and community.'
    }

  ];


  return (
    <section className={`gradient-custom position-relative` }>
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className="text-center mb-4 pb-2">
              <i className="fas fa-quote-left fa-3x text-white"></i><br/>
              <span className="sub-title mb-6 mt-15">Customer Review</span>
              <h2 className="title-text mb-0">What people say</h2>
            </div>
            <div className="card">
              <div className="card-body px-4 py-5 ">
              {/* {nestedImages.length > 1 ? ( */}
                <Slider {...settings}>
                  {testimonials.map((testimonials) => (
                    <div key={testimonials.id} className="carousel-item mt-30">
                      <div className="row d-flex justify-content-center">
                        <div className="col-lg-10 col-xl-8">
                          <div className="row">
                            <div className="col-lg-4 d-flex justify-content-center mx-lg-auto">
                              <img
                                src={testimonials.imageUrl}
                                className="rounded-circle shadow-1 mb-4 mb-lg-0"
                                // alt={`${testimonials.name} avatar`}
                                width="150"
                                height="150"
                              />
                            </div>
                            <div className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
                              <h4 className="mb-4">
                                {testimonials.name}<br />
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={`fa-star ${
                                      i < testimonials.rating
                                        ? "fas text-warning"
                                        : "far text-muted"
                                    }`}
                                    style={{ fontSize: "0.8em" }} // Decreased font size for the rating stars
                                  ></i>
                                ))}
                              </h4>
                              <p className="mb-0 pb-3">{testimonials.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="text-center mt-4 pt-2">
              <i className="fas fa-quote-right fa-3x text-white"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSliderOne;
