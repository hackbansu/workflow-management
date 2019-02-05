import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
        };

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm = (email, password) => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();
        onSubmit(email, password);
    };

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

LoginForm.propTypes = {};

LoginForm.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
