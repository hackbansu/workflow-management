import moment from 'moment';

import { makeApiRequest } from 'services/base';
import ApiConst from 'constants/api';
import TaskConstant from 'constants/task';

const { task } = ApiConst.api;

export function makefetchAllTasks() {
    return makeApiRequest(task.FETCH);
}
