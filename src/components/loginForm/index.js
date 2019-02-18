import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from 'components/formField';
import FormSubmitButton from 'components/formSubmitButton';
import { validateEmail, validatePassword } from 'utils/validators';

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
            password: '',
            errors: {},
        };

        this.submitForm = this.submitForm.bind(this);
    }

    /**
     * Function to submit the login form.
     * @param {string} email - email entered by the user.
     * @param {string} password - password entered by the user.
     */
    submitForm = (email, password) => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();
        let valid = true;
        const newErrors = {};

        const emailValidity = validateEmail(email);
        const passwordValidity = validatePassword(password);

        if (!emailValidity.isValid) {
            valid = false;
            newErrors.email = emailValidity.message;
        }

        if (!passwordValidity.isValid) {
            valid = false;
            newErrors.password = passwordValidity.message;
        }

        if (!valid) {
            this.setState({
                errors: newErrors,
            });
            return;
        }

        this.setState({
            errors: {},
        });

        onSubmit(email, password);
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { email, password, errors } = this.state;

        return (
            <div className="container">
                <form className="offset-md-2 col-md-7" method="post" onSubmit={this.submitForm(email, password)}>
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
                        autoComplete="email"
                    />
                    {/* password */}
                    <FormField
                        name="Password"
                        inputName="password"
                        value={password}
                        type="password"
                        placeholder=""
                        onChange={e => {
                            const { value } = e.target;
                            return this.setState(prevState => ({
                                password: value,
                                errors: { ...prevState.errors, password: validatePassword(value).message },
                            }));
                        }}
                        errorMsg={errors.password}
                        autoComplete="current-password"
                    />
                    {/* update profile button */}
                    <div className="row justify-content-center">
                        <FormSubmitButton name="Log In" />
                    </div>
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
