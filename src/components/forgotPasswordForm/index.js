import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

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
            email: null,
        };

        this.submitForm = this.submitForm.bind(this);
    }

    /**
     * Function to submit the login form.
     * @param {string} email - email entered by the user.
     */
    submitForm = (email) => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();
        onSubmit(email);
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { email } = this.state;

        return (
            <div className="forgot-password-form-cover">
                <form method="post" onSubmit={this.submitForm(email)}>
                    <label>
                        email:
                        <input
                            type="email"
                            name="email"
                            placeholder="eg. user@example.com"
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                    </label>
                    <input type="submit" value="Send" />
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
