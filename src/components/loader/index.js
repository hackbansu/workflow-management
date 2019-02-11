import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

/**
 * Functional component of the loader.
 * @param {object} param0 - props object for the component.
 */
export const Loader = ({ show }) => {
    let loaderClass = 'loader-cover';
    if (show) {
        loaderClass += ' visible';
    } else {
        loaderClass += ' invisible';
    }

    return (
        <div className={loaderClass}>
            <div className="loader" />
        </div>
    );
};

Loader.propTypes = {
    show: PropTypes.bool.isRequired,
};

Loader.defaultProps = {};

export default Loader;
