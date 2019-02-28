import moment from 'moment';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { parseDateTime, parseTimeDelta } from 'utils/helpers';
import { showLoader } from 'utils/helpers/loader';
import { getWorkflowReport } from 'services/report';
import ApiConstants from 'constants/api';
import WorkflowConstants from 'constants/workflow';

// importing components
import EmployeeForm from 'components/employeeForm';
import ReportField from 'components/reportField';

export class WorkflowReport extends React.Component {
    constructor(props) {
        super(props);
        this.report = null;
        this.state = {};
    }

    async componentDidMount() {
        const { match } = this.props;
        const { id: workflowId } = match.params;

        try {
            const { response, body } = await getWorkflowReport(workflowId);
            this.setState({
                report: body,
            });
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * function to render the component.
     */
    render() {
        const { report } = this.state;
        const { match } = this.props;
        const { id: workflowId } = match.params;

        if (!report) {
            return 'some error occurred';
        }

        const {
            name,
            status,
            start_at: startAt,
            completed_at: completedAt,
            creator,
            unique_assignees: uniqueAssignees,
            total_time_spend: totalTimeSpend,
            number_of_assignees: numberOfAssignees,
            number_of_tasks: numberOfTasks,
            average_task_complete_time: averageTaskCompleteTime,
            assingee_with_min_time: assingeeWithMinTime,
            assingee_with_max_time: assingeeWithMaxTime,
        } = report;

        if (!uniqueAssignees) {
            return 'assignees error';
        }

        const backUrl = `${ApiConstants.WORKFLOW_PAGE}/${workflowId}`;

        return (
            <Container>
                <Row className="d-flex justify-content-left">
                    <LinkContainer to={backUrl}>
                        <button type="button" className="btn btn-secondary mr-3 mb-3">
                            Back to Workflow
                        </button>
                    </LinkContainer>
                </Row>
                <ReportField name="Name" value={name} />
                <ReportField name="Status" value={WorkflowConstants.STATUS[status]} />
                <ReportField name="Start At" value={parseDateTime(moment(startAt))} />
                <ReportField name="Completed At" value={completedAt ? parseDateTime(moment(completedAt)) : null} />
                <ReportField
                    name="Creator"
                    value={creator.user.email}
                    redirectUrl={`${ApiConstants.EMPLOYEE_PAGE}/${creator.id}`}
                />
                <ReportField name="Total Time Spend" value={parseTimeDelta(totalTimeSpend)} />
                <ReportField name="Number of Assignees" value={numberOfAssignees} />
                <ReportField name="Number of Tasks" value={numberOfTasks} />
                <ReportField name="Average Task Complete Time" value={parseTimeDelta(averageTaskCompleteTime)} />
                <ReportField
                    name="Assignee With Minimum Time"
                    value={assingeeWithMinTime.user.email}
                    redirectUrl={`${ApiConstants.EMPLOYEE_PAGE}/${assingeeWithMinTime.id}`}
                />
                <ReportField
                    name="Assignee With Maximum Time"
                    value={assingeeWithMaxTime.user.email}
                    redirectUrl={`${ApiConstants.EMPLOYEE_PAGE}/${assingeeWithMaxTime.id}`}
                />
                <ReportField
                    name="Unique Assignees:"
                    value={uniqueAssignees.map(assignee => ({
                        url: `${ApiConstants.EMPLOYEE_PAGE}/${assignee.id}`,
                        value: assignee.user.email,
                    }))}
                    isList
                />
                <Row className="d-flex justify-content-center">
                    <LinkContainer to={backUrl}>
                        <button type="button" className="btn btn-secondary mr-3 mb-3">
                            Back to Workflow
                        </button>
                    </LinkContainer>
                </Row>
            </Container>
        );
    }
}

WorkflowReport.propTypes = {
    match: PropTypes.object.isRequired,
};

WorkflowReport.defaultProps = {};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    workflows: state.workflows,
});

const mapDispatchToProps = dispatch => ({
    redirect: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkflowReport);
