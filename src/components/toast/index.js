import React from 'react';
import PropTypes from 'prop-types';

export const Toast = ({ text }) => <h4>{text}</h4>;

Toast.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Toast;
