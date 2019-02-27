import { makeApiRequest } from 'services/base';
import ApiConstants from 'constants/api';
import userConstants from 'constants/user';
import { errorParser } from 'utils/helpers/errorHandler';
import { parseEmployeeData } from 'utils/helpers';
import { toast } from 'react-toastify';
import { updateEmployeesAction, updateEmployeeAction } from 'actions/employees';
import store from '../store';

const employeeApiUrls = ApiConstants.api.employee;

function updateEmployees(...args) {
    return store.dispatch(updateEmployeesAction(...args));
}

function updateEmployee(...args) {
    return store.dispatch(updateEmployeeAction(...args));
}

/**
 * Utility function to send the fetch employees request to the server.
 */
export function makeFetchAllRequest(isAdmin) {
    if (isAdmin) {
        return makeApiRequest(employeeApiUrls.FETCH_ALL_ADMIN, 'GET');
    }
    return makeApiRequest(employeeApiUrls.FETCH_ALL, 'GET');
}

export function makeFetchRequest(employeeId) {
    return makeApiRequest(`${employeeApiUrls.FETCH}${employeeId}/`, 'GET');
}

export function makeUpdateRequest(firstName, lastName, profilePhoto, designation, isAdmin, employeeId) {
    const data = {
        user: { first_name: firstName, last_name: lastName },
        designation,
        is_admin: isAdmin,
    };

    return makeApiRequest(employeeApiUrls.UPDATE + employeeId + '/', 'PATCH', data);
}

/**
 * Utility function to send the employee removal request.
 */
export function makeRemoveRequest(employeeId) {
    return makeApiRequest(employeeApiUrls.REMOVE + employeeId + '/', 'DELETE');
}

/**
 * Utility function to send the login POST request to the server.
 * @param {string} email - email to send in the invite request.
 * @param {string} firstName - first name to send in the invite request.
 * @param {string} lastName - last name to send in the invite request.
 * @param {string} designation - designation to send in the invite request.
 */
export function makeInviteRequest(email, firstName, lastName, designation) {
    const data = {
        user: { first_name: firstName, last_name: lastName, email },
        designation,
    };

    return makeApiRequest(employeeApiUrls.INVITE, 'POST', data);
}

export function makeCsvInviteRequest(csvFile) {
    const formData = new FormData();
    formData.append('csv_file', csvFile);

    return makeApiRequest(employeeApiUrls.INVITE_CSV, 'POST', formData, null);
}

export function makeFetchActiveEmployeeAdminRequest() {
    return makeApiRequest(employeeApiUrls.FETCH_ACTIVE_ADMIN, 'GET');
}

export function getAllEmployees(isAdmin = false) {
    return makeFetchAllRequest(isAdmin).then(obj => {
        if (!obj) {
            return;
        }

        const { response, body } = obj;
        if (response.status !== 200) {
            const errMsg = errorParser(body, 'failed to fetch employees');
            toast.error(errMsg);
            return;
        }

        const activeEmployees = {};
        const inactiveEmployees = {};
        const invitedEmployees = {};
        body.forEach(emp => {
            const employeeData = parseEmployeeData(emp);

            const { status, id: employeeId } = employeeData;

            switch (status) {
            case userConstants.STATUS.INACTIVE:
                inactiveEmployees[employeeId] = employeeData;
                break;
            case userConstants.STATUS.INVITED:
                invitedEmployees[employeeId] = employeeData;
                break;
            default:
                activeEmployees[employeeId] = employeeData;
                break;
            }
        });

        // dispatch action to update employees
        updateEmployees(activeEmployees, inactiveEmployees, invitedEmployees);
    });
}

export function getEmployee(employeeId) {
    return makeFetchRequest(employeeId).then(obj => {
        if (!obj) {
            return Promise.reject();
        }
        const { response, body } = obj;
        if (response.status !== 200) {
            const errMsg = errorParser(body, 'Employees update failed');
            toast.error(errMsg);
            return Promise.reject();
        }

        const employeeData = parseEmployeeData(body);

        // dispatch action to update employees
        updateEmployee(employeeData);
        return Promise.resolve(employeeData);
    });
}
