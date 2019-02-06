import actions from 'constants/actions';

const { CHANGE_LOADER_STATE, CHANGE_TOAST_STATE } = actions.common;

/**
 * Function to get loader state change action.
 * @param {string} value - css class to be set on loader
 */
export const changeLoaderStateAction = value => ({ type: CHANGE_LOADER_STATE, class: value });

/**
 * Function to get toast state change action.
 * @param {string} value - css class to be set on the toast
 * @param {string} text - text to be set on toast
 */
export const changeToastStateAction = (value, text) => ({ type: CHANGE_TOAST_STATE, class: value, text });
