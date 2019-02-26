import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from 'components/formField';
import UploadField from 'components/uploadField';
import FormSubmitButton from 'components/formSubmitButton';
import userConstants from 'constants/user';
import { validateTextString, validateProfilePic } from 'utils/validators';
import constants from 'constants/index.js';

/**
 * Class component for login form
 */
export class ProfileForm extends React.Component {
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
            profilePhoto: null,
            errors: {},
        };

        this.submitForm = this.submitForm.bind(this);
    }

    /**
     * Function to submit the profile update form.
     * @param {string} profilePhoto - profile photo of the user.
     * @param {string} firstName - first name of the user.
     * @param {string} lastName - last name of the user.
     */
    submitForm = (firstName, lastName, profilePhoto) => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();
        let valid = true;
        const newErrors = {};

        // validations
        const firstNameValidity = validateTextString(firstName);
        const lastNameValidity = validateTextString(lastName);
        const profilePhotoValidity = validateProfilePic(profilePhoto);

        if (!firstNameValidity.isValid) {
            valid = false;
            newErrors.firstName = firstNameValidity.message;
        }

        if (!lastNameValidity.isValid) {
            valid = false;
            newErrors.lastName = lastNameValidity.message;
        }

        if (!profilePhotoValidity.isValid) {
            valid = false;
            newErrors.profilePhoto = profilePhotoValidity.message;
        }

        if (!valid) {
            this.setState({
                errors: newErrors,
            });
            return;
        }

        onSubmit(firstName, lastName, profilePhoto);
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { email, firstName, lastName, isAdmin, designation, status, profilePhoto, errors } = this.state;

        return (
            <form method="post" onSubmit={this.submitForm(firstName, lastName, profilePhoto)}>
                <fieldset>
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
                        disabled="disabled"
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
                        disabled="disabled"
                        checked={isAdmin ? 'checked' : ''}
                    />
                    {/* profile photo */}
                    <UploadField
                        name="Profile Picture"
                        inputName="profilePhoto"
                        type="file"
                        accept={constants.PROFILE_PIC_TYPES}
                        onChange={e => this.setState({ profilePhoto: e.target.files[0] })}
                        errorMsg={errors.profilePhoto}
                        fileName={profilePhoto ? profilePhoto.name : 'No file selected'}
                    />
                    {/* update profile button */}
                    <FormSubmitButton name="Update" />
                </fieldset>
            </form>
        );
    }
}

ProfileForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    designation: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
};

ProfileForm.defaultProps = {
    isAdmin: false,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileForm);
