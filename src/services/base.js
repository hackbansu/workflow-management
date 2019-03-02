import ApiConstants from 'constants/api';
import { push } from 'connected-react-router';
import { logoutAction } from 'actions/user';
import { toast } from 'react-toastify';
import { errorParser } from 'utils/helpers/errorHandler';

import store from '../store';

/**
 * @function apiErrorHandler
 * @param  {type} response {response object}
 * @param  {type} body     {response body}
 */
function apiErrorHandler(response, body) {
    body = body || { detail: 'Error occur' };
    let errorMsg;
    if (response.status >= 500) {
        store.dispatch(push(ApiConstants.ISE_PAGE));
    }
    // Logout current user if token is invalid
    if (response.status === 401) {
        store.dispatch(logoutAction());
        store.dispatch(push(ApiConstants.LOGIN_PAGE));
        toast.info('Please login');
        return null;
    }
    if (response.status === 403) {
        store.dispatch(push(ApiConstants.UNAUTHORIZED_PAGE));
    }
    if (response.status >= 405 && response.status < 500) {
        errorMsg = errorParser(body, 'Api error occur');
        toast.error(errorMsg);
    }
    return null;
}

/**
 * service function to make an api call to the server.
 * @param {string} url - url string to send the request to.
 * @param {string} method - request type to send.
 * @param {object} data - data to send in case of POST request
 * @param {string} token - token of the user to send
 */
export function makeApiRequest(
    url,
    method = 'GET',
    data = undefined,
    contentType = 'application/json',
    exceptStatus
) {
    exceptStatus = exceptStatus || [];
    url = ApiConstants.API_URL + url;
    const token = store.getState().currentUser.token ? `Token ${store.getState().currentUser.token}` : '';
    let body;
    if (data) {
        body = data;
    }

    const headers = {
        Authorization: token,
    };
    if (contentType === 'application/json') {
        headers['content-type'] = contentType;
        body = JSON.stringify(body);
    }

    return fetch(url, {
        // optional fetch options
        method,
        body, // you may send any data, encoded as you wish. shall match content-type
        headers,
        mode: 'cors', // no-cors, cors, *same-origin
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response
            .json()
            .then(body => ({ response, body }))
            .catch(err => ({ response, body: null })))
        .then(({ response, body }) => {
            if (response.status >= 400) {
                if (exceptStatus.indexOf(response.status) === -1) {
                    apiErrorHandler(response, body);
                }
            }
            return { response, body };
        })
        .catch(err => {
            if (err) {
                toast.error(String(err));
            }
            return Promise.reject(err);
        });
}
