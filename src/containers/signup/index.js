import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { changeLoaderStateAction } from 'actions/common';
import { updateTokenAction, updateProfileAction, updateCompanyAction } from 'actions/user';
import { makeSignupRequest } from 'services/auth';
import './index.scss';

// importing components
import SignupForm from 'components/signupForm';
import PageBanner from 'components/pageBanner';
import Loader from 'components/loader';

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
        const { changeLoaderState, updateToken, updateProfile, updateCompany, history } = this.props;

        // dispatch action to show loader
        changeLoaderState('visible');

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
            changeLoaderState('invisible');

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            const { company, user, designation, status, is_admin: isAdmin } = body;

            const { token, id, first_name: firstName, last_name: lastName, profile_photo: profilePhoto, email } = user;
            // save token to local storage
            localStorage.setItem('token', token);

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
        const { loaderClass } = this.props;
        return (
            <div className="signup-page">
                <div className="container">
                    <PageBanner text="Sign Up" />
                    <SignupForm onSubmit={this.onSubmit} />
                    <Loader loaderClass={loaderClass} />
                </div>
            </div>
        );
    }
}

Signup.propTypes = {
    loaderClass: PropTypes.string,
    changeLoaderState: PropTypes.func.isRequired,
    updateToken: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

Signup.defaultProps = {
    loaderClass: 'invisible',
};

const mapStateToProps = state => ({
    loaderClass: state.loader.class,
});

const mapDispatchToProps = dispatch => ({
    changeLoaderState: value => dispatch(changeLoaderStateAction(value)),
    updateToken: value => dispatch(updateTokenAction(value)),
    updateProfile: (...args) => dispatch(updateProfileAction(...args)),
    updateCompany: (...args) => dispatch(updateCompanyAction(...args)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
