import { FIELD_TYPE } from 'constants/navigation';

export default {
    API_URL: 'http://localhost:8000/api/',
    MEDIA_URL: 'http://localhost:8000/media/',

    LOGIN_PAGE: '/login',
    SIGNUP_PAGE: '/signup',
    FORGOT_PASSWORD_PAGE: '/forgot-password',
    RESET_PASSWORD_PAGE: '/reset-password',
    INVITATION_PAGE: '/invitation',

    HOME_PAGE: '/',
    DASHBOARD_PAGE: `/${FIELD_TYPE.DASHBOARD}`,
    WORKFLOWS_PAGE: `/${FIELD_TYPE.WORKFLOWS}`,
    NEW_WORKFLOW_PAGE: `/${FIELD_TYPE.WORKFLOWS}/new`,
    EMPLOYEES_PAGE: `/${FIELD_TYPE.EMPLOYEES}`,
    EMPLOYEE_PAGE: '/employee',
    INVITE_PAGE: `/${FIELD_TYPE.INVITE}`,
    TEMPLATES_PAGE: `/${FIELD_TYPE.WORKFLOWS}/${FIELD_TYPE.TEMPLATES}`,
    PROFILE_PAGE: `/${FIELD_TYPE.PROFILE}`,
    COMPANY_PAGE: `/${FIELD_TYPE.COMPANY}`,
    CREATE_COMPANY_PAGE: `/${FIELD_TYPE.CREATE_COMAPNY}`,
    LOGOUT_PAGE: `/${FIELD_TYPE.LOGOUT}`,

    api: {
        auth: {
            LOGIN: 'auth/login/',
            LOGOUT: 'auth/logout/',
            FORGOT_PASSWORD: 'auth/request-reset/',
            UPDATE_PASSWORD: 'auth/reset-password/',
            USER_COMPANY_SIGNUP: 'create-company/',
            ACCEPT_INVITE: 'employee/invitation/',
        },
        user: {
            FETCH: 'user/profile/',
            UPDATE: 'user/profile/',
            CREATE_COMPANY: 'company/new-company/',
        },
        employee: {
            FETCH_ALL: 'employees/',
            FETCH: 'employee-detail/',
            UPDATE: 'employee/',
            REMOVE: 'employee/',
            INVITE: 'company/invite-employee/',
            INVITE_CSV: 'company/invite-employee-csv/',
        },
        company: {
            FETCH: 'employee/my-company/',
            UPDATE: 'update-company/',
        },
        template: {
            FETCH_ALL: 'workflow-templates/',
        },
    },
};
