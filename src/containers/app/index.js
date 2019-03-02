import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ApiConstants from 'constants/api';
import Error from 'components/errorPage';
import ErrorPage from 'containers/errorPage';
import LoginPage from 'containers/loginPage';
import Signup from 'containers/signup';
import ForgotPassword from 'containers/forgotPassword';
import ResetPassword from 'containers/resetPassword';
import AcceptInvite from 'containers/acceptInvite';
import Home from 'containers/home';
import Default from 'containers/default';
import Loader from 'components/loader';
import Modal from 'components/modal';
import PrivateRoute from 'components/privateRoute';

/**
 * App component.
 */
export class App extends React.Component {
    render() {
        const { token, loader, modal } = this.props;
        let isLoggedIn = false;
        if (token && token !== '') {
            isLoggedIn = true;
        }

        return (
            <React.Fragment>
                <Switch>
                    <PrivateRoute
                        exact
                        path={`${ApiConstants.ERROR_PAGE}/:errorNumber`}
                        component={ErrorPage}
                        condition
                        redirectUrl={ApiConstants.HOME_PAGE}
                    />
                    <PrivateRoute
                        exact
                        path={ApiConstants.LOGIN_PAGE}
                        component={LoginPage}
                        condition={!isLoggedIn}
                        redirectUrl={ApiConstants.HOME_PAGE}
                    />
                    <PrivateRoute
                        exact
                        path={ApiConstants.SIGNUP_PAGE}
                        component={Signup}
                        condition={!isLoggedIn}
                        redirectUrl={ApiConstants.HOME_PAGE}
                    />
                    <PrivateRoute
                        exact
                        path={ApiConstants.FORGOT_PASSWORD_PAGE}
                        component={ForgotPassword}
                        condition={!isLoggedIn}
                        redirectUrl={ApiConstants.HOME_PAGE}
                    />
                    <PrivateRoute
                        exact
                        path={`${ApiConstants.RESET_PASSWORD_PAGE}/:token`}
                        component={ResetPassword}
                        condition={!isLoggedIn}
                        redirectUrl={ApiConstants.HOME_PAGE}
                    />
                    <PrivateRoute
                        exact
                        path={`${ApiConstants.INVITATION_PAGE}/:token`}
                        component={AcceptInvite}
                        condition={!isLoggedIn}
                        redirectUrl={ApiConstants.HOME_PAGE}
                    />
                    <PrivateRoute
                        path={ApiConstants.HOME_PAGE}
                        component={Home}
                        condition={isLoggedIn}
                        redirectUrl={ApiConstants.LOGIN_PAGE}
                    />
                    <Route
                        render={(props) => <Error {...props} errMsg="404 Page Not Found" />}
                    />
                </Switch>
                <ToastContainer autoClose={4000} />
                <Loader show={loader.show} />
                <Modal heading={modal.heading} text={modal.text} showModal={modal.showModal} />
            </React.Fragment>
        );
    }
}

App.propTypes = {
    token: PropTypes.string,
    modal: PropTypes.shape({
        heading: PropTypes.string,
        text: PropTypes.string,
        showModal: PropTypes.bool,
    }),
    loader: PropTypes.shape({
        show: PropTypes.bool,
    }),
};

App.defaultProps = {
    token: '',
    modal: {
        heading: 'heading',
        text: 'There is no text here',
        showModal: false,
    },
    loader: {
        show: false,
    },
};

const mapStateToProps = state => ({
    token: state.currentUser.token,
    modal: {
        heading: state.modal.heading,
        text: state.modal.text,
        showModal: state.modal.showModal,
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
