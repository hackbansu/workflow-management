import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { changeLoaderStateAction, changeToastStateAction } from 'actions/common';
import { updateTokenAction } from 'actions/login';
import { makeLoginRequest } from 'services/auth';
import './index.scss';

// importing components
import LoginForm from 'components/loginForm';
import PageBanner from 'components/pageBanner';
import Toast from 'components/toast';
import Loader from 'components/loader';

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
        const { changeLoaderState, updateToken, history } = this.props;

        // dispatch action to show loader
        changeLoaderState('visible');

        // call the service function
        makeLoginRequest(email, password).then(obj => {
            changeLoaderState('invisible');

            if (!obj) {
                return;
            }

            const { response, body } = obj;

            // dispatch action to update token
            updateToken(body.token);
            history.push('/home');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        const { loaderClass, toast } = this.props;
        return (
            <div className="login-page">
                <div className="container">
                    <PageBanner text="Login" />
                    <LoginForm onSubmit={this.onSubmit} />
                    <Loader loaderClass={loaderClass} />
                    <Toast toastClass={toast.class} text={toast.text} />
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    loaderClass: PropTypes.string,
    toast: PropTypes.shape({
        class: PropTypes.string,
        text: PropTypes.string,
    }),
    changeLoaderState: PropTypes.func.isRequired,
    updateToken: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

LoginPage.defaultProps = {
    loaderClass: 'invisible',
    toast: {
        class: 'invisible',
        text: 'There is no text here',
    },
};

const mapStateToProps = state => ({
    loaderClass: state.loader.class,
    toast: {
        class: state.toast.class,
        text: state.toast.text,
    },
});

const mapDispatchToProps = dispatch => ({
    changeLoaderState: value => dispatch(changeLoaderStateAction(value)),
    changeToastState: (value, text) => dispatch(changeToastStateAction(value, text)),
    updateToken: value => dispatch(updateTokenAction(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
