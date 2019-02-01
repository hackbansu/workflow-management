import actions from 'constants/actions.js';

const { UPDATE_TOKEN } = actions;

const initialState = {
    token: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_TOKEN:
        return {
            ...state,
            token: action.token,
        };

    default:
        return state;
    }
};
