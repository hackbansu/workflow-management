import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ApiConstants from 'constants/api';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';

import { makeFetchTemplate } from 'services/templates';
import { makeFetchActiveEmployeeAdminRequest } from 'services/employees';
import { makeCreateWorkflow } from 'services/workflow';
import { errorParser } from 'utils/helpers/errorHandler';
import { showModal } from 'utils/helpers/modal';
import { toast } from 'react-toastify';
import { showLoader } from 'utils/helpers/loader';
import { parseEmployeeData } from 'utils/helpers';
import { updateEmployeesAction } from 'actions/employees';
import { updateTemplatesAction } from 'actions/templates';
import CreateWorkflowFrom from 'components/createWorkflowForm';

/**
 * Login page component.
 */
export class CreateWorkflow extends React.Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        const { templateId } = match.params;
        this.state = {
            templateId,
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        const { templates, employees } = this.props;
        const { templateId } = this.state;
        const { updateEmployeesAction, updateTemplatesAction } = this.props;
        // fetch active employees
        if (!Object.hasOwnProperty.call(employees, 'activeEmployees')
        || !Object.keys(employees.activeEmployees).length) {
            makeFetchActiveEmployeeAdminRequest()
                .then(({ response, body }) => {
                    if (response.ok) {
                        if (body.length === 0) {
                            showModal('fatal Error', 'No active Employees in Company');
                        } else {
                            body = body.map(data => parseEmployeeData(data));
                            updateEmployeesAction(_.keyBy(body, 'id'));
                        }
                    } else {
                        const errMsg = errorParser(body, 'failed to fetch employees');
                        showModal('fatal Error', errMsg);
                    }
                })
                .catch(err => {
                    const errMsg = errorParser(err, 'failed to fetch employees');
                    showModal('fatal Error', errMsg);
                });
        }

        // fetch template if template does not exist
        if (!Object.hasOwnProperty.call(templates, String(templateId))) {
            makeFetchTemplate(templateId)
                .then(({ response, body }) => {
                    if (response.ok) {
                        const templates = {};
                        templates[body.id] = body;
                        updateTemplatesAction(templates);
                    } else {
                        const errMsg = errorParser(body, 'failed to fetch template');
                        showModal('fatal Error', errMsg);
                    }
                })
                .catch(err => {
                    const errMsg = errorParser(err, 'failed to fetch template');
                    showModal('fatal Error', errMsg);
                });
        }
    }

    onSubmit(data) {
        const { templateId } = this.state;
        const submitData = {
            template: templateId,
            name: data.workflowName,
            start_at: data.startDateTime.toISOString(),
            tasks: Object.keys(data.tasks).map(taskId => {
                const task = data.tasks[taskId];
                return {
                    title: task.taskTitle,
                    start_delta: `${task.taskStartDeltaDays} ${task.taskStartDeltaTime}:00`,
                    duration: `${task.taskDurationDays} ${task.taskDurationTime}:00`,
                    description: task.taskDetail,
                    assignee: task.assignee,
                    parent_task: task.parentTask,
                };
            }),
            accessors: Object.keys(data.workflowPermissions)
                .map(permissionId => data.workflowPermissions[permissionId]),
        };
        showLoader(true);
        makeCreateWorkflow(submitData)
            .then(res => {
                const { redirect } = this.props;
                const { response, body } = res;
                if (response.status !== 201) {
                    const errMsg = errorParser(body, 'failed to create workflow');
                    showModal('Error', errMsg);
                    return;
                }
                toast.success('Workflow Created');
                redirect(ApiConstants.WORKFLOWS_PAGE);
            })
            .finally(() => {
                showLoader(false);
            });
    }

    render() {
        const { employees, templates } = this.props;
        const { activeEmployees } = employees;
        const { templateId } = this.state;
        const template = templates[templateId] || {};
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={10} sm xs={12}>
                        <CreateWorkflowFrom
                            onSubmit={this.onSubmit}
                            templateStructure={template.structure}
                            activeEmployees={activeEmployees}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

CreateWorkflow.propTypes = {
    match: PropTypes.object.isRequired,
    templates: PropTypes.object.isRequired,
    employees: PropTypes.object.isRequired,

    updateEmployeesAction: PropTypes.func.isRequired,
    updateTemplatesAction: PropTypes.func.isRequired,
    redirect: PropTypes.func.isRequired,
};

CreateWorkflow.defaultProps = {};

const mapStateToProps = state => ({
    templates: state.templates,
    employees: state.employees,
});

const mapDispatchToProps = dispatch => ({
    updateEmployeesAction: activeEmployees => dispatch(updateEmployeesAction(activeEmployees)),
    updateTemplatesAction: (...args) => dispatch(updateTemplatesAction(...args)),
    redirect: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateWorkflow);
