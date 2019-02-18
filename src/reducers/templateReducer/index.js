import actions from 'constants/actions.js';
import UserConstants from 'constants/user';

const { UPDATE_TEMPLATES } = actions.template;

const initialState = {};

/**
 * Reducer for current user actions.
 */
export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_TEMPLATES:
        return action.templates;
    default:
        return state;
    }
};
