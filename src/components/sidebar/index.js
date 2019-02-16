import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SidebarField from 'components/sidebarField';
import ApiConstants from 'constants/api';

/**
 * Functional component of the sidebar.
 * @param {object} param0 - props object for the component.
 */
export class sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.clickAction = this.clickAction.bind(this);
        this.activeElement = null;
    }

    componentDidUpdate() {
        let { activeField } = this.props;
        if (!activeField) {
            activeField = 'dashboard';
        }

        const lists = document.getElementsByClassName('sidebar-list');
        let found = false;
        for (const list of lists) {
            for (const element of list.children[0].children) {
                if (element.getAttribute('data-field-type') === activeField) {
                    this.activeElement = element;
                    this.activeElement.classList.add('active');
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            }
        }
    }

    clickAction(e) {
        e.preventDefault();

        if (this.activeElement) {
            this.activeElement.classList.remove('active');
        }
        e.target.parentElement.classList.add('active');
        this.activeElement = e.target.parentElement;
    }

    render() {
        const {
            firstName,
            lastName,
            onLogoutClick,
            isAdmin,
            companyName,
            profilePhoto,
            logo,
            isPartOfComapany,
        } = this.props;
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>{companyName}</h3>
                </div>

                <ul className="sidebar-list list-unstyled components" onClick={this.clickAction}>
                    {isPartOfComapany ? (
                        <div>
                            <SidebarField
                                name="Dashboard"
                                fieldType="dashboard"
                                redirectUrl={ApiConstants.DASHBOARD_PAGE}
                                isVisible
                            />
                            <SidebarField
                                name="Workflows"
                                fieldType="workflows"
                                redirectUrl={ApiConstants.WORKFLOWS_PAGE}
                                isVisible
                            />
                            <SidebarField
                                name="Employees"
                                fieldType="employees"
                                redirectUrl={ApiConstants.EMPLOYEES_PAGE}
                                isVisible
                            />
                            <SidebarField
                                name="Invite"
                                fieldType="invite"
                                redirectUrl={ApiConstants.INVITE_PAGE}
                                isVisible={isAdmin}
                            />
                            <SidebarField
                                name="Templates"
                                fieldType="templates"
                                redirectUrl={ApiConstants.TEMPLATES_PAGE}
                                isVisible={isAdmin}
                            />
                        </div>
                    ) : (
                        <SidebarField
                            name="Create Company"
                            fieldType="create-company"
                            redirectUrl={ApiConstants.CREATE_COMPANY_PAGE}
                            isVisible
                        />
                    )}
                </ul>
                <ul className="sidebar-list list-unstyled profile-components" onClick={this.clickAction}>
                    <div>
                        <SidebarField
                            name={firstName + ' ' + lastName}
                            fieldType="profile"
                            redirectUrl={ApiConstants.PROFILE_PAGE}
                            isVisible
                            imgUrl={profilePhoto}
                        />
                        <SidebarField
                            name={companyName}
                            fieldType="company"
                            redirectUrl={ApiConstants.COMPANY_PAGE}
                            isVisible={isPartOfComapany}
                            imgUrl={logo}
                        />
                        <SidebarField
                            name="Logout"
                            fieldType="logout"
                            redirectUrl=""
                            isVisible
                            onClick={onLogoutClick}
                        />
                    </div>
                </ul>
            </nav>
        );
    }
}
sidebar.propTypes = {
    isAdmin: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onLogoutClick: PropTypes.func.isRequired,
    companyName: PropTypes.string,
    profilePhoto: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    activeField: PropTypes.string.isRequired,
    isPartOfComapany: PropTypes.bool,
};

sidebar.defaultProps = {
    isAdmin: false,
    firstName: '',
    lastName: '',
    companyName: '',
    isPartOfComapany: true,
};

export default sidebar;
