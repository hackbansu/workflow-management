import actions from 'constants/actions';

const { UPDATE_TOKEN, UPDATE_PROFILE, LOGOUT } = actions.user;

/**
 * Function to get authentication token update action.
 * @param {string} token - authentication token string
 */
export const updateTokenAction = token => ({ type: UPDATE_TOKEN, token });

export const logoutAction = () => ({ type: LOGOUT });

export const updateProfileAction = (firstName, lastName, profilePhoto, email, id) => ({
    type: UPDATE_PROFILE,
    firstName,
    lastName,
    profilePhoto,
    email,
    id,
});
