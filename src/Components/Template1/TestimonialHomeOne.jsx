
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Testimonial from './Testmonial';
import { useRef } from 'react';

function TestimonialHomeOne() {
    const nestedImages = [
        {
          imageUrl: "src/assets/images/bg-4.jpg",
          subtext: "Ensuring fruits, vegetables, meats, and dairy are consistently fresh and well-stocked.",
          name: "Car Selection",
          rating: 4
        },
        {
          imageUrl: "src/assets/images/bg-2.jpg",
          subtext: "Providing fast checkout options, helpful staff, and responsive customer support.",
          name: "Product Variety and Quality",
          rating: 5
        }
      ];
    const sliderRef = useRef();
    const sliderNext = () => {
        sliderRef.current.slickNext();
    };
    const sliderPrev = () => {
        sliderRef.current.slickPrev();
    };
    return (
        <section className={`appie-testimonial-area pt-100 pb-160 position-relative`} id="testimonial">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="appie-testimonial-slider" style={{ position: 'relative' }}>
                    {nestedImages.length > 1 ? (
                        <Slider
                            ref={sliderRef}
                            dots={true} // Enable dots for navigation
                            arrows={false} // Disable default arrows (using custom arrows)
                            autoplay={true} // Enable autoplay
                            autoplaySpeed={5000} // Set autoplay speed
                            infinite={true} // Ensure infinite scrolling
                            slidesToShow={1} // Show one slide at a time
                            slidesToScroll={1} // Scroll one slide at a time
                            speed={500} // Set transition speed
                        >
                            {nestedImages.map((image) => (
                                <Testimonial
                                    key={image} // Ensure a unique key
                                    userImage={image.imageUrl}
                                    name={image.name}
                                    rating={image.rating}
                                    reviewText={image.subtext}
                                    style={{ transition: 'none' }}
                                />
                            ))}
                        </Slider>
                    ) : (
                        // Show a single testimonial without the slider if there's only one item
                        nestedImages.map((image) => (
                            <Testimonial
                                key={image} // Ensure a unique key
                                userImage={image.imageUrl}
                                name={image.name}
                                rating={image.rating}
                                reviewText={image.subtext}
                                style={{ transition: 'none' }}
                            />
                        ))
                    )}
                    
                    {nestedImages.length > 1 && (
                        <div className="slider-arrows">
                            <div className="prev slick-arrow" onClick={sliderPrev}>
                                <i className="fal fa-arrow-left"></i>
                            </div>
                            <div className="next slick-arrow" onClick={sliderNext}>
                                <i className="fal fa-arrow-right"></i>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>


        </section>
    );
}

export default TestimonialHomeOne;
