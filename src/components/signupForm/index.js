import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from 'components/formField';
import FormSubmitButton from 'components/formSubmitButton';

import './index.scss';

/**
 * Class component for login form
 */
export class LoginForm extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {};

        this.submitForm = this.submitForm.bind(this);
    }

    /**
     * Function to submit the login form.
     * @param {string} email - email entered by the user.
     * @param {string} password - password entered by the user.
     */
    submitForm = (
        email,
        password,
        firstName,
        lastName,
        designation,
        companyName,
        companyAddress,
        companyCity,
        companyState
    ) => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();
        onSubmit(
            email,
            password,
            firstName,
            lastName,
            designation,
            companyName,
            companyAddress,
            companyCity,
            companyState
        );
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const {
            email,
            password,
            firstName,
            lastName,
            designation,
            companyName,
            companyAddress,
            companyCity,
            companyState,
        } = this.state;

        return (
            <div className="signup-form-cover">
                <form
                    method="post"
                    onSubmit={this.submitForm(
                        email,
                        password,
                        firstName,
                        lastName,
                        designation,
                        companyName,
                        companyAddress,
                        companyCity,
                        companyState
                    )}
                >
                    {/* email */}
                    <FormField
                        name="Email"
                        inputName="email"
                        type="email"
                        placeholder="eg. user@example.com"
                        value={null}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    {/* password */}
                    <FormField
                        name="Password"
                        inputName="password"
                        type="password"
                        placeholder=""
                        value={null}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    {/* first name */}
                    <FormField
                        name="First Name"
                        inputName="firstName"
                        type="text"
                        placeholder="eg. nitin"
                        value={null}
                        onChange={e => this.setState({ firstName: e.target.value })}
                    />
                    {/* last name */}
                    <FormField
                        name="Last Name"
                        inputName="lastName"
                        type="text"
                        placeholder="eg. singh"
                        value={null}
                        onChange={e => this.setState({ lastName: e.target.value })}
                    />
                    {/* Designation */}
                    <FormField
                        name="Designation"
                        inputName="designation"
                        type="text"
                        placeholder="eg. CEO"
                        value={null}
                        onChange={e => this.setState({ designation: e.target.value })}
                    />
                    {/* company name */}
                    <FormField
                        name="Company Name"
                        inputName="companyName"
                        type="text"
                        placeholder="eg. ABC"
                        value={null}
                        onChange={e => this.setState({ companyName: e.target.value })}
                    />
                    {/* company address */}
                    <FormField
                        name="Company Address"
                        inputName="companyAddress"
                        type="text"
                        placeholder="eg. Gurgaon"
                        value={null}
                        onChange={e => this.setState({ companyAddress: e.target.value })}
                    />
                    {/* company city */}
                    <FormField
                        name="Company City"
                        inputName="companyCity"
                        type="text"
                        placeholder="eg. New Delhi"
                        value={null}
                        onChange={e => this.setState({ companyCity: e.target.value })}
                    />
                    {/* company state */}
                    <FormField
                        name="Company State"
                        inputName="companyState"
                        type="text"
                        placeholder="eg. Delhi"
                        value={null}
                        onChange={e => this.setState({ companyState: e.target.value })}
                    />
                    {/* Submit profile button */}
                    <FormSubmitButton name="Submit" />
                </form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
