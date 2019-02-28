import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Table } from 'react-bootstrap';
import { push } from 'connected-react-router';

import { makeFetchWorkflowHistory } from 'services/workflow';
import { errorParser } from 'utils/helpers/errorHandler';
import { toast } from 'react-toastify';
import { showLoader } from 'utils/helpers/loader';

export class WorkflowsHistory extends React.Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        const { id: workflowId } = match.params;
        this.workflowId = workflowId;
        this.constrainStartDateTime = moment();
        this.state = {
            histories: [],
        };
    }

    async componentWillMount() {
        showLoader(true);
        try {
            const res = await makeFetchWorkflowHistory(this.workflowId);
            const { response, body } = res;
            if (!response.ok) {
                const errMsg = errorParser(body, 'failed to fetch history');
                toast.error(errMsg);
                return;
            }
            this.setState({ histories: body });
        } catch (err) {
            const errMsg = errorParser(err, 'something went wrong while fetching history');
            toast.error(errMsg);
        } finally {
            showLoader(false);
        }
    }

    render() {
        const { histories } = this.state;
        return (
            <Container>
                <h2>History</h2>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Identifier </th>
                            <th>Action</th>
                            <th>Field Name</th>
                            <th>Previous Value</th>
                            <th>Current Value</th>
                            <th>On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {histories.map(history => (
                            <tr>
                                <td>{history.content_object}</td>
                                <td>{history.action}</td>
                                <td>{history.field_name}</td>
                                <td>{history.prev_value}</td>
                                <td>{history.next_value}</td>
                                <td>{moment(history.created).format('YYYY:MM:DD HH:MM')}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

WorkflowsHistory.propTypes = {
    match: PropTypes.object.isRequired,
};

WorkflowsHistory.defaultProps = {};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
    redirect: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkflowsHistory);
