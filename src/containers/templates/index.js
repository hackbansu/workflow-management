import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import _ from 'lodash';

import './index.scss';

import { errorParser } from 'utils/helpers/errorHandler';
import { updateTemplatesAction } from 'actions/templates';
import { makeFetchAllRequest } from 'services/templates';
import userConstants from 'constants/user';
import ApiConstants from 'constants/api';
import { showToast } from 'utils/helpers/toast';

import Card from 'components/card';

/**
 * Login page component.
 */
export class Templates extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const { updateTemplates } = this.props;

        makeFetchAllRequest().then(obj => {
            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                const errorMsg = errorParser(response, 'Employees update failed');
                showToast(errorMsg);
                return;
            }

            const data = _.keyBy(body, 'id');

            // dispatch action to update templates
            updateTemplates(data);
        });
    }

    /**
     * function to render the component.
     */
    render() {
        const { templates, redirectPage } = this.props;
        return Object.values(templates).map(template => (
            <Card
                name={template.name}
                description={`number of tasks: ${template.structure.tasks.length}`}
                buttonText="Create Workflow"
                buttonOnClick={() => redirectPage(`${ApiConstants.NEW_WORKFLOW_PAGE}/${template.id}`)}
                imgUrl={template.logo}
                classes="m-3"
                isVisible
                key={template.id}
            />
        ));
    }
}

Templates.propTypes = {
    templates: PropTypes.object,
    updateTemplates: PropTypes.func.isRequired,
    redirectPage: PropTypes.func.isRequired,
};

Templates.defaultProps = {
    templates: {},
};

const mapStateToProps = state => ({
    templates: state.templates,
});

const mapDispatchToProps = dispatch => ({
    updateTemplates: (...args) => dispatch(updateTemplatesAction(...args)),
    redirectPage: url => dispatch(push(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Templates);
