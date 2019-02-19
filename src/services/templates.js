import { makeApiRequest } from 'services/base';
import ApiConstants from 'constants/api';

const workflowTemplateApiUrls = ApiConstants.api.template;

/**
 * Utility function to send the fetch employees request to the server.
 */
export function makeFetchAllTemplatesRequest() {
    return makeApiRequest(workflowTemplateApiUrls.FETCH, 'GET');
}

export function makeFetchTemplate(templateId) {
    return makeApiRequest(`${workflowTemplateApiUrls.FETCH}${templateId}/`, 'GET');
}
