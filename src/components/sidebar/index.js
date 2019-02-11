import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SidebarField from 'components/sidebarField';

/**
 * Functional component of the sidebar field.
 * @param {object} param0 - props object for the component.
 */
export const sidebarField = ({ firstName, lastName, onLogoutClick, isAdmin, companyName }) => (
    <nav id="sidebar">
        <div className="sidebar-header">
            <h3>Sidebar</h3>
        </div>

        <ul className="list-unstyled components">
            <SidebarField name="Dashboard" redirectUrl="/dashboard" isVisible />
            <SidebarField name="Workflows" redirectUrl="/workflows" isVisible />
            <SidebarField name="Employees" redirectUrl="/employees" isVisible />
            <SidebarField name="Invite" redirectUrl="/invite" isVisible={isAdmin} />
            <SidebarField name="Templates" redirectUrl="/templates" isVisible={isAdmin} />
        </ul>
        <ul className="list-unstyled profile-components">
            <SidebarField name={firstName + ' ' + lastName} redirectUrl="/profile" isVisible />
            <SidebarField name={companyName} redirectUrl="/company" isVisible />
            <SidebarField name="Logout" redirectUrl="" isVisible onClick={onLogoutClick} />
        </ul>
    </nav>
);

sidebarField.propTypes = {
    isAdmin: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onLogoutClick: PropTypes.func.isRequired,
    companyName: PropTypes.string,
};

sidebarField.defaultProps = {
    isAdmin: false,
    firstName: '',
    lastName: '',
    companyName: '',
};

export default sidebarField;
