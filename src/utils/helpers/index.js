import _ from 'lodash';

import ApiConstants from 'constants/api';
import TaskConstants from 'constants/task';
import { isAbsoluteUrl } from 'constants/index.js';
import moment from 'moment';

export function parseEmployeeData(emp) {
    const { first_name: firstName, last_name: lastName, email, profile_photo_url: profilePhoto, id: userId } = emp.user;
    const { designation, is_admin: isAdmin, status, id: employeeId, join_at: joinAt, left_at: leftAt } = emp;

    const data = {
        user: {
            firstName,
            lastName,
            profilePhoto: isAbsoluteUrl(profilePhoto) ? profilePhoto : `${ApiConstants.MEDIA_URL}${profilePhoto}`,
            email: email || '',
            id: userId,
        },
        designation,
        isAdmin,
        status,
        id: employeeId,
        joinAt,
        leftAt,
    };
    data.joinAt = data.joinAt ? moment(data.joinAt).format('YYYY-MM-DD HH:mm') : '';
    data.leftAt = data.leftAt ? moment(data.leftAt).format('YYYY-MM-DD HH:mm') : '';
    return data;
}

export function getRandomBorder() {
    const items = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
    return `border-${_.sample(items)}`;
}

export function formatTasks(tasks) {
    tasks = tasks || [];
    const upcomming = tasks.filter(task => task.status === TaskConstants.STATUS.UPCOMMING);
    const ongoing = tasks.filter(task => task.status === TaskConstants.STATUS.ONGOING);
    const complete = tasks.filter(task => task.status === TaskConstants.STATUS.COMPLETE);
    return {
        upcomming: _.keyBy(upcomming, 'id'),
        ongoing: _.keyBy(ongoing, 'id'),
        complete: _.keyBy(complete, 'id'),
    };
}

function formatWorkflow(workflow) {
    const { start_at: startAt, complete_at: completeAt } = workflow;
    let { tasks } = workflow;
    tasks = tasks.map(task => {
        const { parent_task: parentTask, start_delta: startDelta, completed_at: completedAt } = task;
        delete task.parent_task;
        delete task.start_delta;
        delete task.completed_at;
        task = { parentTask, startDelta, completedAt, ...task };
        return task;
    });
    delete workflow.start_at;
    delete workflow.complete_at;
    delete workflow.tasks;

    return { startAt, completeAt, tasks, ...workflow };
}

export function parseWorkflow(workflows) {
    if (workflows instanceof Array) {
        return workflows.map(workflow => formatWorkflow(workflow));
    }
    return formatWorkflow(workflows);
}

export function parseDateTime(dateTime) {
    return moment(dateTime).format('YYYY:MM:DD HH:MM');
}
