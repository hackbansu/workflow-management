import { makeApiRequest } from 'services/base';

export function makeLoginRequest(email, password) {
    return makeApiRequest('https://2a3c684d.ngrok.io/api/user/login/', 'POST', { email, password });
}
