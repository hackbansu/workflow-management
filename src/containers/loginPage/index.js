import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { showModal } from 'utils/helpers/modal';
import { updateTokenAction, updateProfileAction } from 'actions/user';
import { makeLoginRequest } from 'services/auth';
import ApiConstants from 'constants/api';
import { errorParser } from 'utils/helpers/errorHandler';

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
        const { updateToken, updateProfile, redirectPage } = this.props;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeLoginRequest(email, password).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                const msg = errorParser(body);
                showModal('Login Failed', msg);
                return;
            }

            const {
                token,
                email,
                id,
                first_name: firstName,
                last_name: lastName,
                profile_photo_url: profilePhoto,
            } = body;

            // dispatch action to update user token and data
            updateToken(token);
            updateProfile(firstName, lastName, profilePhoto, email, id);

            // redirect to home page
            redirectPage(ApiConstants.HOME_PAGE);
        });
    };

    /**
     * function to render the component.
     */
    render() {
        return (
            <div>
                <div className="container entry-form-container">
                    <PageBanner text="Login" />
                    <LoginForm onSubmit={this.onSubmit} />
                    <ul className="nav justify-content-center page-nav-links">
                        <LinkButton name="Forgot Password" toUrl={ApiConstants.FORGOT_PASSWORD_PAGE} />
                        <LinkButton name="Signup" toUrl={ApiConstants.SIGNUP_PAGE} />
                    </ul>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    updateToken: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    redirectPage: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    redirectPage: (url) => dispatch(push(url)),
    updateToken: value => dispatch(updateTokenAction(value)),
    updateProfile: (firstName, lastName, profilePhoto, email, id) => dispatch(
        updateProfileAction(firstName, lastName, profilePhoto, email, id)
    ),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
