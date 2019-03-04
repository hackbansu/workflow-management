import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// importing containers for routing
import Company from 'containers/company';
import CreateCompany from 'containers/createCompany';
import CreateWorkflow from 'containers/createWorkflow';
import Dashboard from 'containers/dashboard';
import Employee from 'containers/employee';
import EmployeeReport from 'containers/employeeReport';
import Employees from 'containers/employees';
import Invite from 'containers/invite';
import Reports from 'containers/reports';
import Profile from 'containers/profile';
import Workflow from 'containers/workflow';
import WorkflowReport from 'containers/workflowReport';
import Workflows from 'containers/workflows';
import WorkflowHistory from 'containers/workflowHistory';
import WorkflowTemplates from 'containers/workflowTemplates';
import Task from 'containers/task';
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
import { toast } from 'react-toastify';
import { makeFetchRequest as makeUserFetchRequest } from 'services/user';
import { makeFetchRequest as makeCompanyFetchRequest } from 'services/company';
import { Container } from 'react-bootstrap';

/**
 * Home component.
 */
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
        const { status } = props.currentUser;
        // this.state = {
        //     isPartOfComapany: status === UserConstants.STATUS.ACTIVE,
        // };
    }

    componentWillMount() {
        const { updateProfile, updateCompany, currentUser, redirectPage } = this.props;
        const { isAdmin, designation, status: userStatus } = currentUser;

        // fetch user details
        makeUserFetchRequest().then(obj => {
            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                const errMsg = errorParser(body, 'Profile update failed');
                toast.error(errMsg);
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

                if (response.status === 404) {
                    redirectPage(ApiConstants.CREATE_COMPANY_PAGE);
                    return;
                }

                if (response.status !== 200) {
                    // this.setState({ isPartOfComapany: false });
                    const errMsg = errorParser(body, 'Company details update failed');
                    toast.error(errMsg);
                    return;
                }

                const { id: companyId, name, address, city, state, logo_url: logo, status, links } = body.company;
                const { is_admin: isAdmin, designation, status: userStatus, id: employeeId } = body;

                // dispatch action to update employees
                updateCompany(companyId, name, address, city, state, logo, status, links);

                // dispatch action to update user data in store
                updateProfile(firstName, lastName, profilePhoto, email, userId, isAdmin, designation, userStatus, employeeId);
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

            if (response.status !== 204 && response.status !== 401) {
                const errMsg = errorParser(body, 'logout Failed');
                toast.error(errMsg);
                return;
            }

            // dispatch action to logout user
            logout();

            toast.success('Logout successful');

            // redirect to login page
            redirectPage(ApiConstants.LOGIN_PAGE);
        });
    };

    render() {
        // const { isPartOfComapany } = this.state;
        const { currentUser, location } = this.props;
        const { firstName, lastName, isAdmin, profilePhoto } = currentUser;
        let { company } = currentUser;
        const { status: userStatus } = currentUser;
        const isPartOfComapany = userStatus === UserConstants.STATUS.ACTIVE;

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
                                    path={ApiConstants.DASHBOARD_PAGE}
                                    component={Dashboard}
                                    condition={isPartOfComapany}
                                    redirectUrl={ApiConstants.CREATE_COMPANY_PAGE}
                                />
                                <PrivateRoute
                                    exact
                                    path={ApiConstants.WORKFLOWS_PAGE}
                                    component={Workflows}
                                    condition={isPartOfComapany}
                                    redirectUrl={ApiConstants.CREATE_COMPANY_PAGE}
                                />
                                <PrivateRoute
                                    exact
                                    path={`${ApiConstants.WORKFLOW_PAGE}/:id`}
                                    component={Workflow}
                                    condition={isPartOfComapany}
                                    redirectUrl={ApiConstants.CREATE_COMPANY_PAGE}
                                />
                                <PrivateRoute
                                    exact
                                    path={`${ApiConstants.WORKFLOW_PAGE}/:id${ApiConstants.HISTORY_PAGE}`}
                                    component={WorkflowHistory}
                                    condition={isAdmin}
                                    redirectUrl={ApiConstants.CREATE_COMPANY_PAGE}
                                />
                                <PrivateRoute
                                    exact
                                    path={`${ApiConstants.WORKFLOW_PAGE}/:id${ApiConstants.WORKFLOW_REPORT_PAGE}`}
                                    component={WorkflowReport}
                                    condition={isAdmin}
                                    redirectUrl={`${ApiConstants.WORKFLOW_PAGE}/:id`}
                                />
                                <PrivateRoute
                                    exact
                                    path={`${ApiConstants.TASK_PAGE}/:id`}
                                    component={Task}
                                    condition={isPartOfComapany}
                                    redirectUrl={ApiConstants.CREATE_COMPANY_PAGE}
                                />
                                <PrivateRoute
                                    path={ApiConstants.TEMPLATES_PAGE}
                                    component={WorkflowTemplates}
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
                                    exact
                                    path={`${ApiConstants.EMPLOYEE_PAGE}/:id${ApiConstants.EMPLOYEE_REPORT_PAGE}`}
                                    component={EmployeeReport}
                                    condition={isAdmin}
                                    redirectUrl={`${ApiConstants.WORKFLOW_PAGE}/:id`}
                                />
                                <PrivateRoute
                                    path={ApiConstants.INVITE_PAGE}
                                    component={Invite}
                                    condition={isAdmin}
                                    redirectUrl={ApiConstants.HOME_PAGE}
                                />
                                <PrivateRoute
                                    path={ApiConstants.REPORTS_PAGE}
                                    component={Reports}
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
                                {/* Fallback page */}
                                <Route component={Dashboard} />
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

Home.defaultProps = {};

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
