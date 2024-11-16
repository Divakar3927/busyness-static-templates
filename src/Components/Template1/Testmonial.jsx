import React, { useState } from 'react';
import Rating from '@mui/material/Rating';

const Testimonial = ({ userImage, name, reviewText, rating,  onRatingChange  }) => {

  const [value, setValue] = useState(rating); // Initialize with the passed rating

  const handleRatingChange = (newValue) => {
    setValue(newValue);
    if (onRatingChange) {
      onRatingChange(newValue); // Call the callback to update the rating in the parent
    }
  };
  return (
    <div className="appie-testimonial-item text-center">
      <div className="author-info">
        <img 
          src={userImage} 
          alt={name} 
          className="rounded-circle img-fluid"  // Bootstrap classes for rounded and responsive image
          style={{ width: '120px', height: '120px', objectFit: 'cover', backgroundColor: 'grey' }}  // Inline styles for fixed size and object-cover
        />
        <h5 className="title">{name}</h5>
       
      </div>
      <div className="text">
        <p>{reviewText}</p>
        <Rating
          name="testimonial-rating"
          value={value}
          precision={0.5} 
          // onChange={(event, newValue) => handleRatingChange(newValue)} // Update rating on change
          readOnly
        />
      </div>
    </div>
  );
};

export default Testimonial;
