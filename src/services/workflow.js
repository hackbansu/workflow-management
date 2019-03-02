import moment from 'moment';
import _ from 'lodash';
import ApiConst from 'constants/api';
import TaskConstant from 'constants/task';

import { updateWorkflowsAction, updateWorkflowAction } from 'actions/workflow';
import { updateCompleteTasks, updateOngoingTasks, updateUpcommingTasks } from 'actions/tasks';
import { makeApiRequest } from 'services/base';
import { showLoader } from 'utils/helpers/loader';
import { errorParser } from 'utils/helpers/errorHandler';
import { toast } from 'react-toastify';
import { parseWorkflow, formatTasks, apiTaskFormCouple } from 'utils/helpers';
import { push } from 'connected-react-router';

import store from '../store';

const { task, workflow } = ApiConst.api;

function updateWorkflows(...args) {
    return store.dispatch(updateWorkflowsAction(...args));
}

function updateWorkflow(...args) {
    return store.dispatch(updateWorkflowAction(...args));
}

function updateTasks(tasks) {
    const { upcomming, ongoing, complete } = tasks;
    store.dispatch(updateCompleteTasks(complete));
    store.dispatch(updateUpcommingTasks(upcomming));
    store.dispatch(updateOngoingTasks(ongoing));
}

function redirect(url) {
    return store.dispatch(push(url));
}

export function makefetchAllTasks() {
    return makeApiRequest(task.FETCH, 'GET');
}

export function makeFetchTaskRequest(taskId) {
    return makeApiRequest(`${task.FETCH}${taskId}/`);
}

export function makeUpdateTask(taskId, data) {
    return makeApiRequest(`${task.FETCH}${taskId}/`, 'PATCH', data);
}

export function makeTaskComplete(taskId) {
    return makeApiRequest(`${task.FETCH}${taskId}/completed/`, 'PATCH');
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
export function makeUpdateWorflow(wfId, data) {
    return makeApiRequest(`${workflow.FETCH}${wfId}/`, 'PATCH', data);
}

export function makeUpdatePermissions(wfId, data) {
    return makeApiRequest(`${workflow.FETCH}${wfId}/accessor/`, 'POST', data);
}

export function makeFetchWorkflowPermissions(wfId) {
    return makeApiRequest(`${workflow.FETCH}${wfId}/accessor/all/`, 'GET');
}

export function makeFetchWorkflowHistory(wfId) {
    return makeApiRequest(`${workflow.FETCH}${wfId}/history/`, 'GET');
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

export async function getAllTasks() {
    showLoader(true);
    try {
        const { response, body } = await makefetchAllTasks();
        if (!response.ok) {
            return;
        }
        const tasks = formatTasks(body);
        updateTasks(tasks);
    } finally {
        showLoader(false);
    }
}

export async function getWorkflow(wfid) {
    showLoader(true);
    try {
        const obj = await makeFetchWorkflow(wfid);
        const { response } = obj;
        let { body } = obj;
        if (response.status === 404) {
            redirect(ApiConst.DASHBOARD_PAGE);
        }
        if (!response.ok) {
            const errMsg = errorParser(body);
            toast.error(errMsg);
            return Promise.reject();
        }
        body = parseWorkflow(body);
        const workflows = {};
        workflows[body.id] = body;
        updateWorkflow(workflows);
        return body;
    } catch (e) {
        return Promise.reject(e);
    } finally {
        showLoader(false);
    }
}

export async function getTask(taskId) {
    showLoader(true);
    try {
        const { response, body } = await makeFetchTaskRequest(taskId);
        if (!response.ok) {
            const errMsg = errorParser(body);
            toast.error(errMsg);
            return Promise.reject();
        }
        const task = {};
        task[body.id] = apiTaskFormCouple(body);
        /*
        * UPCOMMING: 1
        * SCHEDULED: 2
        * ONGOING: 3
        * COMPLETE: 4
        */
        switch (task[body.id].status) {
        case TaskConstant.STATUS.UPCOMMING:
        case TaskConstant.STATUS.SCHEDULED:
            store.dispatch(updateUpcommingTasks(task));
            break;
        case TaskConstant.STATUS.ONGOING:
            store.dispatch(updateOngoingTasks(task));
            break;
        case TaskConstant.STATUS.COMPLETE:
            store.dispatch(updateCompleteTasks(task));
            break;
        default:
            break;
        }
        return task[body.id];
    } catch (e) {
        return Promise.reject(e);
    } finally {
        showLoader(false);
    }
}
