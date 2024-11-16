import React from 'react';
// import './ServerError.css';  // Optional custom styles

const ServerUnreachable = () => {

  // Handle back to home navigation
  const goToHome = () => {
    window.location.href = '/'; // This will redirect to the home page
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <h1 className="display-3 text-danger">Oops! Something went wrong.</h1>
        <p className=" lead text-danger">The server is currently unreachable. Please check your connection or try again later.</p>
        
        {/* Optional: Server error image */}
        {/* <img src="/server-error.gif" alt="Server Error" className="img-fluid my-4" /> */}

        {/* Back to Home button */}
        <button className="btn btn-primary btn-lg tw-bg-purple-900" onClick={goToHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ServerUnreachable;
