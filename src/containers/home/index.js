import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// importing containers for routing
import Default from 'containers/default';
import WorkflowTemplates from 'containers/workflowTemplates';
import Workflows from 'containers/workflows';
import Templates from 'containers/templates';
import Employees from 'containers/employees';
import Employee from 'containers/employee';
import Invite from 'containers/invite';
import Profile from 'containers/profile';
import Company from 'containers/company';
import CreateCompany from 'containers/createCompany';
import CreateWorkflow from 'containers/createWorkflow';

// import Constants from constant file.
import UserConstants from 'constants/user';
import ApiConstants from 'constants/api';

// importing components
import Sidebar from 'components/sidebar';
import PrivateRoute from 'components/privateRoute';

import { errorParser } from 'utils/helpers/errorHandler';
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
        const { status } = props.currentUser;
        this.state = {
            isPartOfComapany: status === UserConstants.STATUS.ACTIVE,
        };
    }

    componentWillMount() {
        const { updateProfile, updateCompany, currentUser } = this.props;
        const { isAdmin, designation, status: userStatus } = currentUser;

        // fetch user details
        makeUserFetchRequest().then(obj => {
            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                const errMsg = errorParser(body, 'Profile update failed');
                showToast(errMsg);
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


            // fetch user company details.
            makeCompanyFetchRequest().then(obj => {
                if (!obj) {
                    return;
                }

                const { response, body } = obj;
                if (response.status !== 200) {
                    this.setState({ isPartOfComapany: false });
                    const errMsg = errorParser(body, 'Company details update failed');
                    showToast(errMsg);
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
        const { logout, redirectPage } = this.props;

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
            redirectPage(ApiConstants.LOGIN_PAGE);
        });
    };

    render() {
        const { isPartOfComapany } = this.state;
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
                            isPartOfComapany={isPartOfComapany}
                        />
                    </div>
                    <div className="col-md-10 col-sm-9 col-9 content-container">
                        <div id="content">
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path={ApiConstants.WORKFLOWS_PAGE}
                                    component={Workflows}
                                    condition={isAdmin}
                                    redirectUrl={ApiConstants.HOME_PAGE}
                                />
                                <PrivateRoute
                                    exact
                                    path={`${ApiConstants.NEW_WORKFLOW_PAGE}/:templateId`}
                                    component={CreateWorkflow}
                                    condition={isAdmin}
                                    redirectUrl={ApiConstants.HOME_PAGE}
                                />
                                <PrivateRoute
                                    exact
                                    path={ApiConstants.EMPLOYEES_PAGE}
                                    component={Employees}
                                    condition={isPartOfComapany}
                                    redirectUrl={ApiConstants.CREATE_COMPANY_PAGE}
                                />
                                <PrivateRoute
                                    exact
                                    path={`${ApiConstants.EMPLOYEE_PAGE}/:id`}
                                    component={Employee}
                                    condition={isPartOfComapany}
                                    redirectUrl={ApiConstants.CREATE_COMPANY_PAGE}
                                />
                                <PrivateRoute
                                    path={ApiConstants.INVITE_PAGE}
                                    component={Invite}
                                    condition={isAdmin}
                                    redirectUrl={ApiConstants.HOME_PAGE}
                                />
                                <PrivateRoute
                                    path={ApiConstants.TEMPLATES_PAGE}
                                    component={Templates}
                                    condition={isAdmin}
                                    redirectUrl={ApiConstants.HOME_PAGE}
                                />
                                <Route exact path={ApiConstants.PROFILE_PAGE} component={Profile} />
                                <PrivateRoute
                                    exact
                                    path={ApiConstants.INVITE_PAGE}
                                    component={Invite}
                                    condition={isAdmin}
                                    redirectUrl={ApiConstants.HOME_PAGE}
                                />
                                <PrivateRoute
                                    exact
                                    path={ApiConstants.TEMPLATES_PAGE}
                                    component={WorkflowTemplates}
                                    condition={isAdmin}
                                    redirectUrl={ApiConstants.HOME_PAGE}
                                />
                                <Route exact path={ApiConstants.PROFILE_PAGE} component={Profile} />
                                <PrivateRoute
                                    exact
                                    path={ApiConstants.COMPANY_PAGE}
                                    component={Company}
                                    condition={isPartOfComapany}
                                    redirectUrl={ApiConstants.CREATE_COMPANY_PAGE}
                                />
                                <PrivateRoute
                                    exact
                                    path={ApiConstants.CREATE_COMPANY_PAGE}
                                    component={CreateCompany}
                                    condition={!isPartOfComapany}
                                    redirectUrl={ApiConstants.HOME_PAGE}
                                />
                                <Route component={Default} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

Home.propTypes = {
    currentUser: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
    redirectPage: PropTypes.func.isRequired,
};

Home.defaultProps = {
};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    updateProfile: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
    redirectPage: PropTypes.func.isRequired,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutAction()),
    updateProfile: (...args) => dispatch(updateProfileAction(...args)),
    updateCompany: (...args) => dispatch(updateCompanyAction(...args)),
    redirectPage: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
