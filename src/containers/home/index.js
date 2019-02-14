import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// importing containers for routing
import Default from 'containers/default';
import Profile from 'containers/profile';
import Company from 'containers/company';
import Employees from 'containers/employees';
import Employee from 'containers/employee';
import Invite from 'containers/invite';

// importing components
import Sidebar from 'components/sidebar';
import PrivateRoute from 'components/privateRoute';

import { makeLogoutRequest } from 'services/auth';
import { updateProfileAction, updateCompanyAction, logoutAction } from 'actions/user';
import { showLoader } from 'utils/helpers/loader';
import { showToast } from 'utils/helpers/toast';
import { makeFetchRequest as makeUserFetchRequest } from 'services/user';
import { makeFetchRequest as makeCompanyFetchRequest } from 'services/company';

/**
 * Home component.
 */
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.state = {};
    }

    componentWillMount() {
        const { updateProfile, updateCompany, currentUser } = this.props;
        const { isAdmin, designation, status: userStatus } = currentUser;

        makeUserFetchRequest().then(obj => {
            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                showToast('Profile update failed');
                return;
            }

            const {
                email,
                id: userId,
                first_name: firstName,
                last_name: lastName,
                profile_photo_url: profilePhoto,
            } = body;

            // dispatch action to update user token and data
            updateProfile(firstName, lastName, profilePhoto, email, userId, isAdmin, designation, userStatus);

            makeCompanyFetchRequest().then(obj => {
                if (!obj) {
                    return;
                }

                const { response, body } = obj;
                if (response.status !== 200) {
                    showToast('Company details update failed');
                    return;
                }

                const { id: companyId, name, address, city, state, logo_url: logo, status, links } = body.company;
                const { is_admin: isAdmin, designation, status: userStatus } = body;

                // dispatch action to update employees
                updateCompany(companyId, name, address, city, state, logo, status, links);

                // dispatch action to update user data in store
                updateProfile(firstName, lastName, profilePhoto, email, userId, isAdmin, designation, userStatus);
            });
        });
    }

    onLogoutClick = () => {
        const { logout, history } = this.props;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeLogoutRequest().then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 204) {
                showToast('Logout failed');
                return;
            }

            // dispatch action to logout user
            logout();

            showToast('Logout successful');

            // redirect to login page
            history.push('/login');
        });
    };

    render() {
        const { currentUser, location } = this.props;
        const { firstName, lastName, isAdmin, profilePhoto } = currentUser;
        let { company } = currentUser;

        if (!company) {
            company = {};
        }
        const { name: companyName, logo } = company;
        let { pathname: activeField } = location;
        activeField = activeField.split('/')[1].toLowerCase();

        return (
            <div>
                <main>
                    <div className="wrapper col-md-12">
                        <div className="col-md-2 col-sm-3 col-3 sidebar-container">
                            <Sidebar
                                firstName={firstName}
                                lastName={lastName}
                                onLogoutClick={this.onLogoutClick}
                                isAdmin={isAdmin}
                                companyName={companyName}
                                profilePhoto={profilePhoto}
                                logo={logo}
                                activeField={activeField}
                            />
                        </div>
                        <div className="col-md-10 col-sm-9 col-9 content-container">
                            <div id="content">
                                <Switch>
                                    <Route exact path="/profile" component={Profile} />
                                    <Route exact path="/employees" component={Employees} />
                                    <Route exact path="/employee/:id" component={Employee} />
                                    <Route exact path="/company" component={Company} />
                                    <PrivateRoute
                                        path="/invite"
                                        component={Invite}
                                        condition={isAdmin}
                                        redirectUrl="/"
                                    />
                                    <Route component={Default} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

Home.propTypes = {
    currentUser: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
};

Home.defaultProps = {};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    updateProfile: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutAction()),
    updateProfile: (...args) => dispatch(updateProfileAction(...args)),
    updateCompany: (...args) => dispatch(updateCompanyAction(...args)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
