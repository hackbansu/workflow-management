import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Alert, Container } from 'react-bootstrap';
import _ from 'lodash';

import { getRandomBorder, apiTaskFormCouple } from 'utils/helpers';
import { validateTextString } from 'utils/validators';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
        };

        this.saveTask = this.saveTask.bind(this);
        this.parentOptions = this.parentOptions.bind(this);
        this.validateTask = this.validateTask.bind(this);
        this.validationErros = this.validationErrors.bind(this);

        this.taskTitle = React.createRef();
        this.assignee = React.createRef();
        this.taskStartDeltaTime = React.createRef();
        this.taskStartDeltaDays = React.createRef();
        this.taskDurationTime = React.createRef();
        this.taskDurationDays = React.createRef();
        this.taskDetail = React.createRef();
        // this.parentTask = React.createRef();
        this.renderTaskId = this.renderTaskId.bind(this);
        this.renderParentTask = this.renderParentTask.bind(this);
    }

    parentOptions() {
        const { parents } = this.props;
        return parents.map((parent, idx) => (
            <option key={`${parent}-${Math.random()}`} value={idx}>
                {parent}
            </option>
        ));
    }

    employeesOptions(employees) {
        employees = employees || {};
        return Object.keys(employees).map(key => (
            <option key={`${key}-employee-key`} value={`${key}`}>
                {`${employees[key].user.firstName} ${employees[key].user.lastName}` }
            </option>
        ));
    }

    validateTask(taskInformation) {
        const errors = [];
        const { taskTitle,
            taskDetail,
            taskStartDeltaTime,
            taskStartDeltaDays,
            taskDurationTime,
            taskDurationDays } = taskInformation;
        let validation = validateTextString(taskTitle);
        if (!validation.isValid) {
            errors.push({ heading: 'title', errors: validation.message });
        }
        validation = validateTextString(taskDetail);
        if (!validation.isValid) {
            errors.push({ heading: 'task detail', errors: validation.message });
        }
        validation = validateTextString(taskStartDeltaTime);
        if (!validation.isValid) {
            errors.push({ heading: 'Start Delta Time', errors: validation.message });
        }
        validation = validateTextString(taskStartDeltaDays);
        if (!validation.isValid) {
            errors.push({ heading: 'Start Delta Days', errors: validation.message });
        }
        validation = validateTextString(taskDurationTime);
        if (!validation.isValid) {
            errors.push({ heading: 'Duration  Days', errors: validation.message });
        }
        validation = validateTextString(taskDurationDays);
        if (!validation.isValid) {
            errors.push({ heading: 'Duration  Days', errors: validation.message });
        }
        this.setState({ errors });
        return errors.length === 0;
    }

    validationErrors() {
        const { errors } = this.state;
        return (
            errors.map((err, idx) => (
                <Alert variant="danger" key={`${Math.random()}`}>
                    <Alert.Heading>
                        {err.heading}
                    </Alert.Heading>
                    <p>
                        {err.errors}
                    </p>
                </Alert>
            ))
        );
    }

    saveTask(e) {
        const { taskId, onChange } = this.props;
        const taskInformation = {
            taskTitle: this.taskTitle.current.value,
            taskStartDeltaTime: this.taskStartDeltaTime.current.value,
            taskStartDeltaDays: this.taskStartDeltaDays.current.value,
            taskDurationTime: this.taskDurationTime.current.value,
            taskDurationDays: this.taskDurationDays.current.value,
            taskDetail: this.taskDetail.current.value,
            // parentTask: this.parentTask.current.value,
            assignee: this.assignee.current.value,
        };
        if (!this.validateTask(taskInformation)) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        onChange(taskInformation, taskId);
    }

    renderTaskId() {
        const { taskId, showTaskId } = this.props;
        if (showTaskId) {
            return (
                <Form.Row>
                    <Form.Group as={Row} controlId="TaskId">

                        <Form.Label column sm={4}>
                            {'Task Id'}
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control size="sm" type="text" value={taskId} plaintext readOnly />
                        </Col>
                    </Form.Group>
                </Form.Row>
            );
        }
        return <></>;
    }

    renderParentTask() {
        // TODO feature
        const { taskId, taskInformation } = this.props;
        const { parentTask } = taskInformation;
        if (taskId && false) {
            return (
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Parent Task</Form.Label>
                        <Form.Control
                            size="sm"
                            as="select"
                            defaultValue={parentTask}
                            ref={this.parentTask}
                        >
                            {this.parentOptions()}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
            );
        }
        return <></>;
    }

    render() {
        // TODO:Implement to render extra field in taks using task props.
        const { task: taskStructure, employees, taskInformation } = this.props;
        const { taskTitle, taskDetail, assignee } = taskInformation;
        let { taskStartDeltaTime, taskStartDeltaDays, taskDurationDays, taskDurationTime } = taskInformation;
        taskStartDeltaDays = taskStartDeltaDays || 0;
        taskStartDeltaTime = taskStartDeltaTime || '00:00';
        taskDurationTime = taskDurationTime || '00:00';
        taskDurationDays = taskDurationDays || 0;
        // console.log('taskDetail', taskDetail);
        // console.log('taskInformation', taskInformation);
        return (
            <div className={`border ${getRandomBorder()} p-2 mb-2 col-12`}>
                <Container>
                    {this.validationErrors()}
                </Container>
                { this.renderTaskId() }
                <Form.Row>
                    <Form.Group as={Col} controlId="TaskTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Task title"
                            defaultValue={taskTitle}
                            ref={this.taskTitle}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="employeeSelect">
                        <Form.Label column sm={12}>
                            Assignee
                        </Form.Label>
                        <Col sm={12}>
                            <Form.Control size="sm" as="select" defaultValue={assignee} ref={this.assignee}>
                                {this.employeesOptions(employees)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Start Delta Time</Form.Label>
                        <Form.Control
                            size="sm"
                            type="time"
                            defaultValue={taskStartDeltaTime}
                            ref={this.taskStartDeltaTime}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Start Delta Days</Form.Label>
                        <Form.Control
                            size="sm"
                            type="number"
                            min="0"
                            defaultValue={taskStartDeltaDays}
                            ref={this.taskStartDeltaDays}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Duration Time</Form.Label>
                        <Form.Control
                            size="sm"
                            type="time"
                            defaultValue={taskDurationTime}
                            ref={this.taskDurationTime}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Duration Days</Form.Label>
                        <Form.Control
                            size="sm"
                            type="number"
                            min="0"
                            defaultValue={taskDurationDays}
                            ref={this.taskDurationDays}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Task Detail</Form.Label>
                        <textarea
                            className="form-control"
                            row="4"
                            defaultValue={taskDetail}
                            ref={this.taskDetail}
                        />
                    </Form.Group>
                </Form.Row>
                { this.renderParentTask() }
                <Form.Row as={Row} className="py-4">
                    <Button variant="success" onClick={e => this.saveTask(e)}>Save Task</Button>
                </Form.Row>
            </div>
        );
    }
}

TaskForm.propTypes = {
    task: PropTypes.object.isRequired,
    employees: PropTypes.object.isRequired,
    parents: PropTypes.array.isRequired,
    taskId: PropTypes.number.isRequired,
    taskInformation: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    showTaskId: PropTypes.bool,
};
TaskForm.defaultProps = {
    taskInformation: {
        taskTitle: '',
        taskStartDeltaTime: '',
        taskStartDeltaDays: '',
        taskDetail: '',
        parentTask: 0,
        assignee: '',
    },
    showTaskId: false,
};

export default TaskForm;
