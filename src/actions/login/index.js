import actions from 'constants/actions';

const { UPDATE_TOKEN } = actions.common;

export const updateTokenAction = token => ({ type: UPDATE_TOKEN, token });
