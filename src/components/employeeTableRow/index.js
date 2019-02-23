import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

import userConstants from 'constants/user';
import ApiConstants from 'constants/api';

function extraDetails({ isAdmin, email, joinAt, leftAt }) {
    if (isAdmin) {
        return (
            <React.Fragment>
                <td>{email}</td>
                <td>{joinAt}</td>
                <td>{leftAt}</td>
            </React.Fragment>
        );
    }
    return (<></>);
}

function employeeClass(status) {
    switch (status) {
    case userConstants.STATUS.ACTIVE:
        return 'active-employee';
    case userConstants.STATUS.INACTIVE:
        return 'inactive-employee';
    case userConstants.STATUS.INVITED:
        return 'invited-employee';
    default:
        return 'active-employee';
    }
}

/**
 * Functional component of the loader.
 * @param {object} param0 - props object for the component.
 */
export const EmployeeTableRow = ({ isAdmin, data, isVisible }) => {
    if (!isVisible) {
        return '';
    }

    const { user, id, designation, status, joinAt, leftAt } = data;
    const { firstName, profilePhoto, email } = user;
    const lastName = user.lastName || ' ';
    return (
        <LinkContainer to={`${ApiConstants.EMPLOYEE_PAGE}/${id}`}>
            <tr className={employeeClass(status)}>
                <td className="employee-pic">
                    <img
                        src={profilePhoto}
                        className="display-pic"
                        alt="employee-pic"
                        onError={e => {
                            e.target.src = '/profile7.png';
                        }}
                    />
                </td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{designation}</td>
                {extraDetails({ isAdmin, email, joinAt, leftAt })}
            </tr>
        </LinkContainer>
    );
};

EmployeeTableRow.propTypes = {
    data: PropTypes.object.isRequired,
    isVisible: PropTypes.bool,
    isAdmin: PropTypes.bool.isRequired,
};

EmployeeTableRow.defaultProps = {
    isVisible: true,
};

export default EmployeeTableRow;
