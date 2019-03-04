import actions from 'constants/actions.js';
import ApiConstants from 'constants/api';

const { UPDATE_TOKEN, UPDATE_PROFILE, UPDATE_COMPANY, LOGOUT } = actions.user;

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

    case UPDATE_PROFILE:
        return {
            ...state,
            firstName: action.firstName,
            lastName: action.lastName,
            profilePhoto:
                    action.profilePhoto.substring(0, 4) === 'http'
                        ? action.profilePhoto
                        : `${ApiConstants.MEDIA_URL}${action.profilePhoto}`,
            email: action.email,
            id: action.id,
            isAdmin: action.isAdmin,
            designation: action.designation,
            status: action.status,
            employeeId: action.employeeId,
        };

    case UPDATE_COMPANY:
        return {
            ...state,
            company: {
                id: action.id,
                name: action.name,
                address: action.address,
                city: action.city,
                state: action.state,
                logo:
                        action.logo.substring(0, 4) === 'http'
                            ? action.logo
                            : `${ApiConstants.MEDIA_URL}${action.logo}`,
                status: action.status,
                links: action.links,
            },
        };

    default:
        return state;
    }
};
