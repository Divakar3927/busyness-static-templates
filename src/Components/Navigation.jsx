// import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <a href="#Service">Service</a>
                </li>
                <li>
                     
                     <a href="#about-us">About us</a> 
                </li>
                {/* <li>
                    <a href="#Products">Popular Products</a>
                </li> */}
                <li>
                    <a href="#footer">Contact</a>
                </li>
            </ul>
        </>
    );
}

export default Navigation;
