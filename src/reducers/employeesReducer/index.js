import actions from 'constants/actions.js';

const { UPDATE_EMPLOYEES } = actions.employees;

const initialState = {
    activeEmployees: {},
    inactiveEmployees: {},
    invitedEmployees: {},
};

/**
 * Reducer for current user actions.
 */
export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_EMPLOYEES:
        return {
            ...state,
            activeEmployees: action.activeEmployees,
            inactiveEmployees: action.inactiveEmployees,
            invitedEmployees: action.invitedEmployees,
        };

    default:
        return state;
    }
};
