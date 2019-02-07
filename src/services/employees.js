import { makeApiRequest } from 'services/base';

/**
 * Utility function to send the fetch employees request to the server.
 */
export function makeFetchRequest() {
    return makeApiRequest('company/employees/', 'GET');
}

/**
 * Utility function to send the login POST request to the server.
 * @param {string} firstName - first name to send in the update request.
 * @param {string} lastName - last name to send in the update request.
 */
export function makeUpdateRequest(firstName, lastName, profilePhoto, designation, isAdmin, employeeId) {
    const data = {
        user: { first_name: firstName, last_name: lastName },
        designation,
        is_admin: isAdmin,
    };

    console.log('data :', data);

    return makeApiRequest('employee/' + employeeId + '/', 'PATCH', data);
}
