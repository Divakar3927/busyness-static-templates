import { useState, useEffect } from 'react';
import useToggle from '../Hooks/useToggle.js';
import BackToTop from '../BackToTop.jsx';
import Drawer from './DrawerOne.jsx';
import FooterHomeOne from './FooterHomeOne.jsx';
import HeroHomeOne from './HeroHomeOne.jsx';
import HomeOneHeader from './HomeOneHeader.jsx';
import ProjectHomeOne from './ProjectHomeOne.jsx';
import ServicesHomeOne from './ServicesHomeOne.jsx';
import TeamHomeOne from './PopularProducts.jsx';
import TestimonialHomeOne from './TestimonialHomeOne.jsx';
import TrafficHomeOne from './AboutUsPage.jsx';
import Loader from '../Helper/Loader.jsx';
import { logoutTemp1 } from '../../constants/auth.js';

function HomeOne() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [drawer, drawerAction] = useToggle(false);
    const [loading, setLoading] = useState(true);
    return (
        <>
            {/* {loading && (
                <div className="appie-loader active">
                </div>
            )} */}
            {/* <div className={`appie-visible ${!loading ? 'active' : ''}`}> */}
                <Drawer drawer={drawer} action={drawerAction.toggle} />
                <HomeOneHeader action={drawerAction.toggle} />
                <HeroHomeOne isAdmin={isAdmin} />
                <ServicesHomeOne isAdmin={isAdmin} />
                <TrafficHomeOne isAdmin={isAdmin} />
                <TestimonialHomeOne isAdmin={isAdmin} />
                <TeamHomeOne isAdmin={isAdmin} bg="#eef1f6" />
                <ProjectHomeOne isAdmin={isAdmin} />
                <FooterHomeOne setIsAdmin={setIsAdmin} />
                <BackToTop />
            {/* </div> */}
        </>
    );
}

export default HomeOne;
