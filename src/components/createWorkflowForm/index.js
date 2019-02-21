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
            expectedEndTime: moment(),
            workflowPermissions: {},
            tasks: {},
        };
        this.createTasks = this.createTasks.bind(this);
        this.setStartDateTime = this.setStartDateTime.bind(this);
        this.setExpectedEndDateTime = this.setExpectedEndDateTime.bind(this);
        this.setWorkFlowPermissions = this.setWorkFlowPermissions.bind(this);
        this.setTask = this.setTask.bind(this);
    }


    setStartDateTime(value) {
        this.setState({
            startDateTime: value,
        });
    }

    setExpectedEndDateTime(value) {
        this.setState({
            expectedEndTime: value,
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
        this.setState({ tasks });
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
        const { workflowName, startDateTime, expectedEndTime, workflowPermissions, tasks } = this.state;
        const { activeEmployees } = this.props;
        return (
            <Form>
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
                        {'Expected End Time'}
                    </Form.Label>
                    <Col sm={8}>
                        <DateTimeField
                            constraintMoment={startDateTime}
                            givenMoment={expectedEndTime}
                            onChange={this.setExpectedEndDateTime}
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
            </Form>
        );
    }
}

CreateWorkflow.propTypes = {
    templateStructure: PropTypes.object,
    activeEmployees: PropTypes.object.isRequired,
};

CreateWorkflow.defaultProps = {
    templateStructure: {
        tasks: [],
    },
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateWorkflow);
