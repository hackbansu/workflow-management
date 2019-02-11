import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { updateTokenAction, updateProfileAction, updateCompanyAction } from 'actions/user';
import { makeSignupRequest } from 'services/auth';

// importing components
import SignupForm from 'components/signupForm';
import PageBanner from 'components/pageBanner';

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
        email,
        password,
        firstName,
        lastName,
        designation,
        companyName,
        companyAddress,
        companyCity,
        companyState
    ) => {
        const { updateToken, updateProfile, updateCompany, history } = this.props;

        // dispatch action to show loader
        showLoader(true);

        const data = {
            user: {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            },
            company: {
                name: companyName,
                address: companyAddress,
                city: companyCity,
                state: companyState,
            },
            designation,
        };

        // call the service function
        makeSignupRequest(data).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            const { company, user, designation, status, is_admin: isAdmin } = body;

            const { token, id, first_name: firstName, last_name: lastName, profile_photo: profilePhoto, email } = user;

            // dispatch action to update user token and data
            updateToken(token);
            updateProfile(firstName, lastName, profilePhoto, email, id, isAdmin, designation, status);

            const { name, address, city, state, id: companyId, logo, status: companyStatus, links } = company;
            // dispatch action to update company information
            updateCompany(companyId, name, address, city, state, logo, companyStatus, links);

            // redirect to home page
            history.push('/');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        return (
            <div className="signup-page">
                <div className="container">
                    <PageBanner text="Sign Up" />
                    <SignupForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

Signup.propTypes = {
    updateToken: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

Signup.defaultProps = {
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    updateToken: value => dispatch(updateTokenAction(value)),
    updateProfile: (...args) => dispatch(updateProfileAction(...args)),
    updateCompany: (...args) => dispatch(updateCompanyAction(...args)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
