import actions from 'constants/actions';

const { workflow } = actions;

export function updateWorkflowAction(workflows) {
    return {
        type: workflow.UPDATE_WORKFLOW,
        workflows,
    };
}
