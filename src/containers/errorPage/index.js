import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

import ApiConstants from 'constants/api';

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

    componentDidMount() {
        const { match, redirect } = this.props;
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
            redirect(ApiConstants.NOT_FOUND_PAGE);
            return;
        }

        this.setState({
            errorMsg,
        });
    }

    render() {
        const { errorMsg } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>Oops!</h1>
                            <h2>{errorMsg}</h2>
                            <div className="error-details">Sorry, an error has occured, Requested page not found!</div>
                            <div className="error-actions">
                                <Link to={ApiConstants.HOME_PAGE} className="btn btn-info btn-lg">
                                    <span className="fa fa-home mr-3" />
                                    Take Me Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ErrorPage.propTypes = {
    match: PropTypes.object.isRequired,
    redirect: PropTypes.func.isRequired,
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
