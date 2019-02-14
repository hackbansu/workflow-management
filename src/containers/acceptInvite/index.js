import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { makeInviteAcceptRequest } from 'services/auth';
import { showToast } from 'utils/helpers/toast';
import { showModal } from 'utils/helpers/modal';

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
        const { match, history } = this.props;
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
                history.push('/login');
                return;
            }

            if (response.status === 204) {
                showModal('Success', 'You have successfully joined the company');
                history.push('/login');
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
        const { history, match } = this.props;
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
        makeInviteAcceptRequest('POST', token, password).then(obj => {
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
            history.push('/login');
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
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

AcceptInvite.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AcceptInvite);
