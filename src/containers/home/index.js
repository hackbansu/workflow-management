import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Default from 'containers/default';
import { makeLogoutRequest } from 'services/auth';
import { changeLoaderStateAction } from 'actions/common';
import { logoutAction } from 'actions/user';

import './index.scss';

/**
 * Home component.
 */
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick = () => {
        const { changeLoaderState, logout, history } = this.props;

        // dispatch action to show loader
        changeLoaderState('visible');

        // delete the token from local storage
        localStorage.removeItem('token');

        // call the service function
        makeLogoutRequest().then(obj => {
            changeLoaderState('invisible');

            if (!obj) {
                return;
            }

            // dispatch action to logout user
            logout();

            // redirect to login page
            history.push('/login');
        });
    };

    render() {
        const { currentUser } = this.props;
        const { firstName, lastName } = currentUser;

        return (
            <div>
                <main>
                    <div className="wrapper">
                        <nav id="sidebar">
                            <div className="sidebar-header">
                                <h3>Sidebar</h3>
                            </div>

                            <ul className="list-unstyled components">
                                <li className="active">
                                    <a href="/dashboard">Dashboard</a>
                                </li>
                                <li>
                                    <a href="/workflows">Workflows</a>
                                </li>
                                <li>
                                    <a href="/users">Users</a>
                                </li>
                                <li>
                                    <a href="/company">Company</a>
                                </li>
                                <li>
                                    <a href="/invites">Invites</a>
                                </li>
                                <li>
                                    <a href="/templates">Templates</a>
                                </li>
                            </ul>
                            <ul className="list-unstyled profile-components">
                                <li>
                                    <a href="/profile">{firstName}</a>
                                </li>
                                <li>
                                    <a href="#" onClick={this.onLogoutClick}>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div id="content">
                            <Switch>
                                <Route component={Default} />
                            </Switch>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

Home.propTypes = {
    currentUser: PropTypes.object.isRequired,
    changeLoaderState: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

Home.defaultProps = {};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
    changeLoaderState: value => dispatch(changeLoaderStateAction(value)),
    logout: () => dispatch(logoutAction()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
