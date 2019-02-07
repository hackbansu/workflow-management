import actions from 'constants/actions.js';

const { UPDATE_EMPLOYEES } = actions.employees;

const initialState = [];

/**
 * Reducer for current user actions.
 */
export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_EMPLOYEES:
        return [...action.data];

    default:
        return state;
    }
};
