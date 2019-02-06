import actions from 'constants/actions.js';

const { CHANGE_TOAST_STATE } = actions.common;

const initialState = {
    show: false,
    text: 'no text here',
};

/**
 * Reducer for the toast actions.
 */
export default (state = initialState, action) => {
    switch (action.type) {
    case CHANGE_TOAST_STATE:
        return {
            ...state,
            show: action.show,
            text: action.text,
        };

    default:
        return state;
    }
};
