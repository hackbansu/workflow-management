import _ from 'lodash';
import ApiConst from 'constants/api';

import { makeApiRequest } from 'services/base';
import { showLoader } from 'utils/helpers/loader';
import { push } from 'connected-react-router';

import store from '../store';

const { report } = ApiConst.api;

function redirect(url) {
    return store.dispatch(push(url));
}

export async function getWorkflowReport(workflowId) {
    showLoader(true);
    try {
        const { response, body } = await makeApiRequest(`${report.WORKFLOW}${workflowId}/`);
        if (!response.ok) {
            redirect(ApiConst.DASHBOARD_PAGE);
        }
        return { response, body };
    } catch (e) {
        return Promise.reject(e);
    } finally {
        showLoader(false);
    }
}

export async function getEmployeeReport(employeeId) {
    showLoader(true);
    try {
        const { response, body } = await makeApiRequest(`${report.EMPLOYEE}${employeeId}/`);
        if (!response.ok) {
            redirect(ApiConst.DASHBOARD_PAGE);
        }
        return { response, body };
    } catch (e) {
        return Promise.reject(e);
    } finally {
        showLoader(false);
    }
}
