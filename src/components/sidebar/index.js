import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SidebarField from 'components/sidebarField';

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

    componentDidMount() {
        const { activeField } = this.props;

        const lists = document.getElementsByClassName('sidebar-list');
        let found = false;
        for (const list of lists) {
            for (const element of list.children) {
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

        this.activeElement.classList.remove('active');
        e.target.parentElement.classList.add('active');
        this.activeElement = e.target.parentElement;
    }

    render() {
        const { firstName, lastName, onLogoutClick, isAdmin, companyName, profilePhoto, logo } = this.props;
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>{companyName}</h3>
                </div>

                <ul className="sidebar-list list-unstyled components" onClick={this.clickAction}>
                    <SidebarField
                        name="Dashboard"
                        fieldType="dashboard"
                        redirectUrl="/dashboard"
                        isVisible
                    />
                    <SidebarField name="Workflows" fieldType="workflows" redirectUrl="/workflows" isVisible />
                    <SidebarField name="Employees" fieldType="employees" redirectUrl="/employees" isVisible />
                    <SidebarField name="Invite" fieldType="invite" redirectUrl="/invite" isVisible={isAdmin} />
                    <SidebarField name="Templates" fieldType="templates" redirectUrl="/templates" isVisible={isAdmin} />
                </ul>
                <ul className="sidebar-list list-unstyled profile-components" onClick={this.clickAction}>
                    <SidebarField
                        name={firstName + ' ' + lastName}
                        fieldType="profile"
                        redirectUrl="/profile"
                        isVisible
                        imgUrl={profilePhoto}
                    />
                    <SidebarField
                        name={companyName}
                        fieldType="company"
                        redirectUrl="/company"
                        isVisible
                        imgUrl={logo}
                    />
                    <SidebarField name="Logout" fieldType="logout" redirectUrl="" isVisible onClick={onLogoutClick} />
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
};

sidebar.defaultProps = {
    isAdmin: false,
    firstName: '',
    lastName: '',
    companyName: '',
};

export default sidebar;
