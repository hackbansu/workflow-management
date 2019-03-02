import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { makePasswordResetRequest } from 'services/auth';
import { showModal } from 'utils/helpers/modal';
import ApiConstants from 'constants/api';

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
            if (response.status !== 204) {
                showModal('Failed', 'Reset link send failed');
                return;
            }

            showModal('Email Sent', `Reset link has been sent on ${email}`);
        });
    };

    /**
     * function to render the component.
     */
    render() {
        return (
            <div>
                <div className="container entry-form-container">
                    <PageBanner text="Forgot Password" />
                    <ForgotPasswordForm onSubmit={this.onSubmit} />
                    <ul className="nav justify-content-center page-nav-links text-primary">
                        <LinkButton name="Back to login" toUrl={ApiConstants.LOGIN_PAGE} />
                    </ul>
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
