import actions from 'constants/actions.js';

const { CHANGE_LOADER_STATE } = actions.common;

const initialState = {
    show: false,
};

/**
 * Reducer for loader actions.
 */
export default (state = initialState, action) => {
    switch (action.type) {
    case CHANGE_LOADER_STATE:
        return {
            ...state,
            show: action.show,
        };

    default:
        return state;
    }
};
