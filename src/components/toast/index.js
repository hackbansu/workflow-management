import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

/**
 * Functional component for toast.
 * @param {object} param0 - props object for the component.
 */
export const Toast = ({ show, text }) => {
    let className = 'toast-cover';
    if (show) {
        className += ' show-toast';
    } else {
        className += ' hide-toast';
    }
    return (
        <div className={className}>
            <h4 className="my-toast">{text}</h4>
        </div>
    );
};

Toast.propTypes = {
    show: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

export default Toast;
