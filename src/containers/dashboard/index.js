import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';

import { updateCompleteTasks, updateOngoingTasks, updateUpcommingTasks } from 'actions/tasks';
import { errorParser } from 'utils/helpers/errorHandler';
import { makefetchAllTasks } from 'services/workflow';
import { showToast } from 'utils/helpers/toast';
import { formatTasks, getRandomBorder } from 'utils/helpers';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const { updateTasks } = this.props;
        makefetchAllTasks().then(({ response, body }) => {
            if (!response.ok) {
                const errMsg = errorParser(body);
                showToast(errMsg);
                return;
            }
            const tasks = formatTasks(body);
            updateTasks(tasks);
        });
    }

    renderCard(tasks) {
        // TODO:add link to go to the respective task detail
        tasks = tasks || {};
        return Object.keys(tasks).map(taskId => {
            const task = tasks[taskId];
            return (
                <Card key={`${Math.random()}-#-card`} className="mt-2">
                    <Card.Header className="clearfix">
                        <h4 className="float-left">
                            {task.title}
                        </h4>
                        <div className="float-right">
                            <small>
                                {'Task id : '}
                            </small>
                            <small>
                                {task.id}
                            </small>
                        </div>
                    </Card.Header>
                    <ListGroup>
                        <ListGroup.Item>
                            {tasks[taskId].description}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            );
        });
    }

    renderTask(task, heading) {
        return (
            <Col className="px-0 mx-1">
                <Row>
                    <h2>{heading}</h2>
                </Row>
                <Col className={`border ${getRandomBorder()} px-0`}>
                    {this.renderCard(task)}
                </Col>
            </Col>
        );
    }

    render() {
        const { tasks } = this.props;
        const { upcomming, ongoing, complete } = tasks;
        return (
            <Row className="mt-2">
                {this.renderTask(upcomming, 'UPCOMMING')}
                {this.renderTask(ongoing, 'ONGOING')}
                {this.renderTask(complete, 'COMPLETE')}
            </Row>
        );
    }
}

DashBoard.propTypes = {
    updateTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
    updateTasks: (tasks) => {
        const { upcomming, ongoing, complete } = tasks;
        dispatch(updateCompleteTasks(complete));
        dispatch(updateUpcommingTasks(upcomming));
        dispatch(updateOngoingTasks(ongoing));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard);
