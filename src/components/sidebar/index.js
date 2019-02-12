import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SidebarField from 'components/sidebarField';

/**
 * Functional component of the sidebar.
 * @param {object} param0 - props object for the component.
 */
export const sidebar = ({ firstName, lastName, onLogoutClick, isAdmin, companyName, profilePhoto, logo }) => (
    <nav id="sidebar">
        <div className="sidebar-header">
            <h3>{ companyName }</h3>
        </div>

        <ul className="list-unstyled components">
            <SidebarField name="Dashboard" redirectUrl="/dashboard" isVisible />
            <SidebarField name="Workflows" redirectUrl="/workflows" isVisible />
            <SidebarField name="Employees" redirectUrl="/employees" isVisible />
            <SidebarField name="Invite" redirectUrl="/invite" isVisible={isAdmin} />
            <SidebarField name="Templates" redirectUrl="/templates" isVisible={isAdmin} />
        </ul>
        <ul className="list-unstyled profile-components">
            <SidebarField name={firstName + ' ' + lastName} redirectUrl="/profile" isVisible imgUrl={profilePhoto} />
            <SidebarField name={companyName} redirectUrl="/company" isVisible imgUrl={logo} />
            <SidebarField name="Logout" redirectUrl="" isVisible onClick={onLogoutClick} />
        </ul>
    </nav>
);

sidebar.propTypes = {
    isAdmin: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onLogoutClick: PropTypes.func.isRequired,
    companyName: PropTypes.string,
    profilePhoto: PropTypes.string.isRequired,
};

sidebar.defaultProps = {
    isAdmin: false,
    firstName: '',
    lastName: '',
    companyName: '',
};

export default sidebar;
