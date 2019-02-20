import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import EmployeesOptionField from 'components/employeesOptionField';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        const { taskInformation } = props;
        this.state = {
            taskInformation,
        };
        this.parentOptions = this.parentOptions.bind(this);
        this.pushChanges = this.pushChanges.bind(this);
    }

    parentOptions() {
        const { parents } = this.props;
        return parents.map((parent, idx) => (
            <option key={`${parent}-${Math.random()}`} value={idx}>
                {parent}
            </option>
        ));
    }

    pushChanges() {
        _.debounce(
            () => {
                const { onChange, taskId } = this.props;
                const { taskInformation } = this.state;
                onChange(taskInformation, taskId);
            },
            1000,
            { leading: false, trailing: true }
        )();
    }

    handleChange(value, name) {
        const { taskInformation } = this.state;
        taskInformation[name] = value;
        this.setState({ taskInformation }, () => this.pushChanges());
    }

    render() {
        // TODO:Implement to render extra field in taks using task props.
        const { task: taskStructure, employees, borderColor, taskId } = this.props;
        const { taskInformation } = this.state;
        const { taskTitle, taskStartDeltaTime, taskStartDeltaDays, taskDetail, parentTask, assignee } = taskInformation;
        return (
            <div className={`border ${borderColor} p-2 mb-2 col-12`}>
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
                            value={taskTitle}
                            onChange={e => this.handleChange(e.target.value, 'taskTitle')}
                        />
                    </Form.Group>
                    <EmployeesOptionField
                        label="Assignee"
                        employees={employees}
                        employee={assignee}
                        onChange={value => this.handleChange(value, 'assignee')}
                    />
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Start Delta Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={taskStartDeltaTime}
                            onChange={e => this.handleChange(e.target.value, 'taskStartDeltaTime')}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Start Delta Days</Form.Label>
                        <Form.Control
                            type="date"
                            value={taskStartDeltaDays}
                            onChange={e => this.handleChange(e.target.value, 'taskStartDeltaDays')}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Task Detail</Form.Label>
                        <textarea
                            className="form-control"
                            row="4"
                            value={taskDetail}
                            onChange={e => this.handleChange(e.target.value, 'taskDetail')}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Parent Task</Form.Label>
                        <Form.Control
                            as="select"
                            value={parentTask}
                            onChange={e => this.handleChange(e.target.value, 'parentTask')}
                        >
                            {this.parentOptions()}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
            </div>
        );
    }
}

TaskForm.propTypes = {
    task: PropTypes.object.isRequired,
    employees: PropTypes.object.isRequired,
    parents: PropTypes.array.isRequired,
    borderColor: PropTypes.string,
    taskId: PropTypes.number.isRequired,
    taskInformation: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};
TaskForm.defaultProps = {
    borderColor: 'border-info',
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
