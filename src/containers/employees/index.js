import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';

import { updateEmployeesAction } from 'actions/employees';
import { makeFetchRequest } from 'services/employees';
import userConstants from 'constants/user';

// import components
import EmployeesNavbar from 'components/employeesNavbar';

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

            const data = body.map(emp => {
                const {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    profile_photo_url: profilePhoto,
                    id: userId,
                } = emp.user;
                const { designation, is_admin: isAdmin, status, id: employeeId } = emp;

                return {
                    user: {
                        firstName,
                        lastName,
                        profilePhoto,
                        email,
                        id: userId,
                    },
                    designation,
                    isAdmin,
                    status,
                    id: employeeId,
                };
            });

            // dispatch action to update employees
            updateEmployees(data);
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filteredEmployees: nextProps.employees,
        });
    }

    filterEmployees(type) {
        const { employees } = this.props;
        let data;
        if (type === 'ALL') {
            data = employees;
        } else {
            data = employees.filter(employee => userConstants.STATUS[employee.status] === type);
        }
        this.setState({
            filteredEmployees: data,
        });
    }

    searchEmployees(searchVal) {
        const { employees } = this.props;
        const data = employees.filter(employee => employee.user.firstName.toLowerCase().indexOf(searchVal) !== -1);
        this.setState({
            filteredEmployees: data,
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
                            <th scope="col">First NAME</th>
                            <th scope="col">Last NAME</th>
                            <th scope="col">DESIGNATION</th>
                            <th scope="col">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(data => (
                            <LinkContainer to={`/employee/${data.id}`}>
                                <tr key={data.user.firstName + data.user.lastName + data.designation}>
                                    <td>{data.user.firstName}</td>
                                    <td>{data.user.lastName}</td>
                                    <td>{data.designation}</td>
                                    <td>{userConstants.STATUS[data.status]}</td>
                                </tr>
                            </LinkContainer>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

Profile.propTypes = {
    updateEmployees: PropTypes.func.isRequired,
    employees: PropTypes.array,
};

Profile.defaultProps = {
    employees: [],
};

const mapStateToProps = state => ({
    employees: state.employees,
});

const mapDispatchToProps = dispatch => ({
    updateEmployees: data => dispatch(updateEmployeesAction(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
