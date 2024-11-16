import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './assets/css/bootstrap.min.css';
import './assets/css/custom-animated.css';
import './assets/css/default.css';
import './assets/css/font-awesome.min.css';
import './assets/css/magnific-popup.css';
import './assets/css/magnific.dark.css';
import './assets/css/magnific.rtl.css';
import './assets/css/main.css';
import './assets/css/style.css';
import './axiosInterceptor.js';
createRoot(document.getElementById('root')).render(
  <StrictMode>
   < BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
