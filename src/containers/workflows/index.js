import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import _ from 'lodash';
import ApiConstants from 'constants/api';
import taskConstants from 'constants/task';

import { getAllWorkflows } from 'services/workflow';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { parseDateTime } from 'utils/helpers';

export class Workflows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.createWorkFlowButton = this.createWorkFlowButton.bind(this);
    }

    componentWillMount() {
        getAllWorkflows();
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

    render() {
        const { workflows } = this.props;
        return (
            <Container>
                <Row>
                    {this.createWorkFlowButton()}
                </Row>
                <Row className="pt-2">
                    {Object.keys(workflows).map(wfid => (
                        <LinkContainer key={`${Math.random()}-workflow`} to={`${ApiConstants.WORKFLOW_PAGE}/${wfid}`}>
                            <Col md lg xl={4} className="mb-2">
                                <Card key={`${Math.random()}-wf`}>
                                    <Card.Body className="p-2">
                                        <Card.Title>{workflows[wfid].name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {parseDateTime(workflows[wfid].startAt)}
                                        </Card.Subtitle>
                                        <ListGroup>
                                            {workflows[wfid].tasks.map(task => (
                                                <ListGroup.Item
                                                    key={`${Math.random()}-task`}
                                                    variant={this.taskClass(task.status)}
                                                >
                                                    <h3 className="m-0">{task.title}</h3>
                                                    <div>
                                                        <small>{taskConstants.STATUS[task.status]}</small> 
                                                    </div>
                                                    <p className="m-0">{task.description}</p>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </Container>
        );
    }
}

Workflows.propTypes = {
    currentUser: PropTypes.object.isRequired,
    workflows: PropTypes.object.isRequired,
};

Workflows.defaultProps = {};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    workflows: state.workflows,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Workflows);
