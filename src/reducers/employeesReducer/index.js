import actions from 'constants/actions.js';
import UserConstants from 'constants/user';

const { UPDATE_EMPLOYEE, UPDATE_EMPLOYEES } = actions.employees;

const initialState = {
    activeEmployees: {},
    inactiveEmployees: {},
    invitedEmployees: {},
};

/**
 * Reducer for current user actions.
 */
export default (state = initialState, action) => {
    let newActiveEmployees;
    let newInactiveEmployees;
    let newInvitedEmployees;
    let employeeId;

    switch (action.type) {
    case UPDATE_EMPLOYEES:
        return {
            ...state,
            activeEmployees: action.activeEmployees,
            inactiveEmployees: action.inactiveEmployees,
            invitedEmployees: action.invitedEmployees,
        };

    case UPDATE_EMPLOYEE:
        newActiveEmployees = {};
        newInactiveEmployees = {};
        newInvitedEmployees = {};
        employeeId = action.data.id;

        if (state.activeEmployees[employeeId]) {
            newActiveEmployees[employeeId] = {};
        }
        if (state.inactiveEmployees[employeeId]) {
            newInactiveEmployees[employeeId] = {};
        }
        if (state.invitedEmployees[employeeId]) {
            newInvitedEmployees[employeeId] = {};
        }

        switch (action.data.status) {
        case UserConstants.STATUS.ACTIVE:
            newActiveEmployees[employeeId] = action.data;
            break;
        case UserConstants.STATUS.INACTIVE:
            newInactiveEmployees[employeeId] = action.data;
            break;
        case UserConstants.STATUS.INVITED:
            newInvitedEmployees[employeeId] = action.data;
            break;
        default:
            break;
        }

        return {
            ...state,
            activeEmployees: { ...state.activeEmployees, ...newActiveEmployees },
            inactiveEmployees: { ...state.inactiveEmployees, ...newInactiveEmployees },
            invitedEmployees: { ...state.invitedEmployees, ...newInvitedEmployees },
        };

    default:
        return state;
    }
};
