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
        return await makeApiRequest(`${report.WORKFLOW}${workflowId}/`);
    } catch (e) {
        return Promise.reject(e);
    } finally {
        showLoader(false);
    }
}

export async function getEmployeeReport(employeeId) {
    showLoader(true);
    try {
        return await makeApiRequest(`${report.EMPLOYEE}${employeeId}/`);
    } catch (e) {
        return Promise.reject(e);
    } finally {
        showLoader(false);
    }
}

export async function getFavouriteEmployeesReport(months) {
    showLoader(true);
    try {
        return await makeApiRequest(`${report.FAVOURITE_EMPLOYEES}${months}/`);
    } catch (e) {
        return Promise.reject(e);
    } finally {
        showLoader(false);
    }
}

export async function getIJLEmployeesReport() {
    showLoader(true);
    try {
        return await makeApiRequest(report.IJL_EMPLOYEE);
    } catch (e) {
        return Promise.reject(e);
    } finally {
        showLoader(false);
    }
}
