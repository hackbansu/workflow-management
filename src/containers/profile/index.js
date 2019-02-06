import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { changeLoaderStateAction } from 'actions/common';
import { updateProfileAction } from 'actions/user';
import { makeUpdateRequest } from 'services/auth';
import './index.scss';

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
     * function to submit login request.
     */
    onSubmit = (password, firstName, lastName) => {
        const { changeLoaderState, updateProfile, history, currentUser } = this.props;
        const { id: userId, email } = currentUser;

        // dispatch action to show loader
        changeLoaderState('visible');

        // call the service function
        makeUpdateRequest(password, firstName, lastName, userId).then(obj => {
            changeLoaderState('invisible');

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            const { first_name: firstName, last_name: lastName, profile_photo: profilePhoto } = body;

            // dispatch action to update user data in store
            updateProfile(firstName, lastName, profilePhoto, email, userId);

            // redirect to home page
            history.push('/');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        const { currentUser } = this.props;
        const { firstName, lastName, email } = currentUser;

        return (
            <div className="profile-page">
                <div className="container">
                    <ProfileForm onSubmit={this.onSubmit} firstName={firstName} lastName={lastName} email={email} />
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    changeLoaderState: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
};

Profile.defaultProps = {};

const mapStateToProps = state => ({
    loaderClass: state.loader.class,
    currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
    changeLoaderState: value => dispatch(changeLoaderStateAction(value)),
    updateProfile: (firstName, lastName, profilePhoto, email, id) => dispatch(updateProfileAction(firstName, lastName, profilePhoto, email, id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
