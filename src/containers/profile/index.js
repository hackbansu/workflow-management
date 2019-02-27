import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { toast } from 'react-toastify';
import { showLoader } from 'utils/helpers/loader';
import { showModal } from 'utils/helpers/modal';
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
            if (response.status !== 200) {
                showModal('Update Failed', 'Profile update failed');
                return;
            }

            const { first_name: firstName, last_name: lastName, profile_photo_url: profilePhoto } = body;

            // dispatch action to update user data in store
            updateProfile(firstName, lastName, profilePhoto, email, userId, isAdmin, designation, status);

            toast.info('Profile Updated');
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
