import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

import ApiConstants from 'constants/api';
import ErrorComponent from 'components/errorPage';

import './index.scss';

/**
 * Not Found Component.
 */
export class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '404 Not Found',
        };
    }

    componentWillMount() {
        const { match } = this.props;
        let { errorNumber } = match.params;
        errorNumber = parseInt(errorNumber);
        let errorMsg = '';

        if (errorNumber === 404) {
            errorMsg = '404 Not Found';
        } else if (errorNumber === 403) {
            errorMsg = '403 UNAUTHORIZED';
        } else if (errorNumber >= 500) {
            errorMsg = `${errorNumber} Internal Server Error`;
        } else {
            errorMsg = `${errorNumber}`;
        }

        this.setState({
            errorMsg,
        });
    }

    render() {
        const { errorMsg } = this.state;

        return <ErrorComponent errMsg={errorMsg} />;
    }
}

ErrorPage.propTypes = {
    match: PropTypes.object.isRequired,
};

ErrorPage.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    redirect: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorPage);
