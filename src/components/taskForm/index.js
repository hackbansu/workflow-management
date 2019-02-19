import React from 'react';
import PropTypes from 'prop-types';

import { Form, Row, Col } from 'react-bootstrap';
import EmployeesOptionField from 'components/employeesOptionField';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.parentOptions = this.parentOptions.bind(this);
    }

    parentOptions() {
        const { parents } = this.props;
        return parents.map((parent, idx) => (
            <option key={`${parent}-${Math.random()}`} value={idx}>
                {parent}
            </option>
        ));
    }

    render() {
        const { task, employees, borderColor, taskId } = this.props;
        return (
            <div className={`border ${borderColor} p-2 mb-2 col-12`}>
                <Form.Row>
                    <Form.Group as={Row} controlId="TaskId">
                        <Form.Label column sm={4}>Task Id</Form.Label>
                        <Col sm={6}>
                            <Form.Control type="text" value={taskId} plaintext readOnly />
                        </Col>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="TaskTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Task title" />
                    </Form.Group>
                    <EmployeesOptionField label="Assignee" employees={employees} />
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Start Delta Time</Form.Label>
                        <Form.Control type="time" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Start Delta Days</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Task Detail</Form.Label>
                        <textarea className="form-control" row="4" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Parent Task</Form.Label>
                        <Form.Control as="select">{this.parentOptions()}</Form.Control>
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
};
TaskForm.defaultProps = {
    borderColor: 'border-info',
};

export default TaskForm;
