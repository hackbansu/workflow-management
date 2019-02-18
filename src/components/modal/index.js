import React from 'react';
import { hideModal } from 'utils/helpers/modal';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ModalComponent({ heading, text, showModal }) {
    return (
        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{text}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={hideModal}>
                Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
ModalComponent.propTypes = {
    text: PropTypes.string.isRequired,
    heading: PropTypes.string,
    showModal: PropTypes.bool,
};

ModalComponent.defaultProps = {
    heading: 'Information',
    showModal: false,
};

export default ModalComponent;
