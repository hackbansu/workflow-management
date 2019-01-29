import actions from '../../constants/actions';

const homeActions = actions['home'];
const UPDATE_DATA_REQUESTED = homeActions['UPDATE_DATA_REQUESTED'];
const UPDATE_DATA_FAILURE = homeActions['UPDATE_DATA_FAILURE'];
const UPDATE_DATA_SUCCESS = homeActions['UPDATE_DATA_SUCCESS'];

const initialState = {};

export default (state = initialState, action) => {

  switch (action.type) {
    case UPDATE_DATA_REQUESTED:
      return {
        ...state,
        isError: action.isError,
        data_1: action.data_1,
      }

    case UPDATE_DATA_FAILURE:
      console.log("data fetch failed");
      return {
        ...state,
        isError: action.isError,
        data_1: action.data_1,
      }

    case UPDATE_DATA_SUCCESS:
      return {
        ...state,
        data_1: action.data_1,
        isError: action.isError,
      }

    default:
      return state
  }
}
