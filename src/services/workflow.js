import moment from 'moment';
import _ from 'lodash';
import ApiConst from 'constants/api';
import TaskConstant from 'constants/task';

import { updateWorkflowsAction } from 'actions/workflow';
import { makeApiRequest } from 'services/base';
import { showLoader } from 'utils/helpers/loader';
import { errorParser } from 'utils/helpers/errorHandler';
import { showToast } from 'utils/helpers/toast';
import { parseWorkflow } from 'utils/helpers';
import store from '../store';

const { task, workflow } = ApiConst.api;

function updateWorkflows(...args) {
    return store.dispatch(updateWorkflowsAction(...args));
}

export function makefetchAllTasks() {
    return makeApiRequest(task.FETCH);
}

export function makeCreateWorkflow(data) {
    return makeApiRequest(workflow.FETCH, 'POST', data);
}

export function makeFetchAllWorkflow() {
    return makeApiRequest(workflow.FETCH, 'GET');
}

export function makeFetchWorkflow(wfId) {
    return makeApiRequest(`${workflow.FETCH}${wfId}/`, 'GET');
}

export function getAllWorkflows() {
    showLoader(true);
    return makeFetchAllWorkflow()
        .then(obj => {
            if (!obj) {
                return Promise.reject();
            }
            const { response } = obj;
            let { body } = obj;
            if (response.status !== 200) {
                const errMsg = errorParser(body);
                showToast(errMsg);
                return Promise.reject();
            }
            body = parseWorkflow(body);
            const workflows = _.keyBy(body, 'id');
            return updateWorkflows(workflows);
        })
        .finally(() => {
            showLoader(false);
        });
}
