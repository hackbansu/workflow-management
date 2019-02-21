import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'react-bootstrap';
import _ from 'lodash';

import { getRandomBorder } from 'utils/helpers';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.saveTask = this.saveTask.bind(this);

        this.parentOptions = this.parentOptions.bind(this);
        this.taskTitle = React.createRef();
        this.assignee = React.createRef();
        this.taskStartDeltaTime = React.createRef();
        this.taskStartDeltaDays = React.createRef();
        this.taskDetail = React.createRef();
        this.parentTask = React.createRef();
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
        return Object.keys(employees).map(key => (
            <option key={`${key}-employee-key`} value={`${key}`}>
                {employees[key].user.email}
            </option>
        ));
    }


    saveTask() {
        const { taskId, onChange } = this.props;
        const taskInformation = {
            taskTitle: this.taskTitle.current.value,
            taskStartDeltaTime: this.taskStartDeltaTime.current.value,
            taskStartDeltaDays: this.taskStartDeltaDays.current.value,
            taskDetail: this.taskDetail.current.value,
            parentTask: this.parentTask.current.value,
            assignee: this.assignee.current.value,
        };
        onChange(taskInformation, taskId);
    }

    render() {
        // TODO:Implement to render extra field in taks using task props.
        const { task: taskStructure, employees, taskId, taskInformation } = this.props;
        const { taskTitle, taskStartDeltaTime, taskStartDeltaDays, taskDetail, parentTask, assignee } = taskInformation;
        return (
            <div className={`border ${getRandomBorder()} p-2 mb-2 col-12`}>
                <Form.Row>
                    <Form.Group as={Row} controlId="TaskId">
                        <Form.Label column sm={4}>
                            {'Task Id'}
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control type="text" value={taskId} plaintext readOnly />
                        </Col>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="TaskTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
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
                            <Form.Control as="select" defaultValue={assignee} ref={this.assignee}>
                                {this.employeesOptions(employees)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Start Delta Time</Form.Label>
                        <Form.Control
                            type="time"
                            defaultValue={taskStartDeltaTime}
                            ref={this.taskStartDeltaTime}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Start Delta Days</Form.Label>
                        <Form.Control
                            type="date"
                            defaultValue={taskStartDeltaDays}
                            ref={this.taskStartDeltaDays}
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
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Parent Task</Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue={parentTask}
                            ref={this.parentTask}
                        >
                            {this.parentOptions()}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row as={Row} className="py-4">
                    <Button variant="success" onClick={e => this.saveTask()}>Save</Button>
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
};

export default TaskForm;
