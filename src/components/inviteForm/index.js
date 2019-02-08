import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

import FormField from 'components/formField';
import FormSubmitButton from 'components/formSubmitButton';

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
            email: null,
            firstName: null,
            lastName: null,
            isAdmin: false,
            designation: null,
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
    submitForm = (email, firstName, lastName, designation) => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();
        onSubmit(email, firstName, lastName, designation);
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { email, firstName, lastName, isAdmin, designation } = this.state;

        return (
            <div>
                <form method="post" onSubmit={this.submitForm(email, firstName, lastName, designation)}>
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
                    {/* isAdmin */}
                    <FormField
                        name="Admin"
                        inputName="isAdmin"
                        type="checkbox"
                        onChange={e => this.setState({ isAdmin: e.target.value })}
                        disabled="disabled"
                        checked={isAdmin ? 'checked' : ''}
                    />
                    {/* update profile button */}
                    <FormSubmitButton name="Update" />
                </form>
            </div>
        );
    }
}

InviteForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

InviteForm.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InviteForm);
