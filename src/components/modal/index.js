import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Functional component of the message modal.
 * @param {object} param0 - props object for the component.
 */
export const Modal = ({ heading, text }) => (
    <div>
        <button
            type="button"
            className="btn btn-info btn-lg modal-open-button"
            data-toggle="modal"
            data-target="#myModal"
        >
            Open Modal
        </button>
        <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{heading}</h4>
                        <button type="button" className="close" data-dismiss="modal">
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{text}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

Modal.propTypes = {
    text: PropTypes.string.isRequired,
};

Modal.defaultProps = {};

export default Modal;
