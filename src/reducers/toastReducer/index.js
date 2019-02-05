import actions from 'constants/actions.js';

const { CHANGE_TOAST_STATE } = actions.common;

const initialState = {
    class: 'invisible',
    text: 'no text here',
};

export default (state = initialState, action) => {
    switch (action.type) {
    case CHANGE_TOAST_STATE:
        return {
            ...state,
            class: action.class,
            text: action.text,
        };

    default:
        return state;
    }
};
