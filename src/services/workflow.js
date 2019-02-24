import moment from 'moment';

import { makeApiRequest } from 'services/base';
import ApiConst from 'constants/api';
import TaskConstant from 'constants/task';

const { task, workflow } = ApiConst.api;

export function makefetchAllTasks() {
    return makeApiRequest(task.FETCH);
}

export function makeCreateWorkflow(data) {
    return makeApiRequest(workflow.FETCH, 'POST', data);
}

export function makeFetchAllWorkflow() {
    return makeApiRequest(workflow.FETCH, 'GET');
}
