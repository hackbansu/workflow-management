import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from 'components/formField';
import UploadField from 'components/uploadField';
import FormSubmitButton from 'components/formSubmitButton';
import { validateTextString, validateLogo } from 'utils/validators';
import constants from 'constants/index.js';

/**
 * Class component for login form
 */
export class CompanyForm extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        const { name, address, city, state, status, links } = this.props;

        const linksObj = {};
        for (const link of links) {
            linksObj[link.link_type] = link.url;
        }

        this.state = { name, address, city, state, status, linksObj, logo: null, errors: {} };

        this.submitForm = this.submitForm.bind(this);
    }

    /**
     * Function to submit the company form.
     * @param {string} address - address of the compnay.
     * @param {string} city - city of the company.
     * @param {string} state - state of the company.
     * @param {string} links - links of the company.
     */
    submitForm = (address, city, state, linksObj, logo) => ev => {
        const { onSubmit } = this.props;
        ev.preventDefault();
        let valid = true;
        const newErrors = {};

        // validations
        const addressValidity = validateTextString(address);
        const cityValidity = validateTextString(city);
        const stateValidity = validateTextString(state);
        const logoValidity = validateLogo(logo);

        if (!addressValidity.isValid) {
            valid = false;
            newErrors.address = addressValidity.message;
        }

        if (!cityValidity.isValid) {
            valid = false;
            newErrors.city = cityValidity.message;
        }

        if (!stateValidity.isValid) {
            valid = false;
            newErrors.state = stateValidity.message;
        }

        if (!logoValidity.isValid) {
            valid = false;
            newErrors.logo = logoValidity.message;
        }

        if (!valid) {
            this.setState({
                errors: newErrors,
            });
            return;
        }

        const links = [];

        Object.entries(linksObj).forEach(([linkType, url]) => {
            links.push({ link_type: linkType, url });
        });

        onSubmit(address, city, state, links, logo);
    };

    /**
     * Function to return the component rendering.
     */
    render() {
        const { name, address, city, state, status, linksObj, logo, errors } = this.state;
        const { isAdmin } = this.props;

        return (
            <div>
                <form method="post" onSubmit={this.submitForm(address, city, state, linksObj, logo)}>
                    <fieldset disabled={!isAdmin ? 'disabled' : ''}>
                        {/* name */}
                        <FormField
                            name="Name"
                            inputName="name"
                            type="text"
                            placeholder="eg. ABC"
                            value={name}
                            disabled="disabled"
                        />
                        {/* address */}
                        <FormField
                            name="Address"
                            inputName="address"
                            type="text"
                            placeholder="eg. Gurgaon"
                            value={address}
                            onChange={e => {
                                const { value } = e.target;
                                return this.setState(prevState => ({
                                    address: value,
                                    errors: { ...prevState.errors, address: validateTextString(value).message },
                                }));
                            }}
                            errorMsg={errors.address}
                        />
                        {/* city */}
                        <FormField
                            name="City"
                            inputName="city"
                            type="text"
                            placeholder="eg. New Delhi"
                            value={city}
                            onChange={e => {
                                const { value } = e.target;
                                return this.setState(prevState => ({
                                    city: value,
                                    errors: { ...prevState.errors, city: validateTextString(value).message },
                                }));
                            }}
                            errorMsg={errors.city}
                        />
                        {/* state */}
                        <FormField
                            name="State"
                            inputName="state"
                            type="text"
                            placeholder="eg. Delhi"
                            value={state}
                            onChange={e => {
                                const { value } = e.target;
                                return this.setState(prevState => ({
                                    state: value,
                                    errors: { ...prevState.errors, state: validateTextString(value).message },
                                }));
                            }}
                            errorMsg={errors.state}
                        />
                        {/* status */}
                        <FormField
                            name="Status"
                            inputName="status"
                            type="text"
                            placeholder="eg. user@example.com"
                            value={status}
                            disabled="disabled"
                        />
                        {/* links */}
                        {Object.entries(linksObj).map(([linkType, url]) => (
                            <FormField
                                name={linkType}
                                inputName={linkType}
                                type="text"
                                placeholder="eg. https://github.com/abc"
                                value={url}
                                onChange={e => {
                                    const stateUpdate = { linksObj: {} };
                                    stateUpdate.linksObj[linkType] = e.target.value;
                                    this.setState(stateUpdate);
                                }}
                                key={linkType}
                            />
                        ))}
                        {/* logo */}
                        <UploadField
                            name="Company Logo"
                            inputName="logo"
                            type="file"
                            accept={constants.COMPANY_LOGO_PIC_TYPES}
                            onChange={e => this.setState({ logo: e.target.files[0] })}
                            errorMsg={errors.logo}
                            fileName={logo ? logo.name : 'No file selected'}
                        />
                        {/* update company button */}
                        <FormSubmitButton name="Update" />
                    </fieldset>
                </form>
            </div>
        );
    }
}

CompanyForm.propTypes = {
    isAdmin: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired,
};

CompanyForm.defaultProps = {
    isAdmin: false,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyForm);
