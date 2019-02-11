import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { makePasswordUpdateRequest } from 'services/auth';
import { showToast } from 'utils/helpers/toast';

// importing components
import ResetPasswordForm from 'components/resetPasswordForm';
import PageBanner from 'components/pageBanner';

/**
 * Login page component.
 */
export class ResetPassword extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            formDisabled: true,
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        const { match } = this.props;
        const { token } = match.params;

        showLoader(true);

        makePasswordUpdateRequest('GET', token).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;

            this.setState({ formDisabled: false });
        });
    }

    /**
     * function to submit login request.
     */
    onSubmit = (password, confirmPassword) => {
        const { formDisable } = this.state;
        const { history, match } = this.props;
        const { token } = match.params;

        if (formDisable) {
            return;
        }

        if (password !== confirmPassword) {
            showToast('Password does not match');
            return;
        }

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makePasswordUpdateRequest('POST', token, password).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;

            showToast('Password has been reset');

            // redirect to home page
            history.push('/login');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        const { formDisabled } = this.state;

        return (
            <div className="login-page">
                <div className="container">
                    <PageBanner text="New Password" />
                    <ResetPasswordForm onSubmit={this.onSubmit} isDisabled={formDisabled} />
                </div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

ResetPassword.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
