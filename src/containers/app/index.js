import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateTokenAction } from 'actions/user';

import LoginPage from 'containers/loginPage';
import Signup from 'containers/signup';
import ForgotPassword from 'containers/forgotPassword';
import ResetPassword from 'containers/resetPassword';
import Home from 'containers/home';
import Default from 'containers/default';
import Loader from 'components/loader';
import Modal from 'components/modal';
import Toast from 'components/toast';
import PrivateRoute from 'components/privateRoute';

/**
 * App component.
 */
export class App extends React.Component {
    render() {
        const { toast, token, loader, modal } = this.props;
        let isLoggedIn = false;
        if (token && token !== '') {
            isLoggedIn = true;
        }

        return (
            <div>
                <main>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/login"
                            component={LoginPage}
                            condition={!isLoggedIn}
                            redirectUrl="/"
                        />
                        <PrivateRoute exact path="/signup" component={Signup} condition={!isLoggedIn} redirectUrl="/" />
                        <PrivateRoute
                            exact
                            path="/forgot-password"
                            component={ForgotPassword}
                            condition={!isLoggedIn}
                            redirectUrl="/"
                        />
                        <PrivateRoute
                            exact
                            path="/reset-password/:token"
                            component={ResetPassword}
                            condition={!isLoggedIn}
                            redirectUrl="/"
                        />
                        <PrivateRoute path="/" component={Home} condition={isLoggedIn} redirectUrl="/login" />
                        <Route component={Default} />
                    </Switch>
                    <Toast show={toast.show} text={toast.text} />
                    <Loader show={loader.show} />
                    <Modal heading={modal.heading} text={modal.text} />
                </main>
            </div>
        );
    }
}

App.propTypes = {
    token: PropTypes.string,
    toast: PropTypes.shape({
        show: PropTypes.bool,
        text: PropTypes.string,
    }),
    modal: PropTypes.shape({
        heading: PropTypes.string,
        text: PropTypes.string,
    }),
    loader: PropTypes.shape({
        show: PropTypes.bool,
    }),
};

App.defaultProps = {
    token: '',
    toast: {
        show: false,
        text: 'There is no text here',
    },
    modal: {
        heading: 'heading',
        text: 'There is no text here',
    },
    loader: {
        show: false,
    },
};

const mapStateToProps = state => ({
    token: state.currentUser.token,
    toast: {
        show: state.toast.show,
        text: state.toast.text,
    },
    modal: {
        heading: state.modal.heading,
        text: state.modal.text,
    },
    loader: {
        show: state.loader.show,
    },
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
