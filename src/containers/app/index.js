import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateTokenAction } from 'actions/user';

import LoginPage from 'containers/loginPage';
import Signup from 'containers/signup';
import Home from 'containers/home';
import Default from 'containers/default';
import Toast from 'components/toast';
import PrivateRoute from 'components/privateRoute';

/**
 * App component.
 */
export class App extends React.Component {
    render() {
        const { toast, token } = this.props;
        let isLoggedIn = false;
        if (token && token !== '') {
            isLoggedIn = true;
        }

        return (
            <div>
                <main>
                    <Switch>
                        <PrivateRoute exact path="/login" component={LoginPage} condition={!isLoggedIn} redirectUrl="/" />
                        <PrivateRoute exact path="/signup" component={Signup} condition={!isLoggedIn} redirectUrl="/" />
                        <PrivateRoute path="/" component={Home} condition={isLoggedIn} redirectUrl="/login" />
                        <Route component={Default} />
                    </Switch>
                    <Toast show={toast.show} text={toast.text} />
                </main>
            </div>
        );
    }
}

App.propTypes = {
    toast: PropTypes.shape({
        show: PropTypes.bool,
        text: PropTypes.string,
    }),
    token: PropTypes.string,
};

App.defaultProps = {
    toast: {
        show: false,
        text: 'There is no text here',
    },
    token: '',
};

const mapStateToProps = state => ({
    toast: {
        show: state.toast.show,
        text: state.toast.text,
    },
    token: state.currentUser.token,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
