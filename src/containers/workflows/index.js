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

export class Workflows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    createWorkFlowButton() {
        const { currentUser } = this.props;
        if (currentUser.isAdmin) {
            return (
                <Link to={ApiConstants.TEMPLATES_PAGE}>
                    <button type="button" className="btn btn-primary">
                        New Workflow
                    </button>
                </Link>
            );
        }
        return (<></>);
    }

    render() {
        return (
            <div className="container col-12">
                {this.createWorkFlowButton()}
            </div>
        );
    }
}

Workflows.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

Workflows.defaultProps = {};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Workflows);
