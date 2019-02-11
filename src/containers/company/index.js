import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { showToast } from 'utils/helpers/toast';
import { updateProfileAction, updateCompanyAction } from 'actions/user';
import { makeUpdateRequest, makeFetchRequest } from 'services/company';

// importing components
import CompanyForm from 'components/companyForm';

/**
 * Login page component.
 */
export class Company extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        const { currentUser, updateProfile, updateCompany } = this.props;
        const { id: userId, firstName, lastName, profilePhoto, email } = currentUser;

        makeFetchRequest().then(obj => {
            if (!obj) {
                return;
            }

            const { response, body } = obj;
            const { id: companyId, name, address, city, state, logo, status, links } = body.company;
            const { is_admin: isAdmin, designation, status: userStatus } = body;

            // dispatch action to update employees
            updateCompany(companyId, name, address, city, state, logo, status, links);

            // dispatch action to update user data in store
            updateProfile(firstName, lastName, profilePhoto, email, userId, isAdmin, designation, userStatus);
        });
    }

    /**
     * function to submit update company request.
     */
    onSubmit = (address, city, state, links, logo) => {
        const { updateCompany, history, currentUser } = this.props;
        const { id: companyId, name, status } = currentUser.company;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeUpdateRequest(address, city, state, links, logo, companyId).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            showToast('Update Successful');

            const { response, body } = obj;
            const { address, city, state, links, logo } = body;

            // dispatch action to update company data in store
            updateCompany(companyId, name, address, city, state, logo, status, links);

            // redirect to home page
            history.push('/');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        const { currentUser } = this.props;
        const { isAdmin, company } = currentUser;
        const { name, address, city, state, status, links } = company;

        return (
            <div className="profile-page">
                <div className="container">
                    <CompanyForm
                        onSubmit={this.onSubmit}
                        name={name}
                        address={address}
                        city={city}
                        state={state}
                        status={status}
                        links={links}
                        isAdmin={isAdmin}
                    />
                </div>
            </div>
        );
    }
}

Company.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
};

Company.defaultProps = {};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
    updateProfile: (...args) => dispatch(updateProfileAction(...args)),
    updateCompany: (...args) => dispatch(updateCompanyAction(...args)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Company);
