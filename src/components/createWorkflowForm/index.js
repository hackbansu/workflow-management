import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';

import DateTimeField from 'components/dateTimeField';
import TaskForm from 'components/taskForm';
import WorkflowPermissions from 'components/workflowPermissions';
/**
 * Login page component.
 */
export class CreateWorkflow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workflowName: '',
            startDateTime: moment(),
            expectedEndTime: moment(),
            workflowPermissions: [],
            tasks: [],
        };
        this.createTasks = this.createTasks.bind(this);
        this.setStartDateTime = this.setStartDateTime.bind(this);
        this.setExpectedEndDateTime = this.setExpectedEndDateTime.bind(this);
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

    getParent(upto) {
        return [...Array(upto + 1).keys()];
    }

    getBorderClass() {
        const items = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
        return `border-${_.sample(items)}`;
    }

    setWorkFlowPermissions(value) {
        this.setState({ workflowPermissions: value });
    }

    createTasks() {
        const { activeEmployees } = this.props;
        const { templateStructure } = this.props;
        const { tasks } = templateStructure;
        return tasks.map((task, idx) => (
            <TaskForm
                employees={activeEmployees}
                task={task}
                key={`${Math.random()}-task`}
                parents={this.getParent(idx)}
                borderColor={this.getBorderClass()}
                taskId={idx}
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
                        <DateTimeField onChange={this.setStartDateTime} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="WorkflowEndTime">
                    <Form.Label column sm={4}>
                        {'Expected End Time'}
                    </Form.Label>
                    <Col sm={8}>
                        <DateTimeField onChange={this.setExpectedEndDateTime} />
                    </Col>
                </Form.Group>
                <Form.Row className="col-12">
                    <WorkflowPermissions
                        employees={activeEmployees}
                        borderColor={this.getBorderClass()}
                        onChange={this.setWorkFlowPermissions}
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
