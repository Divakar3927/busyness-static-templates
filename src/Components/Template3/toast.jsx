// Toast.js
// import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Functions to trigger toast notifications
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const showWarningToast = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const handleSuccess = () => {
  showSuccessToast('Updated Succesfully!');
};
export const handleError = () => {
  showErrorToast('Failed to update. Please try again.');
};
export const handleAdminSuccess = () => {
  showSuccessToast("Success! You're now logged in.");
};
export const handleAdminlogout = () => {
  showSuccessToast("You've logged out successfully. See you next time!");
};
export const handleAdminerror= () => {
  showErrorToast ("Login failed. Please check your credentials.");
};

