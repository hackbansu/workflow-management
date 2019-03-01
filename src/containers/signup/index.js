import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { errorParser } from 'utils/helpers/errorHandler';
import { push } from 'connected-react-router';
import { showLoader } from 'utils/helpers/loader';
import { makeSignupRequest } from 'services/auth';
import { showModal } from 'utils/helpers/modal';
import ApiConstants from 'constants/api';

// importing components
import SignupForm from 'components/signupForm';
import PageBanner from 'components/pageBanner';
import LinkButton from 'components/linkButton';
import { toast } from 'react-toastify';

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
        const { redirect } = this.props;
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
        return makeSignupRequest(data)
            .then(obj => {
                if (!obj) {
                    return;
                }

                const { response, body } = obj;
                if (response.status !== 201) {
                    const errMsg = errorParser(body, 'Signup request failed');
                    showModal('Signup Failed', errMsg);
                    return;
                }
                showModal('Signup Successful', 'Confirmation link has been sent to your email.');
                redirect('/');
            })
            .catch((err) => {
                const errMsg = errorParser(err, 'Signup error occur');
                toast.error(errMsg);
            })
            .finally(() => {
                showLoader(false);
            });
    };

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
    redirect: PropTypes.func.isRequired,
};

Signup.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    redirect: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
