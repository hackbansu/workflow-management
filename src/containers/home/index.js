import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Default from 'containers/default';

import './index.scss';

/**
 * Home component.
 */
export class Home extends React.Component {
    render() {
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
                                    <a href="#">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#">Workflows</a>
                                </li>
                                <li>
                                    <a href="#">Users</a>
                                </li>
                                <li>
                                    <a href="#">Company</a>
                                </li>
                                <li>
                                    <a href="#">Invites</a>
                                </li>
                                <li>
                                    <a href="#">Templates</a>
                                </li>
                            </ul>
                            <ul className="list-unstyled profile-components">
                                <li>
                                    <a href="#">Profile</a>
                                </li>
                                <li>
                                    <a href="#">Logout</a>
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

Home.propTypes = {};

Home.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
