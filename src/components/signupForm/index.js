import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from 'components/formField';
import FormSubmitButton from 'components/formSubmitButton';
import { validateEmail, validateTextString } from 'utils/validators';

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
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            designation: '',
            companyName: '',
            companyAddress: '',
            errors: {},
        };

        this.submitForm = this.submitForm.bind(this);
    }

    /**
     * Function to submit the login form.
     * @param {string} email - email entered by the user.
     * @param {string} password - password entered by the user.
     */
    submitForm = (firstName, lastName, email, designation, companyName, companyAddress) => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();
        let valid = true;
        const newErrors = {};

        // validations
        const firstNameValidity = validateTextString(firstName);
        const lastNameValidity = validateTextString(lastName);
        const emailValidity = validateEmail(email);
        const designationValidity = validateTextString(designation);
        const companyNameValidity = validateTextString(companyName);
        const companyAddressValidity = validateTextString(companyAddress);

        if (!firstNameValidity.isValid) {
            valid = false;
            newErrors.firstName = firstNameValidity.message;
        }

        if (!lastNameValidity.isValid) {
            valid = false;
            newErrors.lastName = lastNameValidity.message;
        }

        if (!emailValidity.isValid) {
            valid = false;
            newErrors.email = emailValidity.message;
        }

        if (!designationValidity.isValid) {
            valid = false;
            newErrors.designation = designationValidity.message;
        }

        if (!companyNameValidity.isValid) {
            valid = false;
            newErrors.companyName = companyNameValidity.message;
        }

        if (!companyAddressValidity.isValid) {
            valid = false;
            newErrors.companyAddress = companyAddressValidity.message;
        }

        if (!valid) {
            this.setState({
                errors: newErrors,
            });
            return;
        }

        onSubmit(firstName, lastName, email, designation, companyName, companyAddress);
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { firstName, lastName, email, designation, companyName, companyAddress, errors } = this.state;

        return (
            <div className="offset-md-1 col-md-10">
                <form
                    className="signup-form"
                    method="post"
                    onSubmit={this.submitForm(firstName, lastName, email, designation, companyName, companyAddress)}
                >
                    {/* first name */}
                    <FormField
                        name="First Name"
                        inputName="firstName"
                        type="text"
                        value={null}
                        onChange={e => {
                            const { value } = e.target;
                            return this.setState(prevState => ({
                                firstName: value,
                                errors: { ...prevState.errors, firstName: validateTextString(value).message },
                            }));
                        }}
                        errorMsg={errors.firstName}
                    />
                    {/* last name */}
                    <FormField
                        name="Last Name"
                        inputName="lastName"
                        type="text"
                        value={null}
                        onChange={e => {
                            const { value } = e.target;
                            return this.setState(prevState => ({
                                lastName: value,
                                errors: { ...prevState.errors, lastName: validateTextString(value).message },
                            }));
                        }}
                        errorMsg={errors.lastName}
                    />
                    {/* email */}
                    <FormField
                        name="Email"
                        inputName="email"
                        type="email"
                        value={null}
                        onChange={e => {
                            const { value } = e.target;
                            return this.setState(prevState => ({
                                email: value,
                                errors: { ...prevState.errors, email: validateEmail(value).message },
                            }));
                        }}
                        errorMsg={errors.email}
                    />
                    {/* Designation */}
                    <FormField
                        name="Designation"
                        inputName="designation"
                        type="text"
                        value={null}
                        onChange={e => {
                            const { value } = e.target;
                            return this.setState(prevState => ({
                                designation: value,
                                errors: { ...prevState.errors, designation: validateTextString(value).message },
                            }));
                        }}
                        errorMsg={errors.designation}
                    />
                    {/* company name */}
                    <FormField
                        name="Company Name"
                        inputName="companyName"
                        type="text"
                        value={null}
                        onChange={e => {
                            const { value } = e.target;
                            return this.setState(prevState => ({
                                companyName: value,
                                errors: { ...prevState.errors, companyName: validateTextString(value).message },
                            }));
                        }}
                        errorMsg={errors.companyName}
                    />
                    {/* company address */}
                    <FormField
                        name="Company Address"
                        inputName="companyAddress"
                        type="text"
                        value={null}
                        onChange={e => {
                            const { value } = e.target;
                            return this.setState(prevState => ({
                                companyAddress: value,
                                errors: { ...prevState.errors, companyAddress: validateTextString(value).message },
                            }));
                        }}
                        errorMsg={errors.companyAddress}
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
