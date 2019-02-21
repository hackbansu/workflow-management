import ActionTypes from 'constants/actions';

const { UPDATE_COMPLETE_TASKS, UPDATE_ONGOING_TASKS, UPDATE_UPCOMMIG_TASKS } = ActionTypes.task;

const initialState = {
    upcomming: {},
    ongoing: {},
    complete: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_UPCOMMIG_TASKS:
        return {
            ...state,
            upcomming: action.upcomming,
        };
    case UPDATE_ONGOING_TASKS:
        return {
            ...state,
            ongoing: action.ongoing,
        };
    case UPDATE_COMPLETE_TASKS:
        return {
            ...state,
            complete: action.complete,
        };
    default:
        return state;
    }
};
