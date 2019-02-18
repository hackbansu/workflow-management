import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/**
 * Functional component for the page banner.
 * @param {object} param0 - props object for the component.
 */
export const PageBanner = ({ text }) => (
    <div className="row page-banner justify-content-center">
        <h2 className="heading">{text}</h2>
    </div>
);

PageBanner.propTypes = {
    text: PropTypes.string.isRequired,
};

export default PageBanner;
