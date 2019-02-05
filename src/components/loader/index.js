import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

/**
 * Functional component of the loader.
 * @param {object} param0 - props object for the component.
 */
export const Loader = ({ loaderClass }) => {
    loaderClass += ' loader-cover';
    return (
        <div className={loaderClass}>
            <div className="loader" />
        </div>
    );
};

Loader.propTypes = {
    loaderClass: PropTypes.string,
};

Loader.defaultProps = {
    loaderClass: 'invisible',
};

export default Loader;
