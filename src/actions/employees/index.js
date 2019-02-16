import actions from 'constants/actions';

const { UPDATE_EMPLOYEES } = actions.employees;

/**
 * Function to get authentication token update action.
 * @param {string} token - authentication token string
 */

export const updateEmployeesAction = (activeEmployees, inactiveEmployees, invitedEmployees) => ({
    type: UPDATE_EMPLOYEES,
    activeEmployees,
    inactiveEmployees,
    invitedEmployees,
});
