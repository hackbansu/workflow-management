import actions from 'constants/actions.js';

const { CHANGE_MODAL_STATE } = actions.common;

const initialState = {
    text: 'no text here',
};

/**
 * Reducer for the toast actions.
 */
export default (state = initialState, action) => {
    switch (action.type) {
    case CHANGE_MODAL_STATE:
        return {
            ...state,
            text: action.text,
        };

    default:
        return state;
    }
};
