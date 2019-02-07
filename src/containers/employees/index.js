import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { updateEmployeesAction } from 'actions/employees';
import { makeFetchRequest } from 'services/employees';
import './index.scss';

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
        this.state = {};
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
                    profile_photo: profilePhoto,
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

    /**
     * function to render the component.
     */
    render() {
        const { employees } = this.props;
        console.log('type :', typeof employees);
        console.log('employees :', employees);
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">First NAME</th>
                        <th scope="col">Last NAME</th>
                        <th scope="col">DESIGNATION</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(data => (
                        <tr key={data.user.firstName + data.user.lastName + data.designation}>
                            <td>
                                <Link to={'/employee/' + data.id}>{data.user.firstName}</Link>
                            </td>
                            <td>{data.user.lastName}</td>
                            <td>{data.designation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
