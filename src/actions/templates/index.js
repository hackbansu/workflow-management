import actions from 'constants/actions';

const { UPDATE_TEMPLATES } = actions.template;

/**
 * Function to get authentication token update action.
 * @param {string} token - authentication token string
 */

export const updateTemplatesAction = templates => ({
    type: UPDATE_TEMPLATES,
    templates,
});
