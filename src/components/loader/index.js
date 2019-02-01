import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

export default class Loader extends React.Component {
    render() {
        let { loaderClass } = this.props;
        loaderClass += ' loader-cover';
        return (
            <div className={loaderClass}>
                <div className="loader" />
            </div>
        );
    }
}

Loader.propTypes = {
    loaderClass: PropTypes.string,
};

Loader.defaultProps = {
    loaderClass: 'invisible',
};
