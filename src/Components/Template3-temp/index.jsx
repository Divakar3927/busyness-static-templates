import React, { useState, useEffect } from 'react';
import useToggle from '../Hooks/useToggle.js';
import BackToTop from '../BackToTop.jsx';
import Drawer from '../Mobile/Drawer.jsx';
import DownloadHomeTwo from './DownloadHomeTwo.jsx';
import FeaturesHomeTwo from './FeaturesHomeTwo.jsx';
import FooterHomeTwo from './FooterHomeTwo.jsx';
import HeaderHomeTwo from './HeaderHomeTwo.jsx';
import HeroHomeTwo from './HeroHomeTwo.jsx';
import TestimonialHomeTwo from './TestimonialHomeTwo.jsx';
import AboutUs from './AboutUs.jsx';
import Products from './Products.jsx';
import Loader from '../Helper/Loader.jsx';
import axios from 'axios';
import Maintenance from '../Maintenance.jsx';
import Banner from './Banner.jsx';

function HomeTwo() {
    const [isAdminTemp3, setIsAdminTemp3] = useState(false);
    const [drawer, drawerAction] = useToggle(false);
    const [isServerDown, setIsServerDown] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BASE_URL}/api/heartbeat`);
                setIsServerDown(false);
                setLoading(false);
            } catch (error) {
                console.error('Server is down:', error);
                setIsServerDown(true);
                setLoading(false); // Stop loading even if server is down
            }
        };

        // Initial check
        checkServerStatus();

        // Poll server status only if it was initially down
        const interval = isServerDown 
            ? setInterval(checkServerStatus, 10000 * 60) 
            : null;

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isServerDown]);

    // Show Maintenance page if server is confirmed to be down
    if (!loading && isServerDown) {
        return <Maintenance />;
    }

    return (
        <>
            {loading ? (
                <div className="appie-loader active">
                    <Loader />
                </div>
            ) : (
                <div className="appie-visible active">
                    <Drawer drawer={drawer} action={drawerAction.toggle} />
                    <HeaderHomeTwo action={drawerAction.toggle} />
                    <HeroHomeTwo isAdminTemp3={isAdminTemp3} />
                    <Products bg="white" isAdminTemp3={isAdminTemp3} />
                    <Banner isAdminTemp3={isAdminTemp3} />
                    {/* <FeaturesHomeTwo isAdminTemp3={isAdminTemp3}/> */}
                    <AboutUs isAdminTemp3={isAdminTemp3} />
                    <DownloadHomeTwo isAdminTemp3={isAdminTemp3} />
                    <TestimonialHomeTwo isAdminTemp3={isAdminTemp3} />
                    <FooterHomeTwo setIsAdminTemp3={setIsAdminTemp3} />
                    <BackToTop className="back-to-top-2" />
                </div>
            )}
        </>
    );
}

export default HomeTwo;
