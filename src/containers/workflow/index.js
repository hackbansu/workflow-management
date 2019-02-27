import _ from 'lodash';
import ApiConstants from 'constants/api';
import taskConstants from 'constants/task';
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import DateTimeField from 'components/dateTimeField';
import TaskWorkflowCard from 'components/taskWorkflowCard';
import WorkflowPermissions from 'components/workflowPermissions';
import UserConstants from 'constants/user';
import { getWorkflow, makeUpdateWorflow as makeUpdateWorflowRequest, makeUpdatePermissions } from 'services/workflow';
import { getEmployee, getAllEmployees } from 'services/employees';
import { formatPermission } from 'utils/helpers';
import { errorParser } from 'utils/helpers/errorHandler';
import { toast } from 'react-toastify';
import { showLoader } from 'utils/helpers/loader';


export class Workflows extends React.Component {
    constructor(props) {
        super(props);
        const { match, workflows } = this.props;
        const { id: workflowId } = match.params;
        this.workflowId = workflowId;
        this.constrainStartDateTime = moment();
        this.state = {
            workflowName: '',
            startDateTime: this.constrainStartDateTime,
            creator: {
                user: {
                    email: '',
                    first_name: '',
                    last_name: '',
                },
            },
        };
        const workflow = workflows[this.workflowId];
        if (workflow) {
            const { name: workflowName, startDateTime, creator } = workflow;
            this.constrainStartDateTime = moment(startDateTime);
            this.state = {
                ...this.state,
                workflowName,
                startDateTime,
            };
        }

        this.removePermission = new Set();

        // bind functions.
        this.setCreator = this.setCreator.bind(this);
        this.setWorkFlowPermissions = this.setWorkFlowPermissions.bind(this);
        this.setStartDateTime = this.setStartDateTime.bind(this);
        this.updateWorkflow = this.updateWorkflow.bind(this);
    }

    async componentDidMount() {
        const { workflows } = this.props;
        getAllEmployees();

        // if (!Object.hasOwnProperty.call(workflows, this.workflowId)) {
        showLoader(true);
        // fetch workflow if not in store
        try {
            const workflow = await getWorkflow(this.workflowId);
            const { creator } = workflow;
            this.constrainStartDateTime = moment(workflow.startAt);
            this.setState({
                workflowName: workflow.name,
                startDateTime: this.constrainStartDateTime,
                workflowPermissions: formatPermission(workflow.accessors, 'id'),
            });
            return this.setCreator(creator);
        } catch (e) {
            return Promise.reject(e);
        }
        // }
        // const workflow = workflows[this.workflowId];
        // return this.setCreator(workflow.creator);
    }

    async setCreator(creator) {
        const { activeEmployees, inactiveEmployees } = this.props;

        // check creator in active and inactive employees or fetch it
        if (Object.hasOwnProperty.call(activeEmployees, creator)) {
            this.setState({ creator: activeEmployees[creator] });
        } else if (Object.hasOwnProperty.call(inactiveEmployees, creator)) {
            this.setState({ creator: inactiveEmployees[creator] });
        } else {
            this.setState({
                creator: await getEmployee(creator),
            });
        }
    }

    setStartDateTime(value) {
        this.setState({
            startDateTime: value,
        });
    }

    setWorkFlowPermissions(value) {
        const { workflowPermissions } = this.state;
        // add all current permission to remove permissions.
        Object.keys(workflowPermissions).map(pId => {
            const permission = workflowPermissions[pId];
            return this.removePermission.add(permission.employee);
        });
        // remove common permissions from set.
        Object.keys(value).map(pId => {
            const permission = value[pId];
            return this.removePermission.delete(permission.employee);
        });
        this.setState({ workflowPermissions: value });
    }

    createWorkFlowButton() {
        const { currentUser } = this.props;
        if (currentUser.isAdmin) {
            return (
                <React.Fragment>
                    <LinkContainer to={ApiConstants.TEMPLATES_PAGE}>
                        <Button variant="primary">
                            {'New Workflow'}
                        </Button>
                    </LinkContainer>
                </React.Fragment>
            );
        }
        return <></>;
    }

