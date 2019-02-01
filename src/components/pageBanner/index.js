import React from 'react';
import PropTypes from 'prop-types';

export const PageBanner = ({ text }) => <h2>{text}</h2>;

PageBanner.propTypes = {
    text: PropTypes.string.isRequired,
};

export default PageBanner;
