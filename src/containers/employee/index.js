import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { toast } from 'react-toastify';
import { showModal } from 'utils/helpers/modal';
import { makeUpdateRequest, makeInviteRequest, makeRemoveRequest, getEmployee } from 'services/employees';
import { updateProfileAction } from 'actions/user';
import { updateEmployeeAction } from 'actions/employees';
import { errorParser } from 'utils/helpers/errorHandler';
import ApiConstants from 'constants/api';

// importing components
import EmployeeForm from 'components/employeeForm';

export class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onResendInvite = this.onResendInvite.bind(this);
        this.onRemoveEmployee = this.onRemoveEmployee.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onReportClick = this.onReportClick.bind(this);

        const { employees, match } = this.props;
        const { id: employeeId } = match.params;

        let currentEmployee = null;
        for (const employeeType in employees) {
            if (Object.prototype.hasOwnProperty.call(employeeType, String(employeeId))) {
                currentEmployee = employees[employeeType[employeeId]];
            }
        }

        this.state = { currentEmployee };
    }

    componentDidMount() {
        const { updateEmployee, match } = this.props;
        const { id: employeeId } = match.params;

        getEmployee(employeeId).then(employee => {
            this.setState({
                currentEmployee: employee,
            });
        });
    }

    /**
     * function to submit update employee request.
     */
    onSubmit = (firstName, lastName, designation, isAdmin) => {
        const { updateProfile, redirectPage, currentUser } = this.props;
        const { currentEmployee } = this.state;
        if (!currentUser.isAdmin) {
            return;
        }

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeUpdateRequest(firstName, lastName, '', designation, isAdmin, currentEmployee.id).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                const errMsg = errorParser(body, 'Employee update failed');
                showModal('Update Failed', errMsg);
                return;
            }

            const { user, designation, is_admin: isAdmin, status } = body;
            const {
                email,
                id: userId,
                first_name: firstName,
                last_name: lastName,
                profile_photo_url: profilePhoto,
            } = user;

            if (userId === currentUser.id) {
                updateProfile(firstName, lastName, profilePhoto, email, userId, isAdmin, designation, status);
            }

            toast.success('Update Successful');
            redirectPage(ApiConstants.EMPLOYEES_PAGE);
        });
    };

    onResendInvite = () => {
        const { currentUser } = this.props;
        const { currentEmployee } = this.state;
        const { designation } = currentEmployee;
        const { firstName, lastName, email } = currentEmployee.user;

        if (!currentUser.isAdmin) {
            return;
        }

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeInviteRequest(email, firstName, lastName, designation).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                showModal('Failed', 'Invite failed');
                return;
            }

            toast.info('Invite Sent');
        });
    };

    onRemoveEmployee = () => {
        const { redirectPage, currentUser } = this.props;
        const { currentEmployee } = this.state;

        if (!currentUser.isAdmin) {
            return;
        }

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeRemoveRequest(currentEmployee.id).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 204) {
                const errMsg = errorParser(body, 'Failed to remove the employee');
                showModal('Removal Failed', errMsg);
                return;
            }

            toast.success('Removal Successful');
            redirectPage(ApiConstants.EMPLOYEES_PAGE);
        });
    };

    onBackClick = () => {
        const { redirectPage } = this.props;
        redirectPage(ApiConstants.EMPLOYEES_PAGE);
    };

    onReportClick = () => {
        const { redirectPage } = this.props;
        const { currentEmployee } = this.state;
        const { id: employeeId } = currentEmployee;

        redirectPage(`${ApiConstants.EMPLOYEE_PAGE}/${employeeId}${ApiConstants.EMPLOYEE_REPORT_PAGE}`);
    };

    /**
     * function to render the component.
     */
    render() {
        const { currentUser } = this.props;
        const { currentEmployee } = this.state;

        if (!currentEmployee) {
            return '';
        }

        const { isAdmin: isUserAdmin } = currentUser;
        const { isAdmin, designation, status, user } = currentEmployee;

        const { firstName, lastName, email } = user;

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
                        onResendInvite={this.onResendInvite}
                        onRemoveEmployee={this.onRemoveEmployee}
                        onBackClick={this.onBackClick}
                        onReportClick={this.onReportClick}
                    />
                </div>
            </div>
        );
    }
}

Employee.propTypes = {
    currentUser: PropTypes.object.isRequired,
    employees: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired,
    redirectPage: PropTypes.func.isRequired,
};

Employee.defaultProps = {};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    employees: state.employees,
});

const mapDispatchToProps = dispatch => ({
    updateEmployee: (...args) => dispatch(updateEmployeeAction(...args)),
    updateProfile: (...args) => dispatch(updateProfileAction(...args)),
    redirectPage: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Employee);
