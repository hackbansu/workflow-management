import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { changeLoaderStateAction } from 'actions/common';
import { updateProfileAction } from 'actions/user';
import { makeInviteRequest } from 'services/employees';
import { showToast } from 'utils/helpers/toast';
import './index.scss';

// importing components
import InviteForm from 'components/inviteForm';

/**
 * Login page component.
 */
export class Invite extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * function to submit login request.
     */
    onSubmit = (email, firstName, lastName, designation) => {
        const { changeLoaderState, history } = this.props;

        // dispatch action to show loader
        changeLoaderState('visible');

        // call the service function
        makeInviteRequest(email, firstName, lastName, designation).then(obj => {
            changeLoaderState('invisible');

            if (!obj) {
                return;
            }

            showToast('Invite Sent');

            history.push('/');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        return (
            <div className="profile-page">
                <div className="container">
                    <InviteForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

Invite.propTypes = {
    changeLoaderState: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

Invite.defaultProps = {};

const mapStateToProps = state => ({
    loaderClass: state.loader.class,
});

const mapDispatchToProps = dispatch => ({
    changeLoaderState: value => dispatch(changeLoaderStateAction(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Invite);
