import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Functional component of the sidebar field.
 * @param {object} param0 - props object for the component.
 */
export const sidebarField = ({ name, fieldType, redirectUrl, isVisible, onClick, imgUrl }) => {
    if (!isVisible) {
        return '';
    }
    return (
        <li data-field-type={fieldType}>
            <Link to={redirectUrl} onClick={onClick}>
                {imgUrl ? <img src={imgUrl} className="display-pic" alt="profile pic" /> : ''}
                {name}
            </Link>
        </li>
    );
};

sidebarField.propTypes = {
    name: PropTypes.string.isRequired,
    fieldType: PropTypes.string.isRequired,
    redirectUrl: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
    onClick: PropTypes.func,
    imgUrl: PropTypes.string,
};

sidebarField.defaultProps = {
    isVisible: false,
    onClick: null,
    imgUrl: null,
};

export default sidebarField;
