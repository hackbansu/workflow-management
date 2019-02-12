import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


/**
 * Functional component of the sidebar field.
 * @param {object} param0 - props object for the component.
 */
export const EmployeesNavbarField = ({ name, onClick }) => (
    <li className="nav-item">
        <a className="nav-link" onClick={onClick}>
            {name}
        </a>
    </li>
);

EmployeesNavbarField.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

EmployeesNavbarField.defaultProps = {};

export default EmployeesNavbarField;
