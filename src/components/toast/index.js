import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const Toast = ({ toastClass, text }) => {
    const className = toastClass + ' toast-cover';
    return (
        <div className={className}>
            <h4 className="toast">{text}</h4>
        </div>
    );
};

Toast.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Toast;
