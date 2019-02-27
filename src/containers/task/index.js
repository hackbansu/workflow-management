import _ from 'lodash';
import ApiConstants from 'constants/api';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { push } from 'connected-react-router';

import TaskForm from 'components/taskForm';
import { updateWorkflowAction } from 'actions/workflow';
import { Link } from 'react-router-dom';
import { getTask, makeUpdateTask } from 'services/workflow';
import { getEmployee, getAllEmployees } from 'services/employees';
import { errorParser } from 'utils/helpers/errorHandler';
import { toast } from 'react-toastify';
import { showLoader } from 'utils/helpers/loader';

export class Task extends React.Component {
    constructor(props) {
        super(props);
        const { match, currentUser } = this.props;
        const { id: taskId } = match.params;
        this.taskId = taskId;
        this.state = {
            task: {
                assignee: currentUser.id,
            },
        };

        // bind functions.
        this.fetchTask = this.fetchTask.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        const { task } = this.state;
        const { activeEmployees } = this.props;
        // fetch all active employees, if only assignee missing then only assignee will be fetched
        if (Object.keys(activeEmployees).length === 0) {
            getAllEmployees();
        } else if (!Object.hasOwnProperty.call(task, 'assignee')) {
            getEmployee(task.assignee);
        }
        this.fetchTask();
    }

    async fetchTask() {
        const { redirect } = this.props;
        try {
            // const { ongoingTasks, upcommingTasks, completeTasks } = this.props;
            // if (Object.hasOwnProperty.call(ongoingTasks, this.taskId)) {
            //     this.setState({ task: apiTaskFormCouple(ongoingTasks[this.taskId]) });
            // } else if (Object.hasOwnProperty.call(upcommingTasks, this.taskId)) {
            //     this.setState({ task: apiTaskFormCouple(upcommingTasks[this.taskId]) });
            // } else if (Object.hasOwnProperty.call(completeTasks, this.taskId)) {
            //     this.setState({ task: apiTaskFormCouple(completeTasks[this.taskId]) });
            // } else {
            const task = await getTask(this.taskId);
            this.setState({ task });
            // }
        } catch (error) {
            redirect(ApiConstants.DASHBOARD_PAGE);
        }
    }

    permission() {
        const { currentUser, redirect } = this.props;
        const { task } = this.state;
        if (currentUser.id !== task.assignee && !currentUser.isAdmin) {
            redirect(ApiConstants.DASHBOARD_PAGE);
        }
    }

    possibleParents(workflow) {
        return [];
    }

    submitForm(taskInformation, taskId) {
        const {
            assignee,
            taskDetail,
            taskDurationDays,
            taskDurationTime,
            taskStartDeltaDays,
            taskStartDeltaTime,
            taskTitle } = taskInformation;
        const submitData = {
            title: taskTitle,
            description: taskDetail,
            assignee,
            start_delta: `${taskStartDeltaDays}:${taskStartDeltaTime}`,
            duration: `${taskDurationDays}:${taskDurationTime}`,
        };
        showLoader(true);
        makeUpdateTask(taskId, submitData)
            .then(res => {
                const { response, body } = res;
                if (!response.ok) {
                    const errMsg = errorParser(body, 'failed to update task');
                    toast.error(errMsg);
                    return;
                }
                toast.success('task updated successfully');
            })
            .finally(() => {
                showLoader(false);
            });
    }

    render() {
        const { activeEmployees } = this.props;
        const { task } = this.state;
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} sm xs={12}>
                        <Link to={`${ApiConstants.WORKFLOW_PAGE}/${task.workflow}`} className="text-info ml-2 mb-2">
                            {'<< Workflow'}
                        </Link>
                        <Form>
                            <Form.Row className="col-12">
                                <TaskForm
                                    taskId={parseInt(this.taskId)}
                                    showTaskId
                                    employees={activeEmployees}
                                    task={task}
                                    parents={this.possibleParents()}
                                    onChange={this.submitForm}
                                    taskInformation={task}
                                />
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Task.propTypes = {
    currentUser: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    activeEmployees: PropTypes.object,

    redirect: PropTypes.func.isRequired,
};

Task.defaultProps = {
    activeEmployees: {},
};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    activeEmployees: state.employees.activeEmployees,
    workflows: state.workflows,
    upcommingTasks: state.tasks.upcomming,
    ongoingTasks: state.tasks.ongoing,
    completeTasks: state.tasks.complete,
});

const mapDispatchToProps = dispatch => ({
    updateWorkflowAction: (...args) => dispatch(updateWorkflowAction(...args)),
    redirect: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Task);
