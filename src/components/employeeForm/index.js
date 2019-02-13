import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from 'components/formField';
import FormSubmitButton from 'components/formSubmitButton';
import userConstants from 'constants/user';
import { validateTextString } from 'utils/validators';

/**
 * Class component for login form
 */
export class EmployeeForm extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        const { email, firstName, lastName, isAdmin, designation, status } = this.props;
        this.state = {
            email,
            firstName,
            lastName,
            isAdmin,
            designation,
            status,
            errors: {},
        };

        this.submitForm = this.submitForm.bind(this);
    }

    /**
     * Function to submit the login form.
     * @param {string} email - email of the user.
     * @param {string} password - password entered by the user.
     * @param {string} firstName - first name of the user.
     * @param {string} lastName - last name of the user.
     */
    submitForm = (firstName, lastName, designation, isAdmin) => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();

        let valid = true;
        const newErrors = {};

        // validations
        const firstNameValidity = validateTextString(firstName);
        const lastNameValidity = validateTextString(lastName);
        const designationValidity = validateTextString(designation);

        if (!firstNameValidity.isValid) {
            valid = false;
            newErrors.firstName = firstNameValidity.message;
        }

        if (!lastNameValidity.isValid) {
            valid = false;
            newErrors.lastName = lastNameValidity.message;
        }

        if (!designationValidity.isValid) {
            valid = false;
            newErrors.designation = designationValidity.message;
        }

        if (!valid) {
            this.setState({
                errors: newErrors,
            });
            return;
        }

        onSubmit(firstName, lastName, designation, isAdmin);
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { isUserAdmin } = this.props;
        const { email, password, firstName, lastName, isAdmin, designation, status, errors } = this.state;

        return (
            <div>
                <form method="post" onSubmit={this.submitForm(firstName, lastName, designation, isAdmin)}>
                    <fieldset disabled={!isUserAdmin ? 'disabled' : ''}>
                        {/* email */}
                        <FormField
                            name="Email"
                            inputName="email"
                            type="email"
                            placeholder="eg. user@example.com"
                            value={email}
                            disabled="disabled"
                        />
                        {/* first name */}
                        <FormField
                            name="First Name"
                            inputName="firstName"
                            type="text"
                            placeholder="eg. nitin"
                            value={firstName}
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
                            placeholder="eg. singh"
                            value={lastName}
                            onChange={e => {
                                const { value } = e.target;
                                return this.setState(prevState => ({
                                    lastName: value,
                                    errors: { ...prevState.errors, lastName: validateTextString(value).message },
                                }));
                            }}
                            errorMsg={errors.lastName}
                        />
                        {/* designation */}
                        <FormField
                            name="Designation"
                            inputName="designation"
                            type="text"
                            placeholder="eg. CEO"
                            value={designation}
                            onChange={e => {
                                const { value } = e.target;
                                return this.setState(prevState => ({
                                    designation: value,
                                    errors: { ...prevState.errors, designation: validateTextString(value).message },
                                }));
                            }}
                            errorMsg={errors.designation}
                        />
                        {/* status */}
                        <FormField
                            name="Status"
                            inputName="status"
                            type="text"
                            placeholder="eg. active"
                            value={userConstants.STATUS[status]}
                            disabled="disabled"
                        />
                        {/* isAdmin */}
                        <FormField
                            name="Admin"
                            inputName="isAdmin"
                            type="checkbox"
                            onChange={e => this.setState({ isAdmin: e.target.checked })}
                            checked={isAdmin ? 'checked' : ''}
                        />
                        {/* profile photo */}
                        {/* <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Upload</span>
                        </div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile01" />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                Choose file
                            </label>
                        </div>
                    </div> */}
                        {/* update profile button */}
                        <FormSubmitButton name="Update" />
                    </fieldset>
                </form>
            </div>
        );
    }
}

EmployeeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    designation: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    isUserAdmin: PropTypes.bool,
};

EmployeeForm.defaultProps = {
    isAdmin: false,
    isUserAdmin: false,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeForm);
