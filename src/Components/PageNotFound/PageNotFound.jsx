// PageNotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-screen tw-bg-gray-100 tw-text-center tw-px-4">
      <h1 className="tw-text-9xl tw-font-extrabold tw-text-red-500">404</h1>
      <p className="tw-text-2xl tw-font-semibold tw-mt-4 tw-text-gray-800">
        Oops! Page Not Found
      </p>
      <p className="tw-mt-2 tw-text-gray-600">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="tw-mt-6">
        <button className="tw-bg-blue-600 tw-text-white tw-px-6 tw-py-3 tw-rounded-md hover:tw-bg-blue-700 tw-transition tw-duration-200">
          Go Back to Home
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
