import _ from 'lodash';
import ApiConstants from 'constants/api';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { push } from 'connected-react-router';

import TaskForm from 'components/taskForm';
import UserConst from 'constants/user';
import TaskConst from 'constants/task';
import { updateWorkflowAction } from 'actions/workflow';
import { Link } from 'react-router-dom';
import { getTask, makeUpdateTask, makeTaskComplete, makeFetchWorkflowPermissions } from 'services/workflow';
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
                assignee: currentUser.employeeId,
            },
            editable: true,
        };

        // bind functions.
        this.fetchTask = this.fetchTask.bind(this);
        this.markComplete = this.markComplete.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.fetchPermissions = this.fetchPermissions.bind(this);
        this.permission = this.permission.bind(this);
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
        showLoader(true);
        const { redirect } = this.props;
        try {
            const task = await getTask(this.taskId);
            this.setState({ task });
            await this.fetchPermissions();
        } catch (error) {
            // redirect(ApiConstants.DASHBOARD_PAGE);
        } finally {
            showLoader(false);
        }
    }

    async markComplete() {
        try {
            const res = await makeTaskComplete(this.taskId);
            const { response, body } = res;
            if (!response.ok) {
                const errMsg = errorParser(body, 'failed to mark complete the task');
                toast.error(errMsg);
                return;
            }
            toast.success('Task Completed');
            this.fetchTask();
        } catch (err) {
            const errMsg = errorParser(err, 'failed to complete task');
            toast.error(errMsg);
        } finally {
            showLoader(false);
        }
    }

    async fetchPermissions() {
        showLoader(true);
        const { task } = this.state;
        try {
            const res = await makeFetchWorkflowPermissions(task.workflow);
            const { response, body } = res;
            if (!response.ok) {
                throw new Error(body);
            }
            this.setState({ permissions: body }, () => {
                this.permission();
            });
            // this.permission();
        } catch (err) {
            const errMsg = errorParser(err, 'failed to fetch permission');
            toast.error(errMsg);
        } finally {
            showLoader(false);
        }
    }

    permission() {
        const { currentUser, redirect } = this.props;
        const { task, permissions } = this.state;

        const userPermission = permissions.filter(perm => perm.employee === currentUser.employeeId);
        if (currentUser.employeeId !== task.assignee && !currentUser.isAdmin && !userPermission.length) {
            redirect(ApiConstants.DASHBOARD_PAGE);
        }

        if (userPermission.length > 0 && userPermission[0].permission === UserConst.PERMISSION.READ) {
            this.setState({ editable: false });
        }
    }

    possibleParents(workflow) {
        return [];
    }

    submitForm(taskInformation, taskId) {
        const { task } = this.state;
        const { currentUser } = this.props;
        const {
            assignee,
            taskDetail,
            taskDurationDays,
            taskDurationTime,
            taskStartDeltaDays,
            taskStartDeltaTime,
            taskTitle,
        } = taskInformation;
        const submitData = {
            title: taskTitle,
            description: taskDetail,
            assignee,
            start_delta: `${taskStartDeltaDays}:${taskStartDeltaTime}`,
            duration: `${taskDurationDays}:${taskDurationTime}`,
        };
        if (task.status && task.status !== TaskConst.STATUS.UPCOMMING) {
            delete submitData.start_delta;
        }
        if (!currentUser.isAdmin) {
            delete submitData.assignee;
        }

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
        const { task, editable } = this.state;
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
                                    disabled={!editable}
                                    taskId={parseInt(this.taskId)}
                                    showTaskId
                                    employees={activeEmployees}
                                    task={task}
                                    parents={this.possibleParents()}
                                    onChange={this.submitForm}
                                    taskInformation={task}
                                    completeAction={this.markComplete}
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
