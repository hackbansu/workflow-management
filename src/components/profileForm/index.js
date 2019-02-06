import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

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
        const { email, firstName, lastName } = this.props;
        this.state = {
            email,
            password: null,
            firstName,
            lastName,
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
        const { email, password, firstName, lastName } = this.state;

        return (
            <div>
                <form method="post" onSubmit={this.submitForm(password, firstName, lastName)}>
                    {/* email */}
                    <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                            Email
                        </label>
                        <div className="col-sm-10">
                            <input
                                value={email}
                                disabled
                                type="email"
                                name="email"
                                className="form-control"
                                id="inputEmail3"
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* password */}
                    <div className="form-group row">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="inputPassword3"
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* first name */}
                    <div className="form-group row">
                        <label htmlFor="inputFName3" className="col-sm-2 col-form-label">
                            First Name
                        </label>
                        <div className="col-sm-10">
                            <input
                                value={firstName}
                                type="text"
                                name="firstName"
                                className="form-control"
                                id="inputFName3"
                                onChange={e => this.setState({ firstName: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* last name */}
                    <div className="form-group row">
                        <label htmlFor="inputLName3" className="col-sm-2 col-form-label">
                            Last Name
                        </label>
                        <div className="col-sm-10">
                            <input
                                value={lastName}
                                type="text"
                                name="lastName"
                                className="form-control"
                                id="inputLName3"
                                onChange={e => this.setState({ lastName: e.target.value })}
                            />
                        </div>
                    </div>
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
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </div>
                    </div>
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
};

ProfileForm.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileForm);
