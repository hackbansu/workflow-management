import actions from 'constants/actions.js';

const { UPDATE_WORKFLOWS, UPDATE_WORKFLOW } = actions.workflow;

const initialState = {};

export default (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case UPDATE_WORKFLOWS:
        return action.workflows;
    case UPDATE_WORKFLOW:
        newState = { ...state };
        newState = Object.assign(newState, action.workflow);
        return newState;
    default:
        return state;
    }
};
