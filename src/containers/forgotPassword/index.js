import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { changeLoaderStateAction } from 'actions/common';
import { updateTokenAction, updateProfileAction } from 'actions/user';
import { makePasswordResetRequest } from 'services/auth';
import { showToast } from 'utils/helpers/toast';
import './index.scss';

// importing components
import ForgotPasswordForm from 'components/forgotPasswordForm';
import PageBanner from 'components/pageBanner';
import Loader from 'components/loader';
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
        const { changeLoaderState, history } = this.props;

        // dispatch action to show loader
        changeLoaderState('visible');

        // call the service function
        makePasswordResetRequest(email).then(obj => {
            changeLoaderState('invisible');

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
        const { loaderClass } = this.props;
        return (
            <div className="login-page">
                <div className="container">
                    <PageBanner text="Forgot Password" />
                    <ForgotPasswordForm onSubmit={this.onSubmit} />
                    <LinkButton name="Login" toUrl="/login" />
                    <Loader loaderClass={loaderClass} />
                </div>
            </div>
        );
    }
}

ForgotPassword.propTypes = {
    loaderClass: PropTypes.string,
    changeLoaderState: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

ForgotPassword.defaultProps = {
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
)(ForgotPassword);
