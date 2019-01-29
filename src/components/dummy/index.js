import React from 'react'
import PropTypes from 'prop-types';

export default class Dummy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <p className="card-text">{this.props.data_1}</p>
        )
    }
}

Dummy.propTypes = {
    data_1: PropTypes.number,
}

Dummy.defaultProps = {
};