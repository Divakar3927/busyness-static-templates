import Drawer from "../Mobile/Drawer";
import HeroHomeFour from "./HeroHomeFour"
import useToggle from "../Hooks/useToggle";
import FooterHomeFour from "./FooterFour";
import { useState } from "react";
import TestimonialSliderOne from './TestimonialFour'
import PopularProducts from "./PopularProducts";
import DownloadAppFour from "./DownloadAppFour";
import BackToTop from '../BackToTop.jsx';
import AboutUsFour from "./AboutUsFour.jsx";
import Navbar from "./Navbar.jsx";
import { Nav } from "react-bootstrap";
const HeroFour=()=>{
    const [drawer, drawerAction] = useToggle(false);
    const [isAdminTempFour, setIsAdminTempFour] = useState(false);
    return (
        <>
        {/* <Drawer drawer={drawer} action={drawerAction.toggle} /> */}
        <Navbar />
        <HeroHomeFour isAdminTempFour={isAdminTempFour}/>
        <PopularProducts isAdminTempFour={isAdminTempFour}/>       
        <AboutUsFour  isAdminTempFour={isAdminTempFour}/>
        <TestimonialSliderOne
            sectionSpace="sec-ptb-160"
            bgColor="bg-light-black"
            isAdminTempFour={isAdminTempFour}
          />
           <DownloadAppFour/>
          
        <FooterHomeFour setIsAdminTempFour={setIsAdminTempFour}/>
        <BackToTop/>
        </>
        
    );
}
export default HeroFour;