import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

import userConstants from 'constants/user';
import ApiConstants from 'constants/api';

/**
 * Functional component of the loader.
 * @param {object} param0 - props object for the component.
 */
export const EmployeeTableRow = ({ data, isVisible }) => {
    if (!isVisible) {
        return '';
    }

    const { user, id, designation, status } = data;
    const { firstName, lastName, profilePhoto } = user;

    return (
        <LinkContainer to={`${ApiConstants.EMPLOYEE_PAGE}/${id}`}>
            <tr
                key={firstName + lastName + designation}
                className={userConstants.STATUS[status].toLowerCase() + '-employee'}
            >
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
                <td>{userConstants.STATUS[status]}</td>
            </tr>
        </LinkContainer>
    );
};

EmployeeTableRow.propTypes = {
    data: PropTypes.object.isRequired,
    isVisible: PropTypes.bool,
};

EmployeeTableRow.defaultProps = {
    isVisible: true,
};

export default EmployeeTableRow;
