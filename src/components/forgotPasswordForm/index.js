import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from 'components/formField';
import FormSubmitButton from 'components/formSubmitButton';

import { validateEmail } from 'utils/validators';

/**
 * Class component for login form
 */
export class ForgotPasswordForm extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {},
        };

        this.submitForm = this.submitForm.bind(this);
    }

    /**
     * Function to submit the login form.
     * @param {string} email - email entered by the user.
     */
    submitForm = email => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();
        let valid = true;
        const newErrors = {};

        const emailValidity = validateEmail(email);

        if (!emailValidity.isValid) {
            valid = false;
            newErrors.email = emailValidity.message;
        }

        if (!valid) {
            this.setState({
                errors: newErrors,
            });
            return;
        }

        onSubmit(email);

        this.setState({
            email: '',
        });
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { email, errors } = this.state;

        return (
            <div className="container">
                <form className="offset-md-4 col-md-4" method="post" onSubmit={this.submitForm(email)}>
                    <div className="alert alert-dark" role="alert">
                        Password reset link will be sent to your email.
                    </div>
                    {/* email */}
                    <FormField
                        name="Email"
                        inputName="email"
                        type="email"
                        placeholder=""
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
                    {/* update profile button */}
                    <FormSubmitButton name="Send" />
                </form>
            </div>
        );
    }
}

ForgotPasswordForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

ForgotPasswordForm.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordForm);
