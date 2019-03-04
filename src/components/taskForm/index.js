import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Alert, Container } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';


import taskConstants from 'constants/task';
import { getRandomBorder } from 'utils/helpers';
import { validateTextString } from 'utils/validators';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            taskDetail: '',
            taskTitle: '',
            assignee: 0,
            taskStartDeltaTime: '00:00',
            taskStartDeltaDays: 0,
            taskDurationTime: '00:00',
            taskDurationDays: 0,
        };
        this.saveTask = this.saveTask.bind(this);
        this.parentOptions = this.parentOptions.bind(this);
        this.validateTask = this.validateTask.bind(this);
        this.validationErros = this.validationErrors.bind(this);

        this.renderTaskId = this.renderTaskId.bind(this);
        this.renderParentTask = this.renderParentTask.bind(this);
        this.statePropMap = this.statePropMap.bind(this);
    }

    componentDidMount() {
        this.statePropMap();
    }

    componentWillReceiveProps(nextProps) {
        this.statePropMap(nextProps);
    }

    statePropMap(nextProps) {
        const prop = nextProps || this.props;
        const { taskInformation } = prop;
        const { taskTitle, taskDetail, assignee } = taskInformation;
        let { taskStartDeltaTime, taskStartDeltaDays, taskDurationDays, taskDurationTime } = taskInformation;
        taskStartDeltaDays = taskStartDeltaDays || 0;
        taskStartDeltaTime = taskStartDeltaTime || '00:00';
        taskDurationTime = taskDurationTime || '00:00';
        taskDurationDays = taskDurationDays || 0;
        this.setState({
            taskDetail: taskDetail || '',
            taskTitle: taskTitle || '',
            assignee,
            taskStartDeltaTime,
            taskStartDeltaDays,
            taskDurationTime,
            taskDurationDays,
        });
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
        const {
            taskTitle,
            taskDetail,
            assignee,
            taskStartDeltaTime,
            taskStartDeltaDays,
            taskDurationDays,
            taskDurationTime } = this.state;
        const taskInformation = {
            taskTitle,
            taskStartDeltaTime,
            taskStartDeltaDays,
            taskDurationTime,
            taskDurationDays,
            taskDetail,
            assignee,
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

    renderCompleteBtn(disabled) {
        const { completeAction } = this.props;
        if (completeAction && !disabled) {
            return (
                <Form.Group className="float-right">
                    <Button variant="success" onClick={completeAction}>Complete Task</Button>
                </Form.Group>
            );
        }
        return <></>;
    }

    renderParentTask() {
        // TODO feature
        const { taskId, taskInformation } = this.props;
        const { parentTask } = taskInformation;
        // if (taskId && false) {
        //     return (
        //         <Form.Row>
        //             <Form.Group as={Col}>
        //                 <Form.Label>Parent Task</Form.Label>
        //                 <Form.Control
        //                     size="sm"
        //                     as="select"
        //                     defaultValue={parentTask}
        //                     ref={this.parentTask}
        //                 >
        //                     {this.parentOptions()}
        //                 </Form.Control>
        //             </Form.Group>
        //         </Form.Row>
        //     );
        // }
        return <></>;
    }

    render() {
        // TODO:Implement to render extra field in taks using task props.
        const { task: taskStructure, employees, taskInformation, currentUser } = this.props;
        let { disabled } = this.props;
        const {
            taskTitle,
            taskDetail,
            assignee,
            taskStartDeltaTime,
            taskStartDeltaDays,
            taskDurationDays,
            taskDurationTime } = this.state;

        // field permission implementation managment
        const { status } = taskInformation;
        const taskStatus = status || taskConstants.STATUS.UPCOMMING;
        disabled = disabled || taskStatus >= taskConstants.STATUS.COMPLETE;

        const startEditable = taskStatus < taskConstants.STATUS.SCHEDULED;
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
                            disabled={disabled}
                            size="sm"
                            type="text"
                            value={taskTitle}
                            onChange={e => this.setState({ taskTitle: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="employeeSelect">
                        <Form.Label column sm={12}>
                            Assignee
                        </Form.Label>
                        <Col sm={12} key={`${assignee}-assignee`}>
                            <Form.Control
                                disabled={disabled || !currentUser.isAdmin}
                                size="sm"
                                as="select"
                                value={assignee}
                                onChange={e => this.setState({ assignee: e.target.value })}
                            >
                                {this.employeesOptions(employees, assignee)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Start Delta Time</Form.Label>
                        <Form.Control
                            disabled={disabled || !startEditable}
                            size="sm"
                            type="time"
                            value={taskStartDeltaTime}
                            onChange={e => this.setState({ taskStartDeltaTime: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Start Delta Days</Form.Label>
                        <Form.Control
                            disabled={disabled || !startEditable}
                            size="sm"
                            type="number"
                            min="0"
                            value={taskStartDeltaDays}
                            onChange={e => this.setState({ taskStartDeltaDays: e.target.value })}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Duration Time</Form.Label>
                        <Form.Control
                            disabled={disabled}
                            size="sm"
                            type="time"
                            value={taskDurationTime}
                            onChange={e => this.setState({ taskDurationTime: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Duration Days</Form.Label>
                        <Form.Control
                            disabled={disabled}
                            size="sm"
                            type="number"
                            min="0"
                            value={taskDurationDays}
                            onChange={e => this.setState({ taskDurationDays: e.target.value })}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Task Detail</Form.Label>
                        <textarea
                            disabled={disabled}
                            className="form-control"
                            row="4"
                            value={taskDetail}
                            onChange={e => this.setState({ taskDetail: e.target.value })}
                        />
                    </Form.Group>
                </Form.Row>
                { this.renderParentTask() }
                <div className="py-4 clearfix">
                    <Form.Group className="float-left">
                        <Button
                            disabled={taskStatus === taskConstants.STATUS.COMPLETE}
                            variant="success"
                            onClick={e => this.saveTask(e)}
                        >
                            Save Task
                        </Button>
                    </Form.Group>
                    {this.renderCompleteBtn(disabled)}
                </div>
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
    completeAction: PropTypes.func,
    disabled: PropTypes.bool,
};
TaskForm.defaultProps = {
    disabled: false,
    taskInformation: {
        taskTitle: '',
        taskStartDeltaTime: '',
        taskStartDeltaDays: '',
        taskDetail: '',
        parentTask: 0,
        assignee: '',
    },
    showTaskId: false,
    completeAction: undefined,
};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
});

export default connect(mapStateToProps)(TaskForm);
