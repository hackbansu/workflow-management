import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Image, Col, Row, ListGroup } from 'react-bootstrap';

import userConstants from 'constants/user';
import ApiConstants from 'constants/api';
import './index.scss';

function extraDetails({ isAdmin, email, joinAt, leftAt }) {
    leftAt = (leftAt && leftAt.lenght) ? leftAt : 'present Day';
    if (isAdmin) {
        return (
            <React.Fragment>
                <div className="p-0 clearfix">
                    <small className="float-left font-weight-bold">Email </small>
                    <small className="float-right">{email}</small>
                </div>
                <div className="p-0 clearfix">
                    <small className="float-left font-weight-bold">Since</small>
                    <small className="float-right">{joinAt}</small>
                </div>
                <div className="p-0 clearfix">
                    <small className="float-left font-weight-bold"> Upto </small>
                    <small className="float-right">{leftAt}</small>
                </div>
            </React.Fragment>
        );
    }
    return (<></>);
}

function employeeClass(status) {
    switch (status) {
    case userConstants.STATUS.ACTIVE:
        return 'far fa-check-circle text-success';
    case userConstants.STATUS.INACTIVE:
        return 'fas fa-asterisk text-danger';
    case userConstants.STATUS.INVITED:
        return 'far fa-clock text-info';
    default:
        return 'far fa-check-circle text-success';
    }
}

/**
 * Functional component of the loader.
 * @param {object} param0 - props object for the component.
 */
export const EmployeeCard = ({ isAdmin, data, isVisible }) => {
    if (!isVisible) {
        return '';
    }

    const { user, id, designation, status, joinAt, leftAt } = data;
    const { firstName, profilePhoto, email } = user;
    const lastName = user.lastName || ' ';
    return (
        <LinkContainer to={`${ApiConstants.EMPLOYEE_PAGE}/${id}`}>
            <Col md={3} className="my-1">
                <Card className="h-100 p-2">
                    <Card.Img
                        className="p-2 circle-image w-75"
                        variant="top"
                        src={profilePhoto}
                    />
                    <Card.Body>
                        <Card.Title className="clearfix">
                            <span className="float-left">
                                {`${firstName} ${lastName}`}
                            </span>
                            <span className={`float-right ${employeeClass(status)}`} />
                        </Card.Title>
                        <div className="p-0 clearfix">
                            <small className="float-left font-weight-bold">Designation </small>
                            <small className="float-right">{designation}</small>
                        </div>
                        {extraDetails({ isAdmin, email, joinAt, leftAt })}
                    </Card.Body>
                </Card>
            </Col>
        </LinkContainer>
    );
};

EmployeeCard.propTypes = {
    data: PropTypes.object.isRequired,
    isVisible: PropTypes.bool,
    isAdmin: PropTypes.bool.isRequired,
};

EmployeeCard.defaultProps = {
    isVisible: true,
};

export default EmployeeCard;
