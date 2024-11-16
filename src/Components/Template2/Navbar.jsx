import React, { useState, useEffect, useRef } from "react";
import "./NavbarStyles.css";
import { HashLink as Lin } from "react-router-hash-link";
import { MenuItems } from "./MenuItems";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";

const Navbar = ({ className }) => {
    const [clicked, setClicked] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const navRef = useRef(null);
    const scrollTimeout = useRef(null);

    const handleClick = () => setClicked(!clicked);
    const closeMenu = () => setClicked(false);

    // Scroll event to handle navbar visibility and "scrolled" styling
    useEffect(() => {
        const handleScroll = () => {
            const halfwayPoint = window.innerHeight / 2;
            setIsScrolled(window.scrollY > halfwayPoint);

            // Show navbar while scrolling and reset visibility timeout
            setIsVisible(true);
            clearTimeout(scrollTimeout.current);

            // Hide navbar after 2 seconds of inactivity if the mouse is not over it
            scrollTimeout.current = setTimeout(() => {
                if (!isMouseOver) setIsVisible(false);
            }, 2000);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout.current);
        };
    }, [isMouseOver]);

    // Mouse events to control visibility when hovered
    const handleMouseEnter = () => {
        setIsMouseOver(true);
        setIsVisible(true); // Ensure visibility when mouse is over
        clearTimeout(scrollTimeout.current); // Cancel hiding while hovered
    };

    const handleMouseLeave = () => {
        setIsMouseOver(false);
        // Set timeout to hide navbar after mouse leaves
        scrollTimeout.current = setTimeout(() => {
            if (!isMouseOver) setIsVisible(false);
        }, 2000);
    };

    // Clicks outside the navbar close the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav
            ref={navRef}
            className={`NavbarItems ${isScrolled ? "scrolled" : ""} ${className} ${isVisible ? "visible" : "hidden"} tw-absolute`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="logo-container">
                 <Link to="/"> 
                    <img src="src/assets/images/logo2.jpeg" alt="Logo" className="navbar-logo-image" /></Link> 
                  {/* <Link to="/">  <h1 className="navbar-logo tw-text-lg md:tw-text-3xl">One Cricket</h1></Link>  */}
                
            </div>

            <div className="menu-icons" onClick={handleClick}>
                <i className={`${clicked ? "fas fa-times" : "fas fa-bars"} ${!clicked ? "bars-bg" : "cross-bg"}`}></i>
            </div>

            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                {MenuItems.map((item, index) => (
                    <li key={index}>
                        {/* Use Link when you want to navigate to different pages or routes.
Use Lin when you want to navigate to a specific part of a page or when you need smooth scrolling to a section within a page. */}
                        <Lin className={item.cName} to={item.url} smooth onClick={closeMenu}>
                            <i className={item.icon}></i>{item.title}
                        </Lin>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
