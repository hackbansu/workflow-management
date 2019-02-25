import actions from 'constants/actions';

const { workflow: actionType } = actions;

export function updateWorkflowsAction(workflows) {
    return {
        type: actionType.UPDATE_WORKFLOWS,
        workflows,
    };
}

export function updateWorkflowAction(workflow) {
    return {
        type: actionType.UPDATE_WORKFLOW,
        workflow,
    };
}
