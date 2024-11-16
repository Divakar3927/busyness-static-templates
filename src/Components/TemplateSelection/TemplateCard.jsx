// TemplateCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const TemplateCard = ({ image, title, link }) => {
  return (
    <div className="tw-w-full tw-h-80 tw-rounded-3xl tw-overflow-hidden tw-shadow-lg tw-bg-white tw-transition-transform tw-transform hover:tw-scale-105 tw-flex tw-flex-col tw-items-center">
      {image && <img className="tw-w-full tw-h-48 tw-object-cover" src={image} alt={title} />}
      <div className="tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-4 tw-py-4">
        <h3 className="tw-font-bold tw-text-xl tw-mb-2">{title}</h3>
        <Link
          to={link}
          className="tw-inline-block tw-bg-blue-500 tw-text-white tw-px-3 tw-py-2 tw-rounded tw-mt-2 hover:tw-bg-blue-600"
        >
          View Template
        </Link>
      </div>
    </div>
  );
};

export default TemplateCard;
