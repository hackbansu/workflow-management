import actions from 'constants/actions';

const { UPDATE_TOKEN } = actions.common;

/**
 * Function to get authentication token update action.
 * @param {string} token - authentication token string
 */
export const updateTokenAction = token => ({ type: UPDATE_TOKEN, token });
