import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { makeSignupRequest } from 'services/auth';
import { showModal } from 'utils/helpers/modal';
import ApiConstants from 'constants/api';

// importing components
import SignupForm from 'components/signupForm';
import PageBanner from 'components/pageBanner';
import LinkButton from 'components/linkButton';

/**
 * Login page component.
 */
export class Signup extends React.Component {
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
    onSubmit = (
        firstName,
        lastName,
        email,
        designation,
        companyName,
        companyAddress,
    ) => {
        const { history } = this.props;

        // dispatch action to show loader
        showLoader(true);

        const data = {
            user: {
                first_name: firstName,
                last_name: lastName,
                email,
            },
            company: {
                name: companyName,
                address: companyAddress,
            },
            designation,
        };

        // call the service function
        makeSignupRequest(data).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            document.getElementsByClassName('signup-form').reset();

            const { response, body } = obj;
            if (response.status !== 201) {
                showModal('Signup Failed', 'Signup request failed');
                return;
            }

            showModal('Signup Successful', 'Confirmation link has been sent to your email.');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        return (
            <div className="container entry-form-container">
                <PageBanner text="Sign Up" />
                <SignupForm onSubmit={this.onSubmit} />
                <ul className="nav justify-content-center page-nav-links">
                    <LinkButton name="Back to login" className="btn-link" toUrl={ApiConstants.LOGIN_PAGE} />
                </ul>
            </div>
        );
    }
}

Signup.propTypes = {
    history: PropTypes.object.isRequired,
};

Signup.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
