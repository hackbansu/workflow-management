import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Functional component of the loader.
 * @param {object} param0 - props object for the component.
 */
export const UploadField = ({ name, inputName, type, onChange, disabled, ...rest }) => {
    const id = inputName + '3';
    return (
        <div className="input-group mb-3 col-md-8">
            <div className="input-group-prepend">
                <span className="input-group-text">{name}</span>
            </div>
            <div className="custom-file">
                <input
                    id="inputGroupFile01"
                    className="custom-file-input"
                    name={inputName}
                    type={type}
                    onChange={onChange}
                    disabled={disabled}
                    {...rest}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                    Choose file
                </label>
            </div>
        </div>
    );
};

UploadField.propTypes = {
    name: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
};

UploadField.defaultProps = {
    placeholder: '',
    value: '',
    disabled: '',
};

export default UploadField;
