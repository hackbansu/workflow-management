import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { validatePassword } from 'utils/validators';

// importing components
import FormField from 'components/formField';
import FormSubmitButton from 'components/formSubmitButton';

/**
 * Class component for login form
 */
export class ResetPasswordForm extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            errors: {},
        };

        this.submitForm = this.submitForm.bind(this);
    }

    /**
     * Function to submit the login form.
     * @param {string} email - email entered by the user.
     * @param {string} password - password entered by the user.
     */
    submitForm = (password, confirmPassword) => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();

        let valid = true;
        const newErrors = {};

        // validations
        const passwordValidity = validatePassword(password);

        if (!passwordValidity.isValid) {
            valid = false;
            newErrors.password = passwordValidity.message;
        }

        if (password !== confirmPassword) {
            valid = false;
            newErrors.confirmPassword = 'Confirm password does not match';
        }

        if (!valid) {
            this.setState({
                errors: newErrors,
            });
            return;
        }

        onSubmit(password, confirmPassword);
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { password, confirmPassword, errors } = this.state;
        const { isDisabled } = this.props;

        return (
            <div className="container">
                <form
                    className="offset-md-3 col-md-6"
                    method="post"
                    onSubmit={this.submitForm(password, confirmPassword)}
                >
                    <fieldset disabled={isDisabled ? 'disabled' : ''}>
                        {/* Password */}
                        <FormField
                            name="Password"
                            inputName="password"
                            type="password"
                            placeholder=""
                            value={password}
                            onChange={e => {
                                const { value } = e.target;
                                return this.setState(prevState => ({
                                    password: value,
                                    errors: { ...prevState.errors, password: validatePassword(value).message },
                                }));
                            }}
                            errorMsg={errors.password}
                        />
                        {/* confirm Password */}
                        <FormField
                            name="Confirm Password"
                            inputName="confirmPassword"
                            type="password"
                            placeholder=""
                            value={confirmPassword}
                            onChange={e => {
                                const { value } = e.target;
                                return this.setState(prevState => ({
                                    confirmPassword: value,
                                    errors: { ...prevState.errors, confirmPassword: validatePassword(value).message },
                                }));
                            }}
                            errorMsg={errors.confirmPassword}
                        />
                        {/* update profile button */}
                        <FormSubmitButton name="Reset" />
                    </fieldset>
                </form>
            </div>
        );
    }
}

ResetPasswordForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
};

ResetPasswordForm.defaultProps = {
    isDisabled: true,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordForm);
