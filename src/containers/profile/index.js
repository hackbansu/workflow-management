import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { showToast } from 'utils/helpers/toast';
import { showLoader } from 'utils/helpers/loader';
import { updateProfileAction } from 'actions/user';
import { makeUpdateRequest } from 'services/user';

// importing components
import ProfileForm from 'components/profileForm';

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
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * function to submit profile update request.
     */
    onSubmit = (firstName, lastName, profilePhoto) => {
        const { updateProfile, history, currentUser } = this.props;
        const { id: userId, email, isAdmin, designation, status } = currentUser;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeUpdateRequest(firstName, lastName, profilePhoto).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            const { first_name: firstName, last_name: lastName, profile_photo: profilePhoto } = body;

            // dispatch action to update user data in store
            updateProfile(firstName, lastName, profilePhoto, email, userId, isAdmin, designation, status);

            showToast('Profile Updated');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        const { currentUser } = this.props;
        const { firstName, lastName, email, isAdmin, designation, status } = currentUser;

        return (
            <div className="profile-page">
                <div className="container">
                    <ProfileForm
                        onSubmit={this.onSubmit}
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        isAdmin={isAdmin}
                        status={status}
                        designation={designation}
                    />
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
};

Profile.defaultProps = {};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
    updateProfile: (...args) => dispatch(updateProfileAction(...args)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
