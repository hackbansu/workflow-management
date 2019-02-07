import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// importing containers for routing
import Default from 'containers/default';
import Profile from 'containers/profile';
import Employees from 'containers/employees';

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
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/workflows">Workflows</Link>
                                </li>
                                <li>
                                    <Link to="/employees">Employees</Link>
                                </li>
                                <li>
                                    <Link to="/company">Company</Link>
                                </li>
                                <li>
                                    <Link to="/invites">Invites</Link>
                                </li>
                                <li>
                                    <Link to="/templates">Templates</Link>
                                </li>
                            </ul>
                            <ul className="list-unstyled profile-components">
                                <li>
                                    <Link to="/profile">
                                        {firstName}
                                        {' '}
                                        {lastName}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="" onClick={this.onLogoutClick}>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div id="content">
                            <Switch>
                                <Route exact path="/profile" component={Profile} />
                                <Route exact path="/employees" component={Employees} />
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
