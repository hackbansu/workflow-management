import { makeApiRequest } from 'services/base';
import ApiConstants from 'constants/api';

const workflowTemplateApiUrls = ApiConstants.api.template;

/**
 * Utility function to send the fetch employees request to the server.
 */
export function makeFetchAllRequest() {
    return makeApiRequest(workflowTemplateApiUrls.FETCH_ALL, 'GET');
}
