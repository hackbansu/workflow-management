import actions from 'constants/actions.js';
import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import employeesReducer from './employeesReducer';
import loaderReducer from './loaderReducer';
import modalReducer from './modalReducer';
import templateReducer from './templateReducer';
import taskReducer from './taskReducer';
import workflowReducer from './workflowReducer';

const { LOGOUT } = actions.user;

const appReducer = combineReducers({
    currentUser: currentUserReducer,
    employees: employeesReducer,
    loader: loaderReducer,
    modal: modalReducer,
    templates: templateReducer,
    tasks: taskReducer,
    workflows: workflowReducer,
});

const initialState = {
    currentUser: {
        token: '',
        firstName: '',
        lastName: '',
        profilePhoto: '',
        email: '',
        designation: '',
        company: {
            name: '',
            address: '',
            city: '',
            state: '',
            logo: '',
            status: '',
            links: [],
        },
    },
    employees: {
        activeEmployees: {},
        inactiveEmployees: {},
        invitedEmployees: {},
    },
    modal: {
        heading: 'Default Heading',
        text: 'Default Text',
        showModal: false,
    },
    loader: {
        show: false,
    },
    templates: {},
};

/**
 * In case of logout, entire store need to be deleted.
 */
export default (state = initialState, action) => {
    switch (action.type) {
    case LOGOUT:
        return initialState;
    default:
        return appReducer(state, action);
    }
};
