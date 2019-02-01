import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export const PageBanner = ({ text }) => (
    <div className="page-banner">
        <h2 className="heading">{text}</h2>
    </div>
);

PageBanner.propTypes = {
    text: PropTypes.string.isRequired,
};

export default PageBanner;
