import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { changeLoaderStateAction } from 'actions/common';
import { makePasswordUpdateRequest } from 'services/auth';
import { showToast } from 'utils/helpers/toast';
import './index.scss';

// importing components
import ResetPasswordForm from 'components/resetPasswordForm';
import PageBanner from 'components/pageBanner';
import Loader from 'components/loader';

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
        const { changeLoaderState, match } = this.props;
        const { token } = match.params;

        changeLoaderState('visible');

        makePasswordUpdateRequest('GET', token).then(obj => {
            changeLoaderState('invisible');

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
        const { changeLoaderState, history, match } = this.props;
        const { token } = match.params;

        if (formDisable) {
            return;
        }

        if (password !== confirmPassword) {
            showToast('Password does not match');
            return;
        }

        // dispatch action to show loader
        changeLoaderState('visible');

        // call the service function
        makePasswordUpdateRequest('POST', token, password).then(obj => {
            changeLoaderState('invisible');

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
        const { loaderClass } = this.props;
        const { formDisabled } = this.state;

        return (
            <div className="login-page">
                <div className="container">
                    <PageBanner text="New Password" />
                    <ResetPasswordForm onSubmit={this.onSubmit} isDisabled={formDisabled} />
                    <Loader loaderClass={loaderClass} />
                </div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    loaderClass: PropTypes.string,
    changeLoaderState: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

ResetPassword.defaultProps = {
    loaderClass: 'invisible',
};

const mapStateToProps = state => ({
    loaderClass: state.loader.class,
});

const mapDispatchToProps = dispatch => ({
    changeLoaderState: value => dispatch(changeLoaderStateAction(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
