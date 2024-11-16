import {useState} from 'react';

import React from 'react';
import useToggle from '../Hooks/useToggle.js';
import BackToTop from '../BackToTop.jsx';
import Drawer from '../Mobile/Drawer.jsx';
import AboutHomeThree from './AboutHomeThree.jsx';
import FooterHomeThree from './FooterHomeThree.jsx';
import FunFactHomeThree from './FunFactHomeThree.jsx';
import HeaderHomeThree from './HeaderHomeThree.jsx';
import HeroHomeThree from './HeroHomeThree.jsx';
import ServicesHomeThree from './ServicesHomeThree.jsx';
import ShowCaseHomeThree from './ShowCaseHomeThree.jsx';

function HomeThree() {
    const [drawer, drawerAction] = useToggle(false);
    const [isAdmin, setIsAdmin] = useState(false);
    return (
        <>
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HeaderHomeThree action={drawerAction.toggle} />
            <HeroHomeThree isAdmin={isAdmin}/>
            <ServicesHomeThree isAdmin={isAdmin}/>
            {/* <FunFactHomeThree isAdmin={isAdmin}/> */}
            <AboutHomeThree isAdmin={isAdmin}/>
            <ShowCaseHomeThree isAdmin={isAdmin}/>
            <FooterHomeThree setIsAdmin={setIsAdmin}/>
            <BackToTop className="back-to-top-3" />
        </>
    );
}

export default HomeThree;
