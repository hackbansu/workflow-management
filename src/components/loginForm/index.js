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
            email: null,
            password: null,
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

        if (!validateEmail(email)) {
            this.setState({
                errors: {
                    email: 'invalid email',
                },
            });
            return;
        }

        if (!validatePassword(password)) {
            this.setState({
                errors: {
                    password: 'invalid password',
                },
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
                <form className="offset-md-4 col-md-4" method="post" onSubmit={this.submitForm(email, password)}>
                    {/* email */}
                    <FormField
                        name="Email"
                        inputName="email"
                        type="email"
                        placeholder=""
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                        errorMsg={errors.email}
                    />
                    {/* password */}
                    <FormField
                        name="Password"
                        inputName="password"
                        value={null}
                        type="password"
                        placeholder=""
                        onChange={e => this.setState({ password: e.target.value })}
                        errorMsg={errors.password}
                    />
                    {/* update profile button */}
                    <FormSubmitButton name="Log In" />
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
