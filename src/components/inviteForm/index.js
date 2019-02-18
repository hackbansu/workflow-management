import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from 'components/formField';
import UploadField from 'components/uploadField';
import FormSubmitButton from 'components/formSubmitButton';
import { validateEmail, validateTextString, validateInviteCsvFile } from 'utils/validators';
import constants from 'constants/index.js';

/**
 * Class component for login form
 */
export class InviteForm extends React.Component {
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
            csvFile: null,
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
    submitForm = (email, firstName, lastName, designation, csvFile) => ev => {
        const { onSubmit, onCsvFileSubmit } = this.props;
        ev.preventDefault();

        let valid = true;
        const newErrors = {};

        if (!csvFile) {
            const emailValidity = validateEmail(email);
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

            if (!emailValidity.isValid) {
                valid = false;
                newErrors.email = emailValidity.message;
            }

            if (!designationValidity.isValid) {
                valid = false;
                newErrors.designation = designationValidity.message;
            }
        } else {
            const csvFileValidity = validateInviteCsvFile(csvFile);

            if (!csvFileValidity.isValid) {
                valid = false;
                newErrors.csvFile = csvFileValidity.message;
            }
        }

        if (!valid) {
            this.setState({
                errors: newErrors,
            });
            return;
        }

        if (csvFile) {
            onCsvFileSubmit(csvFile);
        } else {
            onSubmit(email, firstName, lastName, designation);
        }
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { email, firstName, lastName, designation, errors, csvFile } = this.state;

        return (
            <div>
                <form method="post" onSubmit={this.submitForm(email, firstName, lastName, designation, csvFile)}>
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
                    {/* email */}
                    <FormField
                        name="Email"
                        inputName="email"
                        type="email"
                        placeholder="eg. user@example.com"
                        value={email}
                        onChange={e => {
                            const { value } = e.target;
                            return this.setState(prevState => ({
                                email: value,
                                errors: { ...prevState.errors, email: validateEmail(value).message },
                            }));
                        }}
                        errorMsg={errors.email}
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
                    {/* CSV file */}
                    <UploadField
                        name="CSV File"
                        inputName="csvFile"
                        type="file"
                        accept={constants.INVITE_FILE_TYPES}
                        onChange={e => this.setState({ csvFile: e.target.files[0] })}
                        errorMsg={errors.csvFile}
                        fileName={csvFile ? csvFile.name : 'No file selected'}
                    />
                    {/* send invite button */}
                    <FormSubmitButton name="Invite" />
                </form>
            </div>
        );
    }
}

InviteForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCsvFileSubmit: PropTypes.func.isRequired,
};

InviteForm.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InviteForm);
