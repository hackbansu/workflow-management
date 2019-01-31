import React from 'react';
import PropTypes from 'prop-types';

export const PageBanner = ({ text }) => <h4>{text}</h4>;

PageBanner.propTypes = {
    text: PropTypes.string.isRequired,
};
