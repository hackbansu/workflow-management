import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './index.scss';

/**
 * Functional component of the sidebar field.
 * @param {object} param0 - props object for the component.
 */
export const WorkflowTemplateCard = ({ name, description, buttonText, buttonOnClick, imgUrl, isVisible }) => {
    if (!isVisible) {
        return (<></>);
    }
    return (
        <Col md lg="3" sm xs="6">
            <Card className="card-custom">
                <Card.Img variant="top" src={imgUrl} alt="Card thumbnail" />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Button variant="primary" onClick={buttonOnClick}>{buttonText}</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

WorkflowTemplateCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    buttonOnClick: PropTypes.func.isRequired,
    imgUrl: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
};

WorkflowTemplateCard.defaultProps = {
    isVisible: true,
};

export default WorkflowTemplateCard;
