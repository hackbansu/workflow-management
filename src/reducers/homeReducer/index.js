import actions from '../../constants/actions';

const homeActions = actions.home;
const { UPDATE_DATA_REQUESTED, UPDATE_DATA_FAILURE, UPDATE_DATA_SUCCESS } = homeActions;

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_DATA_REQUESTED:
        return {
            ...state,
            isError: action.isError,
            data1: action.data1,
        };

    case UPDATE_DATA_FAILURE:
        return {
            ...state,
            isError: action.isError,
            data1: action.data1,
        };

    case UPDATE_DATA_SUCCESS:
        return {
            ...state,
            data1: action.data1,
            isError: action.isError,
        };

    default:
        return state;
    }
};
