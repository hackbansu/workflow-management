import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Form, Button, Container, Alert } from 'react-bootstrap';

import DateTimeField from 'components/dateTimeField';
import TaskForm from 'components/taskForm';
import WorkflowPermissions from 'components/workflowPermissions';
import { validateTextString, validateDate } from 'utils/validators';
import { toast } from 'react-toastify';
import DefaultConstants from 'constants/index';


export class CreateWorkflow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workflowName: '',
            startDateTime: moment(),
            completeAt: moment(),
            workflowPermissions: {},
            tasks: {},
            errors: [],
        };
        this.createTasks = this.createTasks.bind(this);
        this.setStartDateTime = this.setStartDateTime.bind(this);
        this.setWorkFlowPermissions = this.setWorkFlowPermissions.bind(this);
        this.setTask = this.setTask.bind(this);
        this.updateCompleteAt = this.updateCompleteAt.bind(this);
        this.validate = this.validate.bind(this);
        this.validationErrors = this.validationErrors.bind(this);
    }


    setStartDateTime(value) {
        const completeAt = this.updateCompleteAt(value);
        this.setState({
            startDateTime: value,
            completeAt,
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
        this.setState({ tasks, completeAt }, () => { toast.info('task saved'); });
    }

    validate() {
        const errors = [];
        const { workflowName, startDateTime } = this.state;
        let validation = validateTextString(workflowName);
        if (!validation.isValid) {
            errors.push({ heading: 'Name', errors: validation.message });
        }
        validation = validateDate(startDateTime);
        if (!validation.isValid) {
            errors.push({ heading: 'Start Time', errors: validation.message });
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

    updateCompleteAt(startDT) {
        // replace startDateTime if already given
        let { startDateTime } = this.state;
        startDateTime = startDT || startDateTime;

        const { tasks } = this.state;
        const completeAt = moment(startDateTime);
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
                taskId={idx}
                employees={activeEmployees}
                task={task}
                key={`${Math.random()}-task`}
                parents={this.getPossibleParents(idx)}
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
            <Form onSubmit={e => {
                e.preventDefault();
                if (!this.validate()) {
                    e.stopPropagation();
                    return;
                }
                onSubmit(formData);
            }}
            >
                <Container>
                    {this.validationErrors()}
                </Container>
                <Form.Group as={Row} controlId="WorkflowName">
                    <Form.Label column sm={4}>
                        {'Name'}
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            size="sm"
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
                            size="sm"
                            type="text"
                            value={(completeAt).format(DefaultConstants.DATE_TIME_FORMAT)}
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
