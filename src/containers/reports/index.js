import moment from 'moment';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Doughnut, Line } from 'react-chartjs-2';

import { parseDateTime, parseTimeDelta, getRandomColor, saveToPNG } from 'utils/helpers';
import { showLoader } from 'utils/helpers/loader';
import { getFavouriteEmployeesReport, getIJLEmployeesReport } from 'services/report';
import ApiConstants from 'constants/api';
import WorkflowConstants from 'constants/workflow';

// importing components
import ReportField from 'components/reportField';

export class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.report = null;
        this.state = {};
    }

    async componentDidMount() {
        try {
            const { response: responseFav01, body: bodyFav01 } = await getFavouriteEmployeesReport('01');
            const { response: responseFav03, body: bodyFav03 } = await getFavouriteEmployeesReport('03');
            const { response: responseFav12, body: bodyFav12 } = await getFavouriteEmployeesReport('12');
            const { response: responseIjl, body: bodyIjl } = await getIJLEmployeesReport();

            this.setState({
                reportFav01: bodyFav01,
                reportFav03: bodyFav03,
                reportFav12: bodyFav12,
                reportIjl: bodyIjl,
            });
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    getLineDataset(months, data, label) {
        const color = getRandomColor();

        return {
            label,
            fill: false,
            lineTension: 0.1,
            backgroundColor: color,
            borderColor: color,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: color,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: color,
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: months.map(month => data[month].count),
        };
    }

    getDoughnutData(objs) {
        const doughnutLabels = [];
        const doughnutDatasetData = [];
        const doughnutDatasetBackgroundColor = [];
        objs.forEach(obj => {
            doughnutLabels.push(obj.employee.user.email);
            doughnutDatasetData.push(moment.duration(obj.avg_task_time).asMinutes());
            doughnutDatasetBackgroundColor.push(getRandomColor());
        });

        return {
            labels: doughnutLabels,
            datasets: [
                {
                    data: doughnutDatasetData,
                    backgroundColor: doughnutDatasetBackgroundColor,
                    hoverBackgroundColor: doughnutDatasetBackgroundColor,
                },
            ],
        };
    }

    /**
     * function to render the component.
     */
    render() {
        const { reportFav01, reportFav03, reportFav12, reportIjl } = this.state;

        if (!reportFav01 || !reportFav03 || !reportFav12 || !reportIjl) {
            return 'some error occurred';
        }

        const { joined_users: joinedUsers, left_users: leftUsers, invited_users: invitedUsers } = reportIjl;

        const joinedUsersData = {};
        const leftUsersData = {};
        const invitedUsersData = {};
        const months = [...Array(13).keys()];
        months.shift();
        months.forEach(month => {
            joinedUsersData[month] = { month, count: 0 };
            leftUsersData[month] = { month, count: 0 };
            invitedUsersData[month] = { month, count: 0 };
        });
        joinedUsers.forEach(x => {
            const month = parseInt(moment(x.month).format('MM'));
            joinedUsersData[month] = { month, count: x.count };
        });
        leftUsers.forEach(x => {
            const month = parseInt(moment(x.month).format('MM'));
            leftUsersData[month] = { month, count: x.count };
        });
        invitedUsers.forEach(x => {
            const month = parseInt(moment(x.month).format('MM'));
            invitedUsersData[month] = { month, count: x.count };
        });

        const lineData = {
            labels: months.map(month => moment(month, 'MM').format('MMMM')),
            datasets: [
                this.getLineDataset(months, joinedUsersData, 'joined users'),
                this.getLineDataset(months, leftUsersData, 'left users'),
                this.getLineDataset(months, invitedUsersData, 'invited users'),
            ],
        };

        const doughnutData01 = this.getDoughnutData(reportFav01);
        const doughnutData03 = this.getDoughnutData(reportFav03);
        const doughnutData12 = this.getDoughnutData(reportFav12);

        const containerId = 'company-report';

        return (
            <Container>
                <Container id={containerId}>
                    <ReportField
                        name="Joined, Left, Invited Employees (Past 12 Months)"
                        value={<Line data={lineData} width={100} height={30} />}
                    />
                    <ReportField
                        name="Top 10 Favourite Employees (past 1 month)"
                        value={<Doughnut data={doughnutData01} height={100} />}
                    />
                    <ReportField
                        name="Top 10 Favourite Employees (past 3 months)"
                        value={<Doughnut data={doughnutData03} height={100} />}
                    />
                    <ReportField
                        name="Top 10 Favourite Employees (past 12 months)"
                        value={<Doughnut data={doughnutData12} height={100} />}
                    />
                </Container>
                <Row className="d-flex justify-content-center">
                    <button type="button" className="btn btn-info mr-3 mb-3" onClick={() => saveToPNG(containerId)}>
                        Download Report
                    </button>
                </Row>
            </Container>
        );
    }
}

Reports.propTypes = {};

Reports.defaultProps = {};

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
)(Reports);
