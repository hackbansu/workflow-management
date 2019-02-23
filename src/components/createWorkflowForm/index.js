import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';

import DateTimeField from 'components/dateTimeField';
import TaskForm from 'components/taskForm';
import WorkflowPermissions from 'components/workflowPermissions';

export class CreateWorkflow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workflowName: '',
            startDateTime: moment(),
            completeAt: moment(),
            workflowPermissions: {},
            tasks: {},
        };
        this.createTasks = this.createTasks.bind(this);
        this.setStartDateTime = this.setStartDateTime.bind(this);
        this.setWorkFlowPermissions = this.setWorkFlowPermissions.bind(this);
        this.setTask = this.setTask.bind(this);
        this.updateCompleteAt = this.updateCompleteAt.bind(this);
    }


    setStartDateTime(value) {
        this.setState({
            startDateTime: value,
        });
    }

    getPossibleParents(upto) {
        return [...Array(upto + 1).keys()];
    }

    setWorkFlowPermissions(value) {
        this.setState({ workflowPermissions: value });
    }

    setTask(value, id) {
        const { tasks } = this.state;
        tasks[id] = value;
        const completeAt = this.updateCompleteAt();
        this.setState({ tasks, completeAt });
    }

    updateCompleteAt() {
        const { tasks } = this.state;
        const completeAt = moment();
        Object.keys(tasks).map(taskId => {
            const task = tasks[taskId];
            const durationTime = {
                days: task.taskDurationDays,
                hour: task.taskDurationTime.split(':')[0],
                minute: task.taskDurationTime.split(':')[1],
            };
            const deltaTime = {
                days: task.taskStartDeltaDays,
                hour: task.taskStartDeltaTime.split(':')[0],
                minute: task.taskStartDeltaTime.split(':')[1],
            };
            return completeAt.add(durationTime).add(deltaTime);
        });
        return completeAt;
    }

    createTasks() {
        const { activeEmployees } = this.props;
        const { templateStructure } = this.props;
        const { tasks } = templateStructure;
        const { tasks: taskInformation } = this.state;
        return tasks.map((task, idx) => (
            <TaskForm
                employees={activeEmployees}
                task={task}
                key={`${Math.random()}-task`}
                parents={this.getPossibleParents(idx)}
                taskId={idx}
                onChange={this.setTask}
                taskInformation={taskInformation[idx]}
            />
        ));
    }

    render() {
        const { workflowName, startDateTime, completeAt, workflowPermissions, tasks } = this.state;
        const { activeEmployees, onSubmit } = this.props;
        const formData = this.state;
        return (
            <Form onSubmit={e => { e.preventDefault(); onSubmit(formData); }}>
                <Form.Group as={Row} controlId="WorkflowName">
                    <Form.Label column sm={4}>
                        {'Name'}
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="text"
                            placeholder="Workflow Name"
                            value={workflowName}
                            onChange={e => this.setState({ workflowName: e.target.value })}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="WorkflowStartTime">
                    <Form.Label column sm={4}>
                        {'Start Time'}
                    </Form.Label>
                    <Col sm={8}>
                        <DateTimeField
                            constraintMoment={moment()}
                            givenMoment={startDateTime}
                            onChange={this.setStartDateTime}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="WorkflowEndTime">
                    <Form.Label column sm={4}>
                        {'Complete At '}
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="text"
                            value={(completeAt).format('YYYY-MM-DD HH:mm')}
                            readOnly
                        />
                    </Col>
                </Form.Group>
                <Form.Row className="col-12">
                    <WorkflowPermissions
                        employees={activeEmployees}
                        onChange={this.setWorkFlowPermissions}
                        workflowPermissions={workflowPermissions}
                    />
                </Form.Row>
                <Form.Row className="col-12">{this.createTasks()}</Form.Row>
                <Form.Group>
                    <Col sm={8}>
                        <Button variant="primary" type="submit">
                            Create Workflow
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}

CreateWorkflow.propTypes = {
    templateStructure: PropTypes.object,
    activeEmployees: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

CreateWorkflow.defaultProps = {
    templateStructure: {
        tasks: [],
    },
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateWorkflow);
