import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

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
            password: null,
            confirmPassword: null,
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
        onSubmit(password, confirmPassword);
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { password, confirmPassword } = this.state;
        const { isDisabled } = this.props;

        return (
            <div className="login-form-cover">
                <form method="post" onSubmit={this.submitForm(password, confirmPassword)}>
                    <fieldset disabled={isDisabled ? 'disabled' : ''}>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                placeholder=""
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                        </label>
                        <label>
                            Confirm Password:
                            <input
                                type="confirmPassword"
                                name="confirmPassword"
                                placeholder=""
                                onChange={e => this.setState({ confirmPassword: e.target.value })}
                            />
                        </label>
                        <input type="submit" value="Reset" />
                    </fieldset>
                </form>
            </div>
        );
    }
}

ResetPasswordForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

ResetPasswordForm.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordForm);
