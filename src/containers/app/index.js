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

        return (
            <div>
                <main>
                    <Switch>
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/signup" component={Signup} />
                        <PrivateRoute path="/" component={Home} token={token} />
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
