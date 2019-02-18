import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Functional component of the loader.
 * @param {object} param0 - props object for the component.
 */
export const FormSubmitButton = ({ name, hide }) => (
    <div className={'form-group' + (hide ? ' hide' : '')}>
        <button type="submit" className="btn btn-primary">
            {name}
        </button>
    </div>
);

FormSubmitButton.propTypes = {
    name: PropTypes.string.isRequired,
    hide: PropTypes.bool,
};

FormSubmitButton.defaultProps = {
    hide: false,
};

export default FormSubmitButton;
