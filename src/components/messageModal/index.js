import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Functional component of the message modal.
 * @param {object} param0 - props object for the component.
 */
export const MessageModal = ({ text, show }) => {
    let modalClass = 'modal fade';
    if (show) {
        modalClass += ' in';
    }

    return (
        <div id="myModal" className={modalClass} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">
                            &times;
                        </button>
                        <h4 className="modal-title">Message</h4>
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
    );
};

MessageModal.propTypes = {
    text: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
};

MessageModal.defaultProps = {};

export default MessageModal;
