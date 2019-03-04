import actions from 'constants/actions';

const { UPDATE_TOKEN, UPDATE_PROFILE, LOGOUT, UPDATE_COMPANY } = actions.user;

/**
 * Function to get authentication token update action.
 * @param {string} token - authentication token string
 */
export const updateTokenAction = token => ({ type: UPDATE_TOKEN, token });

export const logoutAction = () => ({ type: LOGOUT });

export const updateProfileAction = (
    firstName,
    lastName,
    profilePhoto,
    email,
    id,
    isAdmin = false,
    designation = '',
    status = -1,
    employeeId = 0
) => ({
    type: UPDATE_PROFILE,
    firstName,
    lastName,
    profilePhoto,
    email,
    id,
    isAdmin,
    designation,
    status,
    employeeId,
});

export const updateCompanyAction = (id, name, address, city, state, logo, status, links) => ({
    type: UPDATE_COMPANY,
    id,
    name,
    address,
    city,
    state,
    logo,
    status,
    links,
});
