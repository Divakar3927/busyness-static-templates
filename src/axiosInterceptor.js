import axios from 'axios';

let alertShown = false;  // Flag to prevent duplicate alerts

// Helper function to show alert with status and manage flag
function showAlertOnce(status, message) {
  if (!alertShown) {
    alert(`Error ${status}: ${message}`);
    alertShown = true;

    // Optionally reset the flag after some time (e.g., 5 seconds)
    setTimeout(() => {
      alertShown = false;
    }, 5000); // Adjust the timeout as needed
  }
}

// Axios interceptor to handle responses globally
axios.interceptors.response.use(
  response => response,  // Success path, just return the response
  error => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          showAlertOnce(status, 'Your session has expired. Please log in again.');
          window.location.href = '/login';
          break;
        case 403:
          showAlertOnce(status, 'You do not have permission to access this resource.');
          break;
        case 503:
        //   showAlertOnce(status, 'The server is currently down for maintenance. Please check back later.');
          window.location.href = '/maintenance';
          break;
        case 500:
        //   showAlertOnce(status, 'The server encountered an error. Please try again later.');
          window.location.href = '/server-error';
          break;
        case 404:
          showAlertOnce(status, 'The resource you requested could not be found.');
          break;
        default:
          showAlertOnce(status, data?.message || 'An error occurred. Please try again later.');
      }
    } else if (error.request) {
      // Use 0 to represent a network error with no response
      // showAlertOnce('The server is currently unreachable. Please check your connection or try again later.');
      window.location.href = '/server-unreachable';
    } else if (error.code === 'ECONNABORTED') {
      showAlertOnce('Timeout', 'The server is taking too long to respond. Please try again later.');
    } else {
      showAlertOnce('Unknown', 'An unexpected error occurred. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default axios;
