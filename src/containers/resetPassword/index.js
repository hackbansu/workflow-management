import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { push } from 'connected-react-router';

import { showLoader } from 'utils/helpers/loader';
import { makePasswordUpdateRequest } from 'services/auth';
import { toast } from 'react-toastify';
import { showModal } from 'utils/helpers/modal';
import { errorParser } from 'utils/helpers/errorHandler';
import ApiConstants from 'constants/api';

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
        const { match, redirectPage } = this.props;
        const { token } = match.params;

        showLoader(true);

        makePasswordUpdateRequest('GET', token).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                const errMsg = errorParser(body, 'This link has expired');
                toast.error(errMsg);
                redirectPage(ApiConstants.LOGIN_PAGE);
                return;
            }

            this.setState({ formDisabled: false });
        });
    }

    /**
     * function to submit login request.
     */
    onSubmit = (password, confirmPassword) => {
        const { formDisable } = this.state;
        const { redirectPage, match } = this.props;
        const { token } = match.params;

        if (formDisable) {
            return;
        }

        if (password !== confirmPassword) {
            showModal('Invalid', 'Password does not match');
            return;
        }

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makePasswordUpdateRequest('PATCH', token, password).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                showModal('Update Failed', 'Password update failed');
                return;
            }

            toast.success('Password has been reset');

            // redirect to home page
            redirectPage(ApiConstants.LOGIN_PAGE);
        });
    };

    /**
     * function to render the component.
     */
    render() {
        const { formDisabled } = this.state;

        return (
            <div>
                <div className="container entry-form-container">
                    <PageBanner text="New Password" />
                    <ResetPasswordForm onSubmit={this.onSubmit} isDisabled={formDisabled} />
                </div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    redirectPage: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

ResetPassword.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    redirectPage: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
