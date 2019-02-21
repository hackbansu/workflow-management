import moment from 'moment';

import { makeApiRequest } from 'services/base';
import ApiConst from 'constants/api';
import TaskConstant from 'constants/task';

const { task } = ApiConst.api;

export function makefetchAllTasks() {
    // return makeApiRequest(task.FETCH);
    // Mocking the response
    return Promise.resolve({
        response: {
            ok: true,
        },
        body: [
            {
                id: '1',
                title: 'task 1',
                start_at: String(moment()),
                description: 'task description',
                parent_task: 0,
                status: TaskConstant.STATUS.UPCOMMING,

            },
            {
                id: '2',
                title: 'task 2',
                start_at: String(moment()),
                description: 'task description',
                parent_task: 0,
                status: TaskConstant.STATUS.ONGOING,
            },
            {
                id: '3',
                title: 'task 3',
                start_at: String(moment()),
                description: 'task description',
                parent_task: 0,
                status: TaskConstant.STATUS.COMPLETE,
            },
        ],
    });
}
