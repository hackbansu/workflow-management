import moment from 'moment';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';

import { parseDateTime, parseTimeDelta, getRandomColor, saveToPNG } from 'utils/helpers';
import { showLoader } from 'utils/helpers/loader';
import { getEmployeeReport } from 'services/report';
import ApiConstants from 'constants/api';
import WorkflowConstants from 'constants/workflow';

// importing components
import ReportField from 'components/reportField';

export class EmployeeReport extends React.Component {
    constructor(props) {
        super(props);
        this.report = null;
        this.state = {};
    }

    async componentDidMount() {
        const { match } = this.props;
        const { id: employeeId } = match.params;

        try {
            const { response, body } = await getEmployeeReport(employeeId);
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
        const { id: employeeId } = match.params;

        if (!report) {
            return 'some error occurred';
        }

        const {
            first_name: firstName,
            last_name: lastName,
            email,
            number_of_workflows_assigned: numberOfWorkflows,
            number_of_tasks: numberOfTasks,
            total_time_spent_on_tasks: totalTimeSpentTasks,
            avg_time_spent_on_tasks: avgTimeSpentTasks,
            max_time_spent_on_tasks: maxTimeSpentTasks,
            min_time_spent_on_tasks: minTimeSpentTasks,
            total_time_spent_on_workflows: totalTimeSpentWorkflows,
            avg_time_spent_on_workflows: avgTimeSpentWorkflows,
            max_time_spent_on_workflows: maxTimeSpentWorkflows,
            min_time_spent_on_workflows: minTimeSpentWorkflows,
            last_task_completed: lastTaskCompleted,
            last_workflow_completed: lastWorkflowCompleted,
            workflows_completed_monthly: workflowsCompletedMonthly,
            time_spent_on_workflows: timeSpentOnWorkflows,
        } = report;

        const backUrl = `${ApiConstants.EMPLOYEE_PAGE}/${employeeId}`;

        const workflowsCompletedMonthlyData = {};
        const months = [...Array(13).keys()];
        months.shift();
        months.forEach(month => {
            workflowsCompletedMonthlyData[month] = { month, count: 0 };
        });
        workflowsCompletedMonthly.forEach(x => {
            const month = parseInt(moment(x.month).format('MM'));
            workflowsCompletedMonthlyData[month] = { month, count: x.count };
        });
        const barData = {
            labels: months.map(month => moment(month, 'MM').format('MMMM')),
            datasets: [
                {
                    label: 'Workflows Completed Monthly',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: months.map(month => workflowsCompletedMonthlyData[month].count),
                },
            ],
        };

        const doughnutLabels = [];
        const doughnutDatasetData = [];
        const doughnutDatasetBackgroundColor = [];
        timeSpentOnWorkflows.forEach(obj => {
            doughnutLabels.push(obj.workflow.name);
            doughnutDatasetData.push(moment.duration(obj.total_time_spent).asMinutes());
            doughnutDatasetBackgroundColor.push(getRandomColor());
        });

        const doughnutData = {
            labels: doughnutLabels,
            datasets: [
                {
                    data: doughnutDatasetData,
                    backgroundColor: doughnutDatasetBackgroundColor,
                    hoverBackgroundColor: doughnutDatasetBackgroundColor,
                },
            ],
        };
        const containerId = `employee-report-${employeeId}`;

        return (
            <Container>
                <Row className="d-flex justify-content-left">
                    <LinkContainer to={backUrl}>
                        <button type="button" className="btn btn-dark mr-3 mb-3">
                            Back to Employee
                        </button>
                    </LinkContainer>
                </Row>
                <Container id={containerId}>
                    <ReportField name="First Name" value={firstName} />
                    <ReportField name="Last Name" value={lastName} />
                    <ReportField name="Email" value={email} />
                    <ReportField name="Number of Workflows Assigned" value={numberOfWorkflows} />
                    <ReportField name="Number of Tasks Assigned" value={numberOfTasks} />
                    <ReportField name="Total Time Spent On Tasks" value={parseTimeDelta(totalTimeSpentTasks)} />
                    <ReportField name="Average Time Spent On Tasks" value={parseTimeDelta(avgTimeSpentTasks)} />
                    <ReportField name="Minimum Time Spent On Tasks" value={parseTimeDelta(minTimeSpentTasks)} />
                    <ReportField name="Maximum Time Spent On Tasks" value={parseTimeDelta(maxTimeSpentTasks)} />
                    <ReportField name="Total Time Spent On Workflows" value={parseTimeDelta(totalTimeSpentWorkflows)} />
                    <ReportField name="Average Time Spent On Workflows" value={parseTimeDelta(avgTimeSpentWorkflows)} />
                    <ReportField name="Minimum Time Spent On Workflows" value={parseTimeDelta(minTimeSpentWorkflows)} />
                    <ReportField name="Maximum Time Spent On Workflows" value={parseTimeDelta(maxTimeSpentWorkflows)} />
                    <ReportField
                        name="Last Task Completed"
                        value={
                            lastTaskCompleted
                                ? `${lastTaskCompleted.title} -- at ${parseDateTime(
                                    moment(lastTaskCompleted.completed_at)
                                )}`
                                : 'None'
                        }
                        redirectUrl={
                            lastTaskCompleted ? `${ApiConstants.TASK_PAGE}/${lastTaskCompleted.id}` : undefined
                        }
                    />
                    <ReportField
                        name="Last Workflow Completed"
                        value={
                            lastWorkflowCompleted
                                ? `${lastWorkflowCompleted.name} -- at ${parseDateTime(
                                    moment(lastWorkflowCompleted.completed_at)
                                )}`
                                : 'None'
                        }
                        redirectUrl={
                            lastWorkflowCompleted
                                ? `${ApiConstants.WORKFLOW_PAGE}/${lastWorkflowCompleted.id}`
                                : undefined
                        }
                    />
                    <ReportField
                        name="Workflows Completed Monthly (Past 12 Months)"
                        value={<Bar data={barData} width={100} height={30} />}
                    />
                    <ReportField
                        name="Time Spent With Workflows (Past 12 Months)"
                        value={<Doughnut data={doughnutData} height={100} />}
                    />
                </Container>
                <Row className="d-flex justify-content-center">
                    <LinkContainer to={backUrl}>
                        <button type="button" className="btn btn-dark mr-3 mb-3">
                            Back to Employee
                        </button>
                    </LinkContainer>
                    <button type="button" className="btn btn-info mr-3 mb-3" onClick={() => saveToPNG(containerId)}>
                        Download Report
                    </button>
                </Row>
            </Container>
        );
    }
}

EmployeeReport.propTypes = {
    match: PropTypes.object.isRequired,
};

EmployeeReport.defaultProps = {};

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
)(EmployeeReport);
