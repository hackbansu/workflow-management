import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Functional component of the sidebar field.
 * @param {object} param0 - props object for the component.
 */
export const sidebarField = ({ name, redirectUrl, isVisible, onClick }) => {
    if (!isVisible) {
        return '';
    }
    return (
        <li>
            <Link to={redirectUrl} onClick={onClick}>
                {name}
            </Link>
        </li>
    );
};

sidebarField.propTypes = {
    name: PropTypes.string.isRequired,
    redirectUrl: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
    onClick: PropTypes.func,
};

sidebarField.defaultProps = {
    isVisible: false,
    onClick: null,
};

export default sidebarField;
