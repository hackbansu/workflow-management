import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
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
    }

    componentWillMount() {
        const { updateProfile, updateCompany, currentUser } = this.props;
        const { isAdmin, designation, status: userStatus } = currentUser;

        makeUserFetchRequest().then(obj => {
            if (!obj) {
                return;
            }

            const { response, body } = obj;
            const { email, id: userId, first_name: firstName, last_name: lastName, profile_photo: profilePhoto } = body;

            // dispatch action to update user token and data
            updateProfile(firstName, lastName, profilePhoto, email, userId, isAdmin, designation, userStatus);

            makeCompanyFetchRequest().then(obj => {
                if (!obj) {
                    return;
                }

                const { response, body } = obj;
                const { id: companyId, name, address, city, state, logo, status, links } = body.company;
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

            // dispatch action to logout user
            logout();

            showToast('Logout successful');

            // redirect to login page
            history.push('/login');
        });
    };

    render() {
        const { currentUser } = this.props;
        const { firstName, lastName, isAdmin, company, profilePhoto } = currentUser;
        const { name: companyName, logo } = company;

        return (
            <div>
                <main>
                    <div className="wrapper col-md-12">
                        <Sidebar
                            firstName={firstName}
                            lastName={lastName}
                            onLogoutClick={this.onLogoutClick}
                            isAdmin={isAdmin}
                            companyName={companyName}
                            profilePhoto={profilePhoto}
                            logo={logo}
                        />
                        <div id="content" className="col-md-9">
                            <Switch>
                                <Route exact path="/profile" component={Profile} />
                                <Route exact path="/employees" component={Employees} />
                                <Route exact path="/employee/:id" component={Employee} />
                                <Route exact path="/company" component={Company} />
                                <PrivateRoute path="/invite" component={Invite} condition={isAdmin} redirectUrl="/" />
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
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
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
