import actions from 'constants/actions.js';

const { UPDATE_WORKFLOW } = actions.workflow;

const initialState = {};


export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_WORKFLOW:
        return action.workflows;
    default:
        return state;
    }
};
