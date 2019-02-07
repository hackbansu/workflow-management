import actions from 'constants/actions';

const { UPDATE_EMPLOYEES } = actions.employees;

/**
 * Function to get authentication token update action.
 * @param {string} token - authentication token string
 */

export const updateEmployeesAction = (data) => ({
    type: UPDATE_EMPLOYEES,
    data,
});
