import React from 'react';
import './Maintenance.css'; // Optional: Add your styles here

const Maintenance = () => {

  // Handle back to home navigation
  const goToHome = () => {
    window.location.href = '/'; // This will redirect to the home page
  };

  return (
    <div className="maintenance-container">
      <h1>We'll be back soon!</h1>
      <p>Our website is currently undergoing maintenance. Thank you for your patience.</p>
      <img src="/Website Building of Shopping Sale (1).gif" alt="Maintenance GIF" className="maintenance-gif" />
      
      {/* Back to Home button */}
      <button className="back-to-home-btn" onClick={goToHome}>
        Back to Home
      </button>
    </div>
  );
};

export default Maintenance;
