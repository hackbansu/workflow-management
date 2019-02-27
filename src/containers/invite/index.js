import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { makeInviteRequest, makeCsvInviteRequest } from 'services/employees';
import { showLoader } from 'utils/helpers/loader';
import { toast } from 'react-toastify';
import { showModal } from 'utils/helpers/modal';
import { errorParser } from 'utils/helpers/errorHandler';

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
        this.onCsvFileSubmit = this.onCsvFileSubmit.bind(this);
    }

    /**
     * function to submit invite request.
     */
    onSubmit = (email, firstName, lastName, designation) => {
        const { history } = this.props;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeInviteRequest(email, firstName, lastName, designation).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }
            const { response, body } = obj;

            if (response.status !== 200) {
                const errorMsg = errorParser(body);
                toast.error(errorMsg);
                return;
            }

            toast.info('Invite Sent');
        });
    };

    onCsvFileSubmit = (csvFile) => {
        const { history } = this.props;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeCsvInviteRequest(csvFile).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                const errorMsg = errorParser(body);
                toast.success(errorMsg);
                return;
            }

            showModal('Success', 'Invitation will be sent and status will be mailed.');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        return (
            <div className="profile-page">
                <div className="container">
                    <InviteForm onSubmit={this.onSubmit} onCsvFileSubmit={this.onCsvFileSubmit} />
                </div>
            </div>
        );
    }
}

Invite.propTypes = {
    history: PropTypes.object.isRequired,
};

Invite.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Invite);
