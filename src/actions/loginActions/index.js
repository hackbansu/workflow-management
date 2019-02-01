import actions from '../../constants/actions';

export const changeLoaderStateAction = value => ({ type: actions.CHANGE_LOADER_STATE, class: value });

export const changeToastStateAction = (value, text) => ({ type: actions.CHANGE_TOAST_STATE, class: value, text });

export const updateToken = token => ({ type: actions.UPDATE_TOKEN, token });
