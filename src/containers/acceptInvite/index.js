import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { makeInviteAcceptRequest } from 'services/auth';
import { showModal } from 'utils/helpers/modal';
import ApiConstants from 'constants/api';

// importing components
import ResetPasswordForm from 'components/resetPasswordForm';
import PageBanner from 'components/pageBanner';

/**
 * Login page component.
 */
export class AcceptInvite extends React.Component {
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

        makeInviteAcceptRequest('GET', token).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 204 && response.status !== 200) {
                showModal('Failed', 'This link has expired');
                redirectPage(ApiConstants.LOGIN_PAGE);
                return;
            }

            if (response.status === 204) {
                showModal('Success', 'You have successfully joined the company');
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
        makeInviteAcceptRequest('PATCH', token, password).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                showModal('Update Failed', 'Password update failed');
                return;
            }

            showModal('Success', 'Password has been reset. You can now login');

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

AcceptInvite.propTypes = {
    match: PropTypes.object.isRequired,
    redirectPage: PropTypes.func.isRequired,
};

AcceptInvite.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    redirectPage: (url) => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AcceptInvite);
