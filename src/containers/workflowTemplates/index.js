import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import React from 'react';
import _ from 'lodash';
import { Row } from 'react-bootstrap';

import './index.scss';

import { errorParser } from 'utils/helpers/errorHandler';
import { updateTemplatesAction } from 'actions/templates';
import { makeFetchAllTemplatesRequest } from 'services/templates';
import ApiConstants from 'constants/api';
import { toast } from 'react-toastify';

import TemplateCard from 'components/workflowTemplateCard';


export class Templates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.templates.bind(this);
    }

    componentWillMount() {
        const { updateTemplates } = this.props;

        makeFetchAllTemplatesRequest().then(obj => {
            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                const errorMsg = errorParser(response, 'Employees update failed');
                toast.error(errorMsg);
                return;
            }

            const data = _.keyBy(body, 'id');

            // dispatch action to update templates
            updateTemplates(data);
        });
    }

    templates() {
        const { templates, redirectPage } = this.props;
        return Object.values(templates).map(template => (
            <TemplateCard
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

    render() {
        return (
            <Row>{this.templates()}</Row>
        );
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
