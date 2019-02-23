import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';

import { makeFetchTemplate } from 'services/templates';
import { makeFetchActiveEmployeeAdminRequest } from 'services/employees';
import { errorParser } from 'utils/helpers/errorHandler';
import { showModal } from 'utils/helpers/modal';
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
            // duration: data.
        };
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
};

CreateWorkflow.defaultProps = {};

const mapStateToProps = state => ({
    templates: state.templates,
    employees: state.employees,
});

const mapDispatchToProps = dispatch => ({
    updateEmployeesAction: activeEmployees => dispatch(updateEmployeesAction(activeEmployees)),
    updateTemplatesAction: (...args) => dispatch(updateTemplatesAction(...args)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateWorkflow);
