import constants from 'constants/index.js';
import { showToast } from 'utils/helpers/toast';
import store from '../store';

/**
 * service function to make an api call to the server.
 * @param {string} url - url string to send the request to.
 * @param {string} method - request type to send.
 * @param {object} data - data to send in case of POST request
 * @param {string} token - token of the user to send
 */
export function makeApiRequest(url, method = 'GET', data = undefined, contentType = 'application/json') {
    url = constants.API_URL + url;
    const token = store.getState().currentUser.token ? 'Token ' + store.getState().currentUser.token : '';

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
        .then(response => {
            if (response.status === 204) {
                return { response, body: null };
            }
            return response.json().then(body => ({ response, body }));
        })
        .then(({ response, body }) => {
            if (response.status >= 400) {
                // show error in toast msg
                let errormsg = body.detail;
                if (errormsg.constructor === Array) {
                    errormsg = errormsg[0];
                }
                showToast(errormsg);
                return null;
            }

            return { response, body };
        })
        .catch(err => {
            console.log('err.message :', err.message);
            // show error in toast msg
            showToast('Some error occured');
            return null;
        });
}
