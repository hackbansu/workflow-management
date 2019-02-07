import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

/**
 * Functional component of the loader.
 * @param {object} param0 - props object for the component.
 */
export const FormField = ({ name, inputName, type, placeholder, value, onChange, disabled }) => {
    const id = inputName + '3';
    return (
        <div className="form-group row">
            <label htmlFor={id} className="col-sm-2 col-form-label">
                {name}
            </label>
            <div className="col-sm-10">
                <input
                    value={value}
                    placeholder={placeholder}
                    type={type}
                    name={inputName}
                    className="form-control"
                    id={id}
                    onChange={onChange}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
};

FormField.defaultProps = {
    value: null,
    disabled: '',
};

export default FormField;
