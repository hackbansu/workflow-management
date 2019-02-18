import { changeModalStateAction } from 'actions/common';
import store from 'store';

const { dispatch } = store;

/**
 * Show the modal message by dispatching the corresponding action.
 * @param {string} text - text to show in toast message
 */
export function showModal(heading, text) {
    dispatch(changeModalStateAction(heading, text, true));
}

/**
 * Hide the modal message by dispatching the corresponding action.
 * @param {string} text - text to show in toast message
 */
export function hideModal() {
    dispatch(changeModalStateAction('', '', false));
}
