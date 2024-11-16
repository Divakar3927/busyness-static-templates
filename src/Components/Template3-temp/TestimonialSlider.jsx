import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// TestimonialItem component
const TestimonialItem = ({ imageUrl, rating, description , name}) => {
    return (
        <div className="appie-testimonial-slider-2-item">
            <div className="item">
                <div className="thumb">
                <img 
                        className="tw-w-48 tw-h-48 tw-object-cover tw-rounded-full tw-border-4 tw-border-gray-300" 
                        src={imageUrl} 
                        alt={name} 
                        style={{ width: '192px', height: '192px' }} 
                    />
                    <ul>
                        {Array.from({ length: 5 }, (_, i) => (
                            <li key={i}>
                                <i className="fas fa-star" />
                            </li>
                        ))}
                    </ul>
                    <span>({rating}) review</span>
                </div>
                <div className="content">
                    <p>{description }</p>
                    <div className="author-info">
                        <h5 className="title">{name}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Slider component
const TestimonialSlider = ({ sliderRef, settings, testimonials }) => {
    if (testimonials.length === 1) {
        // Directly render the single testimonial without using Slider
        return (
            <div className="single-testimonial">
                <TestimonialItem
                    imageUrl={testimonials[0].imageUrl}
                    rating={testimonials[0].rating}
                    description={testimonials[0].description}
                    name={testimonials[0].name}
                />
            </div>
        );
    }
    return (
        <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
                <TestimonialItem
                    key={index}
                    imageUrl={testimonial.imageUrl}
                    rating={testimonial.rating}
                    description={testimonial.description}
                    name={testimonial.name}
                />
            ))}
        </Slider>
    );
};

export default TestimonialSlider;
