import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { showToast } from 'utils/helpers/toast';
import { showModal } from 'utils/helpers/modal';
import { makeUpdateRequest, makeInviteRequest, makeRemoveRequest } from 'services/employees';
import { updateProfileAction } from 'actions/user';
import ApiConstants from 'constants/api';

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
        this.onResendInvite = this.onResendInvite.bind(this);
        this.onRemoveEmployee = this.onRemoveEmployee.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
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
     * function to submit update employee request.
     */
    onSubmit = (firstName, lastName, designation, isAdmin) => {
        const { updateProfile, redirectPage, currentUser } = this.props;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeUpdateRequest(firstName, lastName, '', designation, isAdmin, this.currentEmployee.id).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                showModal('Update Failed', 'Employee update failed');
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

            showToast('Update Successful');
            redirectPage(ApiConstants.EMPLOYEES_PAGE);
        });
    };

    onResendInvite = () => {
        const { designation } = this.currentEmployee;
        const { firstName, lastName, email } = this.currentEmployee.user;

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

            showToast('Invite Sent');
        });
    };

    onRemoveEmployee = () => {
        const { redirectPage } = this.props;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeRemoveRequest(this.currentEmployee.id).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 204) {
                showModal('Removal Failed', 'Failed to remove the employee');
                return;
            }

            showToast('Removal Successful');
            redirectPage(ApiConstants.EMPLOYEES_PAGE);
        });
    };

    onBackClick = () => {
        const { redirectPage } = this.props;
        redirectPage(ApiConstants.EMPLOYEES_PAGE);
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
                        onResendInvite={this.onResendInvite}
                        onRemoveEmployee={this.onRemoveEmployee}
                        onBackClick={this.onBackClick}
                    />
                </div>
            </div>
        );
    }
}

Employee.propTypes = {
    currentUser: PropTypes.object.isRequired,
    employees: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    redirectPage: PropTypes.func.isRequired,
};

Employee.defaultProps = {};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    employees: state.employees,
});

const mapDispatchToProps = dispatch => ({
    updateProfile: (...args) => dispatch(updateProfileAction(...args)),
    redirectPage: (url) => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Employee);
