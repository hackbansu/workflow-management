import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

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
        onSubmit(email, password);
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { email, password } = this.state;

        return (
            <div className="login-form-cover">
                <form method="post" onSubmit={this.submitForm(email, password)}>
                    <label>
                        email:
                        <input
                            type="email"
                            name="email"
                            placeholder="eg. user@example.com"
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        password:
                        <input
                            type="password"
                            name="password"
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </label>
                    <br />
                    <input type="submit" value="log in" />
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
