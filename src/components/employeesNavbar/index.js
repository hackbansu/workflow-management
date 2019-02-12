import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import EmployeesNavbarField from 'components/employeesNavbarField';

/**
 * Functional component of the employees navbar.
 * @param {object} param0 - props object for the component.
 */
export const EmployeesNavbar = ({ onClick }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
            Employees
        </a>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <EmployeesNavbarField name="ALL" onClick={onClick} />
                <EmployeesNavbarField name="ACTIVE" onClick={onClick} />
                <EmployeesNavbarField name="INACTIVE" onClick={onClick} />
                <EmployeesNavbarField name="INVITED" onClick={onClick} />
            </ul>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                    Search
                </button>
            </form>
        </div>
    </nav>
);

EmployeesNavbar.propTypes = {
    onClick: PropTypes.func.isRequired,
};

EmployeesNavbar.defaultProps = {};

export default EmployeesNavbar;
