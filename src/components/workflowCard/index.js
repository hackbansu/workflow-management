import React from 'react';
import ApiConstants from 'constants/api';
import taskConstants from 'constants/task';
import PropTypes from 'prop-types';

import { LinkContainer } from 'react-router-bootstrap';
import { Card, ListGroup, Col } from 'react-bootstrap';
import { parseDateTime } from 'utils/helpers';

function taskClass(status) {
    switch (status) {
    case taskConstants.STATUS.UPCOMMING:
        return 'info';
    case taskConstants.STATUS.SCHEDULED:
        return 'primary';
    case taskConstants.STATUS.ONGOING:
        return 'success';
    case taskConstants.STATUS.COMPLETE:
        return 'dark';
    default:
        return 'success';
    }
}

function getEmployees(assignee, employees) {
    let empClss = {};
    const { activeEmployees, inactiveEmployees, invitedEmployees } = employees;
    [activeEmployees, inactiveEmployees, invitedEmployees].map(empClass => {
        if (Object.hasOwnProperty.call(empClass, assignee)) {
            empClss = empClass;
        }
        return null;
    });
    return empClss;
}

function renderAssignee(assignee, employees) {
    employees = getEmployees(assignee, employees);
    if (Object.hasOwnProperty.call(employees, assignee)) {
        return (
            <div className="clearfix mt-1">
                <small className="float-right">
                    {`${employees[assignee].user.firstName} ${employees[assignee].user.lastName}`}
                </small>
            </div>
        );
    }
    return (<></>);
}

export function WorkflowCard({ workflow, wfid, employees }) {
    return (
        <LinkContainer to={`${ApiConstants.WORKFLOW_PAGE}/${wfid}`}>
            <Col md lg xl={4} className="mb-2">
                <Card key={`${Math.random()}-wf`}>
                    <Card.Body className="p-2">
                        <Card.Header className="clearfix">
                            <Card.Title className="float-left">{workflow.name}</Card.Title>
                            <Card.Subtitle className="text-muted float-right">
                                {parseDateTime(workflow.startAt)}
                            </Card.Subtitle>
                        </Card.Header>
                        <ListGroup>
                            {Object.keys(workflow.tasks).map(taskId => {
                                const task = workflow.tasks[taskId];
                                return (
                                    <ListGroup.Item
                                        key={`${Math.random()}-task`}
                                        variant={taskClass(task.status)}
                                        className="p-1"
                                    >
                                        <div className="clearfix mb-1">
                                            <small className="float-left font-weight-bold">{task.taskTitle}</small>
                                            <small className="float-right text-lowercase">
                                                {taskConstants.STATUS[task.status]}
                                            </small>
                                        </div>
                                        <div>
                                            <small className="m-0">{task.taskDetail}</small>
                                        </div>
                                        {renderAssignee(task.assignee, employees)}
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </LinkContainer>
    );
}

WorkflowCard.propTypes = {
    workflow: PropTypes.object.isRequired,
    wfid: PropTypes.string.isRequired,
    employees: PropTypes.object,
};
WorkflowCard.defaultProps = {
    employees: {
        activeEmployees: {},
        inactiveEmployees: {},
        invitedEmployees: {},
    },
};

export default WorkflowCard;
