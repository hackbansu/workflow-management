import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { changeLoaderStateAction } from 'actions/common';
import { updateProfileAction } from 'actions/user';
import { makeUpdateRequest } from 'services/employees';
import './index.scss';

// importing components
import EmployeeForm from 'components/employeeForm';

/**
 * Login page component.
 */
export class Employee extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
        const { employees, match } = this.props;
        const { id: employeeId } = match.params;

        for (const obj of employees) {
            if (obj.id === parseInt(employeeId)) {
                this.currentEmployee = obj;
                break;
            }
        }
    }

    /**
     * function to submit login request.
     */
    onSubmit = (firstName, lastName, designation, isAdmin) => {
        const { changeLoaderState, history } = this.props;

        // dispatch action to show loader
        changeLoaderState('visible');

        // call the service function
        makeUpdateRequest(firstName, lastName, '', designation, isAdmin, this.currentEmployee.id).then(obj => {
            changeLoaderState('invisible');

            if (!obj) {
                return;
            }

            const { response, body } = obj;

            history.push('/');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        const { currentUser } = this.props;

        const { isAdmin: isUserAdmin } = currentUser;
        const { isAdmin, designation, status } = this.currentEmployee;
        const { firstName, lastName, email } = this.currentEmployee.user;

        return (
            <div className="profile-page">
                <div className="container">
                    <EmployeeForm
                        onSubmit={this.onSubmit}
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        isAdmin={isAdmin}
                        status={status}
                        designation={designation}
                        isUserAdmin={isUserAdmin}
                    />
                </div>
            </div>
        );
    }
}

Employee.propTypes = {
    changeLoaderState: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    employees: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
};

Employee.defaultProps = {};

const mapStateToProps = state => ({
    loaderClass: state.loader.class,
    currentUser: state.currentUser,
    employees: state.employees,
});

const mapDispatchToProps = dispatch => ({
    changeLoaderState: value => dispatch(changeLoaderStateAction(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Employee);
