// Home.js
import React from 'react';
import TemplateCard from './TemplateCard';
import Loader from "../Helper/Loader.jsx";
// Images for the templates

import templateOneImage from '../../assets/images/Screenshot2.png';
import templateTwoImage from '../../assets/images/Screenshot 2024-11-12 at 4.38.08 PM.png'
import templateThreeImage from '../../assets/images/Screenshot3.png';
const TempSelection = () => {
  return (
    <div className="tw-min-h-screen tw-bg-gray-800 tw-flex tw-justify-center tw-items-center tw-px-4 md:tw-px-8 lg:tw-px-16 tw-py-10">
      <div className="tw-w-full tw-max-w-7xl">
        <h1 className="tw-text-2xl md:tw-text-3xl lg:tw-text-4xl tw-font-bold tw-text-white tw-text-center tw-mb-8 md:tw-mb-10">
          Select a Template
        </h1>
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-place-items-center">
          <TemplateCard
            image={templateOneImage}
            title="Template One"
            link="/template-1"
          />
          <TemplateCard
            image={templateTwoImage}
            title="Template Two"
            link="/template-2"
          />
          <TemplateCard
            image={templateThreeImage}
            title="Template Three"
            link="/template-3"
          />
          <TemplateCard
            title="Coming Soon"
            link="/template-4"
          />
          <TemplateCard
            title="Coming Soon"
            link="/template-5"
          />
          <TemplateCard
            title="Coming Soon"
            link="/template-6"
          />
        </div>
      </div>
    </div>
  );
};

export default TempSelection;