    taskClass(status) {
        switch (status) {
        case taskConstants.STATUS.UPCOMMING:
            return 'info';
        case taskConstants.STATUS.ONGOING:
            return 'success';
        case taskConstants.STATUS.COMPLETE:
            return 'dark';
        default:
            return 'success';
        }
    }

    possibleParents(workflow) {
        return Object.keys(workflow.tasks);
    }

    createTasks() {
        const { workflows, activeEmployees } = this.props;
        if (Object.hasOwnProperty.call(workflows, this.workflowId)) {
            const workflow = workflows[this.workflowId];
            const { tasks } = workflow;
            return Object.keys(tasks).map((taskId, idx) => (
                <TaskWorkflowCard
                    key={`${Math.random()}-task`}
                    taskId={parseInt(taskId)}
                    employees={activeEmployees}
                    taskInformation={tasks[taskId]}
                />
            ));
        }
        return <></>;
    }

    updateWorkflow() {
        const { startDateTime, workflowName, workflowPermissions } = this.state;
        let workflowUpdateData;
        if (startDateTime > moment()) {
            workflowUpdateData = {
                start_at: startDateTime.toISOString(),
                name: workflowName,
            };
        } else {
            workflowUpdateData = {
                name: workflowName,
            };
        }
        const readPermissions = [];
        const writePermissions = [];

        Object.keys(workflowPermissions).map(pId => {
            const permission = workflowPermissions[pId];
            if (permission.permission === String(UserConstants.PERMISSION.READ)) {
                readPermissions.push(parseInt(permission.employee));
            } else {
                writePermissions.push(parseInt(permission.employee));
            }
            return null;
        });

        const permissionData = {
            read_permissions: readPermissions,
            write_permissions: writePermissions,
        };

        showLoader(true);
        function resultHandler(res, successMsg = 'request done', failMsg = 'request failed') {
            const { response, body } = res;
            if (!response.ok) {
                const errMsg = errorParser(body, failMsg);
                toast.error(errMsg);
                return;
            }
            toast.success(successMsg);
        }

        Promise.all([
            makeUpdateWorflowRequest(this.workflowId, workflowUpdateData),
            makeUpdatePermissions(this.workflowId, permissionData),
        ])
            .then(result => {
                resultHandler(result[0], 'Workflow update successfully', 'failed to update workflow');
                resultHandler(result[0], 'Workflow Permissions updated successfully', 'failed to update permissions');
            })
            .catch(err => {
                errorParser(err, 'workflow update failed');
            })
            .finally(() => {
                showLoader(false);
            });
    }

    render() {
        const { workflowName, creator, startDateTime, workflowPermissions } = this.state;

        // Copy is required to prevent refernced object operatios.
        const workflowPermissionsCopy = { ...workflowPermissions };

        const { activeEmployees } = this.props;
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={10} sm xs={12}>
                        <Form onSubmit={
                            e => {
                                e.preventDefault();
                                this.updateWorkflow();
                            }
                        }
                        >
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
                                        disabled={startDateTime < moment()}
                                        constraintMoment={moment()}
                                        givenMoment={startDateTime}
                                        onChange={this.setStartDateTime}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="WorkflowEndTime">
                                <Form.Label column sm={4}>
                                    {'Creator '}
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        value={`${creator.user.firstName} ${creator.user.lastName}`}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Row className="col-12">
                                <WorkflowPermissions
                                    employees={activeEmployees}
                                    onChange={this.setWorkFlowPermissions}
                                    workflowPermissions={workflowPermissionsCopy}
                                />
                            </Form.Row>
                            <Form.Row className="col-12">{this.createTasks()}</Form.Row>
                            <Form.Group>
                                <Col sm={8}>
                                    <Button variant="primary" type="submit">
                                        Update Workflow
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Workflows.propTypes = {
    currentUser: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    workflows: PropTypes.object.isRequired,
    activeEmployees: PropTypes.object,
    inactiveEmployees: PropTypes.object,

};

Workflows.defaultProps = {
    activeEmployees: {},
    inactiveEmployees: {},
};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    activeEmployees: state.employees.activeEmployees,
    workflows: state.workflows,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Workflows);
