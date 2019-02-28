import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import 'react-confirm-alert/src/react-confirm-alert.css';
import './index.scss';

/**
 * Class component for workflow report form
 */
export class ReportField extends React.Component {
    /**
     * Function to return the component rendering.
     */
    render() {
        const { name, value, redirectUrl, isList } = this.props;
        return (
            <Card className="mb-3 ml-5 mr-5">
                <Card.Header className="bg-dark text-white">{name}</Card.Header>
                {!isList ? (
                    <LinkContainer to={redirectUrl} className={redirectUrl === '#' ? '' : 'text-primary'}>
                        <Card.Body>
                            <Card.Text>{value}</Card.Text>
                        </Card.Body>
                    </LinkContainer>
                ) : (
                    <ListGroup variant="flush">
                        {value.map(val => (
                            <LinkContainer to={val.url} className={val.url === '#' ? '' : 'text-primary'}>
                                <ListGroup.Item>{val.value}</ListGroup.Item>
                            </LinkContainer>
                        ))}
                    </ListGroup>
                )}
            </Card>
        );
    }
}

ReportField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    redirectUrl: PropTypes.string,
    isList: PropTypes.bool,
};

ReportField.defaultProps = {
    redirectUrl: '#',
    isList: false,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportField);
