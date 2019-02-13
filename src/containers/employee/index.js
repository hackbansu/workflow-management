import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { showToast } from 'utils/helpers/toast';
import { makeUpdateRequest } from 'services/employees';
import { updateProfileAction } from 'actions/user';

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
     * function to submit update employee request.
     */
    onSubmit = (firstName, lastName, designation, isAdmin) => {
        const { updateProfile, history, currentUser } = this.props;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeUpdateRequest(firstName, lastName, '', designation, isAdmin, this.currentEmployee.id).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
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
            history.push('/employees');
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
    history: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    employees: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
};

Employee.defaultProps = {};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    employees: state.employees,
});

const mapDispatchToProps = dispatch => ({
    updateProfile: (...args) => dispatch(updateProfileAction(...args)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Employee);
