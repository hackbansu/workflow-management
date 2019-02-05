import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateTokenAction } from 'actions/login';
import { changeLoaderStateAction, changeToastStateAction } from 'actions/common';

import { makeLoginRequest } from 'services/auth';

// importing components
import LoginForm from 'components/loginForm';
import PageBanner from 'components/pageBanner';
import Toast from 'components/toast';
import Loader from 'components/loader';

import './index.scss';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (email, password) => {
        const { changeLoaderState, updateToken, history } = this.props;

        // dispatch action to show loader
        changeLoaderState('visible');

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
