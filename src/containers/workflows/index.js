import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import ApiConstants from 'constants/api';

import { showLoader } from 'utils/helpers/loader';
import { makeCreateCompanyRequest } from 'services/user';
import { showModal } from 'utils/helpers/modal';


/*
This module is not implemented yet, exclude it from review.
*/

/**
 * Login page component.
 */
export class Workflows extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * function to render the component.
     */
    render() {
        return (
            <div className="container col-12">
                <Link to={ApiConstants.TEMPLATES_PAGE}>
                    <button type="button" className="btn btn-primary">
                        New Workflow
                    </button>
                </Link>
            </div>
        );
    }
}

Workflows.propTypes = {};

Workflows.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Workflows);
