import React from 'react';

function Navigation({ lang = false }) {
    return (
        <>
            
                <ul>
                    <li>
                        <a href="#">
                            Home <i/>
                        </a>
                        {/* <Link to="/">Home</Link> */}

                    </li>
                    <li>
                        <a href="#servicepage">
                            Service <i/>
                        </a>
                        {/* <Link to="">Service</Link> */}
                    </li>
                    <li>
                        <a href="#banner">
                            Offers
                        </a>
                        
                    </li>
                    <li>
                        <a href="#features">
                            About us
                        </a>
                    </li>
                    <li>
                    <a href="#footer">
                            Contact
                        </a>
                    </li>
                </ul>
        </>
    );
}

export default Navigation;
