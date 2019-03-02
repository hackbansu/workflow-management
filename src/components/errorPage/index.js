import React from 'react';
import { Link } from 'react-router-dom';
import ApiConstants from 'constants/api';
import PropTypes from 'prop-types';

export default function ErrorComponent({ errMsg }) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>{errMsg}</h2>
                        <div className="error-details">Sorry, an error has occured, Requested page not found!</div>
                        <div className="error-actions">
                            <Link to={ApiConstants.HOME_PAGE} className="btn btn-info btn-lg">
                                <span className="fa fa-home mr-3" />
                                <span>Take Me Home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ErrorComponent.propTypes = {
    errMsg: PropTypes.string,
};
ErrorComponent.defaultProps = {
    errMsg: '',
};
