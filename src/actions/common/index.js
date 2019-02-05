import actions from 'constants/actions';

const { CHANGE_LOADER_STATE, CHANGE_TOAST_STATE } = actions.common;

export const changeLoaderStateAction = value => ({ type: CHANGE_LOADER_STATE, class: value });

export const changeToastStateAction = (value, text) => ({ type: CHANGE_TOAST_STATE, class: value, text });
