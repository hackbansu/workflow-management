import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from 'components/formField';
import FormSubmitButton from 'components/formSubmitButton';

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
            password: null,
            firstName,
            lastName,
            isAdmin,
            designation,
            status,
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
    submitForm = (password, firstName, lastName) => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();
        onSubmit(password, firstName, lastName);
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { email, password, firstName, lastName, isAdmin, designation, status } = this.state;

        return (
            <div>
                <form method="post" onSubmit={this.submitForm(password, firstName, lastName)}>
                    {/* email */}
                    <FormField
                        name="Email"
                        inputName="email"
                        type="email"
                        placeholder="eg. user@example.com"
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                        disabled="disabled"
                    />
                    {/* password */}
                    <FormField
                        name="Password"
                        inputName="password"
                        type="password"
                        placeholder=""
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    {/* first name */}
                    <FormField
                        name="First Name"
                        inputName="firstName"
                        type="text"
                        placeholder="eg. nitin"
                        value={firstName}
                        onChange={e => this.setState({ firstName: e.target.value })}
                    />
                    {/* last name */}
                    <FormField
                        name="Last Name"
                        inputName="lastName"
                        type="text"
                        placeholder="eg. singh"
                        value={lastName}
                        onChange={e => this.setState({ lastName: e.target.value })}
                    />
                    {/* designation */}
                    <FormField
                        name="Designation"
                        inputName="designation"
                        type="text"
                        placeholder="eg. CEO"
                        value={designation}
                        onChange={e => this.setState({ designation: e.target.value })}
                        disabled="disabled"
                    />
                    {/* status */}
                    <FormField
                        name="Status"
                        inputName="status"
                        type="number"
                        placeholder="eg. active"
                        value={status.toString()}
                        onChange={e => this.setState({ status: e.target.value })}
                        disabled="disabled"
                    />
                    {/* isAdmin */}
                    <FormField
                        name="Admin"
                        inputName="isAdmin"
                        type="checkbox"
                        onChange={e => this.setState({ isAdmin: e.target.value })}
                        disabled="disabled"
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
                </form>
            </div>
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
