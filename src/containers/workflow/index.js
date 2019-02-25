import _ from 'lodash';
import ApiConstants from 'constants/api';
import taskConstants from 'constants/task';
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { push } from 'connected-react-router';

import DateTimeField from 'components/dateTimeField';
import TaskForm from 'components/taskForm';
import { updateWorkflowAction } from 'actions/workflow';
import { makeFetchWorkflow } from 'services/workflow';
import { getEmployee, getAllEmployees } from 'services/employees';
import { errorParser } from 'utils/helpers/errorHandler';
import { showLoader } from 'utils/helpers/loader';
import { showToast } from 'utils/helpers/toast';
import { parseWorkflow } from 'utils/helpers';


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
            this.setCreator(creator);
            this.state = {
                ...this.state,
                workflowName,
                startDateTime,
            };
        }

        // bind functions.
        this.setCreator = this.setCreator.bind(this);
    }

    componentDidMount() {
        const { updateWorkflowAction, workflows, activeEmployees, inactiveEmployees } = this.props;
        getAllEmployees();

        if (!Object.hasOwnProperty.call(workflows, this.workflowId)) {
            showLoader(true);
            // fetch workflow if not in store
            return makeFetchWorkflow(this.workflowId)
                .then(obj => {
                    if (!obj) {
                        return;
                    }
                    const { response } = obj;
                    let { body } = obj;

                    if (response.status === 404) {
                        const { redirect } = this.props;
                        redirect(ApiConstants.DASHBOARD_PAGE);
                    }
                    if (response.status !== 200) {
                        const errMsg = errorParser(body);
                        showToast(errMsg);
                        return;
                    }
                    body = parseWorkflow(body);
                    const workflows = {};
                    workflows[body.id] = body;
                    updateWorkflowAction(workflows);
                    const workflow = workflows[this.workflowId];
                    const { creator } = workflow;
                    this.constrainStartDateTime = moment(workflow.startAt);
                    this.setState({ workflowName: workflow.name, startDateTime: this.constrainStartDateTime });
                    this.setCreator(creator);
                })
                // finally shut the loader
                .finally(() => {
                    showLoader(false);
                });
        }
        const workflow = workflows[this.workflowId];
        return this.setCreator(workflow.creator);
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
                <TaskForm
                    taskId={parseInt(taskId)}
                    showTaskId
                    employees={activeEmployees}
                    task={tasks[taskId]}
                    key={`${Math.random()}-task`}
                    parents={this.possibleParents(workflow)}
                    onChange={() => console.log('dummy called')}
                    taskInformation={tasks[taskId]}
                />
            ));
        }
        return <></>;
    }

    render() {
        const { workflows } = this.props;
        const { workflowName, creator, startDateTime } = this.state;
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={10} sm xs={12}>
                        <Form>
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
                            <Form.Row className="col-12">{this.createTasks()}</Form.Row>
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

    updateWorkflowAction: PropTypes.func.isRequired,
    redirect: PropTypes.func.isRequired,
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
    updateWorkflowAction: (...args) => dispatch(updateWorkflowAction(...args)),
    redirect: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Workflows);
