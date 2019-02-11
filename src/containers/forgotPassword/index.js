import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { updateTokenAction, updateProfileAction } from 'actions/user';
import { makePasswordResetRequest } from 'services/auth';
import { showToast } from 'utils/helpers/toast';

// importing components
import ForgotPasswordForm from 'components/forgotPasswordForm';
import PageBanner from 'components/pageBanner';
import LinkButton from 'components/linkButton';

/**
 * Login page component.
 */
export class ForgotPassword extends React.Component {
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
    onSubmit = email => {
        const { history } = this.props;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makePasswordResetRequest(email).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;

            showToast('Email has been sent with reset link');

            // redirect to home page
            history.push('/login');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        return (
            <div className="login-page">
                <div className="container">
                    <PageBanner text="Forgot Password" />
                    <ForgotPasswordForm onSubmit={this.onSubmit} />
                    <LinkButton name="Login" toUrl="/login" />
                </div>
            </div>
        );
    }
}

ForgotPassword.propTypes = {
    history: PropTypes.object.isRequired,
};

ForgotPassword.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword);
