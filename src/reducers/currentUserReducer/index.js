import actions from 'constants/actions.js';

const { UPDATE_TOKEN, UPDATE_PROFILE, LOGOUT } = actions.user;

const initialState = {
    token: '',
};

/**
 * Reducer for current user actions.
 */
export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_TOKEN:
        return {
            ...state,
            token: action.token,
        };

    case LOGOUT:
        return {};

    case UPDATE_PROFILE:
        return {
            ...state,
            firstName: action.firstName,
            lastName: action.lastName,
            profilePhoto: action.profilePhoto,
            email: action.email,
            id: action.id,
        };

    default:
        return state;
    }
};
