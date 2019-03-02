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
            {text.split('\n').map(val => {
                val = val.trim();
                if (val) {
                    return <Modal.Body key={`${Math.random()}-modal`}>{val}</Modal.Body>;
                }
                return '';
            })}
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
