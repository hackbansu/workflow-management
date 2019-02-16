import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';

import { updateEmployeesAction } from 'actions/employees';
import { makeFetchRequest } from 'services/employees';
import userConstants from 'constants/user';
import ApiConstants from 'constants/api';
import { showToast } from 'utils/helpers/toast';

import './index.scss';

// import components
import EmployeesNavbar from 'components/employeesNavbar';
import EmployeeTableRow from 'components/employeeTableRow';

/**
 * Login page component.
 */
export class Profile extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            filteredEmployees: [],
        };
        this.filterEmployees = this.filterEmployees.bind(this);
        this.searchEmployees = this.searchEmployees.bind(this);
    }

    componentWillMount() {
        const { updateEmployees } = this.props;

        makeFetchRequest().then(obj => {
            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                showToast('Employees update failed');
                return;
            }

            const activeEmployees = {};
            const inactiveEmployees = {};
            const invitedEmployees = {};

            const data = body.forEach(emp => {
                const {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    profile_photo_url: profilePhoto,
                    id: userId,
                } = emp.user;
                const { designation, is_admin: isAdmin, status, id: employeeId } = emp;

                const employeeData = {
                    user: {
                        firstName,
                        lastName,
                        profilePhoto:
                            profilePhoto.substring(0, 4) === 'http'
                                ? profilePhoto
                                : `${ApiConstants.MEDIA_URL}${profilePhoto}`,
                        email,
                        id: userId,
                    },
                    designation,
                    isAdmin,
                    status,
                    id: employeeId,
                };

                switch (status) {
                case userConstants.STATUS.ACTIVE:
                    activeEmployees[employeeId] = employeeData;
                    break;

                case userConstants.STATUS.INACTIVE:
                    inactiveEmployees[employeeId] = employeeData;
                    break;
                case userConstants.STATUS.INVITED:
                    invitedEmployees[employeeId] = employeeData;
                    break;
                default:
                    break;
                }
            });

            // dispatch action to update employees
            updateEmployees(activeEmployees, inactiveEmployees, invitedEmployees);
        });
    }

    componentWillReceiveProps(nextProps) {
        const { employees } = nextProps;
        const filterEmployees = [];

        Object.entries(employees).forEach(employeeTypes => {
            Object.entries(employeeTypes[1]).forEach(employee => {
                filterEmployees.push(employee[1]);
            });
        });

        this.setState({
            filteredEmployees: filterEmployees,
        });
    }

    filterEmployees(type) {
        const { employees } = this.props;
        const filteredEmployees = [];

        switch (type) {
        case 'ACTIVE':
            Object.entries(employees.activeEmployees).forEach(employee => {
                filteredEmployees.push(employee[1]);
            });
            break;
        case 'INACTIVE':
            Object.entries(employees.inactiveEmployees).forEach(employee => {
                filteredEmployees.push(employee[1]);
            });
            break;
        case 'INVITED':
            Object.entries(employees.invitedEmployees).forEach(employee => {
                filteredEmployees.push(employee[1]);
            });
            break;
        default:
            Object.entries(employees).forEach(employeeTypes => {
                Object.entries(employeeTypes[1]).forEach(employee => {
                    filteredEmployees.push(employee[1]);
                });
            });
        }

        this.setState({
            filteredEmployees,
        });
    }

    searchEmployees(searchVal) {
        const { employees } = this.props;

        const filteredEmployees = [];

        Object.entries(employees).forEach(employeeTypes => {
            Object.entries(employeeTypes[1]).forEach(employee => {
                const employeeData = employee[1];
                let found = false;
                if (employeeData.user.firstName.toLowerCase().indexOf(searchVal) !== -1) {
                    found = true;
                } else if (employeeData.user.lastName.toLowerCase().indexOf(searchVal) !== -1) {
                    found = true;
                } else if (employeeData.user.email.toLowerCase().indexOf(searchVal) !== -1) {
                    found = true;
                } else if (employeeData.designation.toLowerCase().indexOf(searchVal) !== -1) {
                    found = true;
                }

                if (found) {
                    filteredEmployees.push(employeeData);
                }
            });
        });

        this.setState({
            filteredEmployees,
        });
    }

    /**
     * function to render the component.
     */
    render() {
        const { filteredEmployees } = this.state;
        return (
            <div>
                <EmployeesNavbar onClick={this.filterEmployees} onSearch={this.searchEmployees} />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="employee-pic">
                                Profile Pic
                            </th>
                            <th scope="col">First NAME</th>
                            <th scope="col">Last NAME</th>
                            <th scope="col">DESIGNATION</th>
                            <th scope="col">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(data => (
                            <EmployeeTableRow data={data} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

Profile.propTypes = {
    updateEmployees: PropTypes.func.isRequired,
    employees: PropTypes.object,
};

Profile.defaultProps = {
    employees: {},
};

const mapStateToProps = state => ({
    employees: state.employees,
});

const mapDispatchToProps = dispatch => ({
    updateEmployees: (...args) => dispatch(updateEmployeesAction(...args)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
