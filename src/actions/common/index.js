import actions from 'constants/actions';

const { CHANGE_LOADER_STATE, CHANGE_TOAST_STATE, CHANGE_MODAL_STATE } = actions.common;

/**
 * Function to get loader state change action.
 * @param {string} value - css class to be set on loader
 */
export const changeLoaderStateAction = show => ({ type: CHANGE_LOADER_STATE, show });

/**
 * Function to get toast state change action.
 * @param {string} value - css class to be set on the toast
 * @param {string} text - text to be set on toast
 */
export const changeModalStateAction = (heading, text, showModal) => ({
    type: CHANGE_MODAL_STATE,
    heading,
    text,
    showModal,
});
