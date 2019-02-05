import actions from 'constants/actions.js';

const { CHANGE_LOADER_STATE } = actions.common;

const initialState = {
    class: 'invisible',
};

export default (state = initialState, action) => {
    switch (action.type) {
    case CHANGE_LOADER_STATE:
        return {
            ...state,
            class: action.class,
        };

    default:
        return state;
    }
};
