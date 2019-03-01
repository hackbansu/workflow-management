import React from 'react';
import ApiConstants from 'constants/api';
import { Card, ListGroup } from 'react-bootstrap';
import taskConstants from 'constants/task';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';

function taskClass(status) {
    switch (status) {
    case taskConstants.STATUS.COMPLETE:
        return 'far fa-check-circle text-success';
    case taskConstants.STATUS.SCHEDULED:
        return 'fa fa-spinner text-info';
    case taskConstants.STATUS.ONGOING:
        return 'fas fa fa-ellipsis-h text-warning';
    case taskConstants.STATUS.UPCOMMING:
        return 'far fa-clock text-primary';
    default:
        return 'far fa-check-circle text-success';
    }
}

export default function taskWorkflowCard({ taskInformation, taskId, employees }) {
    const {
        parentTask,
        assignee,
        taskDetail,
        taskDurationDays,
        taskDurationTime,
        taskStartDeltaDays,
        taskStartDeltaTime,
        taskTitle,
        status,
    } = taskInformation;
    const defaultAssignee = {
        user: {
            firstName: 'first anem',
            lastName: 'last name',
        },
    };
    const assigneeEmp = employees[assignee] || defaultAssignee;

    return (
        <LinkContainer to={`${ApiConstants.TASK_PAGE}/${taskId}`}>
            <Card className="w-100 mb-2">
                <Card.Header className="clearfix">
                    <div className="clearfix">
                        <span className="float-left">
                            <small className="mr-2">Id </small>
                            <small>{taskId}</small>
                        </span>
                        <span className="float-right">
                            <small className="mr-2"> Parent Task</small>
                            <small>{parentTask || 'none'}</small>
                        </span>
                    </div>
                    <span className="float-left font-weight-bold">
                        <h3>
                            {taskTitle}
                        </h3>
                    </span>
                    <span className={`${taskClass(status)} float-right`} />
                </Card.Header>
                <Card.Body>
                    <div className="clearfix">
                        <small className="float-left font-weight-bold text-uppercase">Assignee</small>
                        <small className="float-right">
                            {`${assigneeEmp.user.firstName} ${assigneeEmp.user.lastName}`}
                        </small>
                    </div>
                    <div className="clearfix">
                        <small className="float-left font-weight-bold text-uppercase">Start Delta</small>
                        <small className="float-right">{`${taskStartDeltaDays} ${taskStartDeltaTime}`}</small>
                    </div>
                    <div className="clearfix">
                        <small className="float-left font-weight-bold">Duration</small>
                        <small className="float-right">{`${taskDurationDays} ${taskDurationTime}`}</small>
                    </div>
                    <div className="clearfix">
                        <small>{taskDetail}</small>
                    </div>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
}

taskWorkflowCard.propTypes = {
    taskInformation: PropTypes.object.isRequired,
    taskId: PropTypes.number.isRequired,
    employees: PropTypes.object.isRequired,
};
