import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Functional component of the loader.
 * @param {object} param0 - props object for the component.
 */
export const FormField = ({ name, inputName, type, placeholder, value, onChange, disabled, errorMsg, ...rest }) => {
    const id = inputName + '3';
    return (
        <div className="form-group row">
            <label htmlFor={id} className="col-sm-3 col-form-label">
                {name}
            </label>
            <div className="col-sm-9">
                <input
                    id={id}
                    className="form-control"
                    type={type}
                    name={inputName}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...rest}
                />
                <span className="error-msg">{errorMsg}</span>
            </div>
        </div>
    );
};

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
};

FormField.defaultProps = {
    placeholder: '',
    value: '',
    disabled: '',
};

export default FormField;
