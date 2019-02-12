import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import EmployeesNavbarField from 'components/employeesNavbarField';

/**
 * Functional component of the employees navbar.
 * @param {object} param0 - props object for the component.
 */
export class EmployeesNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.clickAction = this.clickAction.bind(this);
        this.activeElement = null;
    }

    componentDidMount() {
        this.activeElement = document.getElementsByClassName('navbar-nav mr-auto')[0].children[0];
    }

    clickAction(e) {
        const { onClick } = this.props;
        e.preventDefault();

        const dataType = e.target.getAttribute('data-type');

        this.activeElement.classList.remove('active');
        e.target.classList.add('active');
        this.activeElement = e.target;

        // call the click handler
        onClick(dataType);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/employees">
                    Employees
                </Link>
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
                    <ul className="navbar-nav mr-auto" onClick={this.clickAction}>
                        <EmployeesNavbarField name="All" active="active" type="ALL" />
                        <EmployeesNavbarField name="Active" type="ACTIVE" />
                        <EmployeesNavbarField name="Inactive" type="INACTIVE" />
                        <EmployeesNavbarField name="Invited" type="INVITED" />
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </nav>
        );
    }
}

EmployeesNavbar.propTypes = {
    onClick: PropTypes.func.isRequired,
};

EmployeesNavbar.defaultProps = {};

export default EmployeesNavbar;
