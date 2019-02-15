export default {
    API_URL: 'http://localhost:8000/api/',
    MEDIA_URL: 'http://localhost:8000/media/',

    LOGIN_PAGE: '/login',
    SIGNUP_PAGE: '/signup',
    FORGOT_PASSWORD_PAGE: '/forgot-password',
    RESET_PASSWORD_PAGE: '/reset-password',
    INVITATION_PAGE: '/invitation',

    HOME_PAGE: '/',
    DASHBOARD_PAGE: '/dashboard',
    WORKFLOWS_PAGE: '/workflows',
    EMPLOYEES_PAGE: '/employees',
    EMPLOYEE_PAGE: '/employee',
    INVITE_PAGE: '/invite',
    TEMPLATES_PAGE: '/templates',
    PROFILE_PAGE: '/profile',
    COMPANY_PAGE: '/company',
    CREATE_COMPANY_PAGE: '/create-company',

    api: {
        auth: {
            LOGIN: 'auth/login/',
            LOGOUT: 'auth/logout/',
            FORGOT_PASSWORD: 'auth/request-reset/',
            UPDATE_PASSWORD: 'auth/reset-password/',
            USER_COMPANY_SIGNUP: 'create-company/',
            ACCEPT_INVITE: 'user/invitation/',
        },
        user: {
            FETCH: 'user/profile/',
            UPDATE: 'user/profile/',
            CREATE_COMPANY: 'company/new-company/',
        },
        employee: {
            FETCH_ALL: 'employees/',
            FETCH: 'employee/',
            INVITE: 'company/invite-employee/',
            INVITE_CSV: 'company/invite-employee-csv/',
        },
        company: {
            FETCH: 'employee/my-company/',
            UPDATE: 'update-company/',
        },
    },
};
