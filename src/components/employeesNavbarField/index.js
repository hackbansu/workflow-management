import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Functional component of the sidebar field.
 * @param {object} param0 - props object for the component.
 */
export const EmployeesNavbarField = ({ name, type, active, onClick }) => (
    <li className={`nav-item ${active}`}>
        <a className="nav-link" data-type={type} onClick={onClick}>
            {name}
        </a>
    </li>
);

EmployeesNavbarField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    active: PropTypes.string,
    onClick: PropTypes.func,
};

EmployeesNavbarField.defaultProps = {
    active: '',
    onClick: null,
};

export default EmployeesNavbarField;
