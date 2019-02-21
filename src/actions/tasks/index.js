import actions from 'constants/actions';

const { UPDATE_COMPLETE_TASKS, UPDATE_ONGOING_TASKS, UPDATE_UPCOMMIG_TASKS } = actions.task;

export const updateOngoingTasks = tasks => ({
    type: UPDATE_ONGOING_TASKS,
    ongoing: tasks,
});

export const updateCompleteTasks = tasks => ({
    type: UPDATE_COMPLETE_TASKS,
    complete: tasks,
});
export const updateUpcommingTasks = tasks => ({
    type: UPDATE_UPCOMMIG_TASKS,
    upcomming: tasks,
});
