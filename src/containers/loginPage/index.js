import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { updateTokenAction, updateProfileAction } from 'actions/user';
import { makeLoginRequest } from 'services/auth';

// importing components
import LoginForm from 'components/loginForm';
import PageBanner from 'components/pageBanner';
import LinkButton from 'components/linkButton';

/**
 * Login page component.
 */
export class LoginPage extends React.Component {
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
    onSubmit = (email, password) => {
        const { updateToken, updateProfile, history } = this.props;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeLoginRequest(email, password).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            const { token, email, id, first_name: firstName, last_name: lastName, profile_photo: profilePhoto } = body;

            // dispatch action to update user token and data
            updateToken(token);
            updateProfile(firstName, lastName, profilePhoto, email, id);

            // redirect to home page
            history.push('/');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        return (
            <div className="login-page">
                <div className="container">
                    <PageBanner text="Login" />
                    <LoginForm onSubmit={this.onSubmit} />
                    <LinkButton name="Forgot Password" toUrl="/forgot-password" />
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    updateToken: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

LoginPage.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    updateToken: value => dispatch(updateTokenAction(value)),
    updateProfile: (firstName, lastName, profilePhoto, email, id) => dispatch(updateProfileAction(firstName, lastName, profilePhoto, email, id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
