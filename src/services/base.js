import { changeToastStateAction } from 'actions/common';

import store from '../store';

const { dispatch } = store;

/**
 * Show the toast message by dispatching the corresponding action.
 * @param {string} text - text to show in toast message
 */
function showToast(text) {
    dispatch(changeToastStateAction(true, text));
    setTimeout(() => {
        dispatch(changeToastStateAction(false, ''));
    }, 3000);
}

/**
 * service function to make an api call to the server.
 * @param {string} url - url string to send the request to.
 * @param {string} method - request type to send.
 * @param {object} data - data to send in case of POST request
 * @param {string} token - token of the user to send
 */
export function makeApiRequest(url, method = 'GET', data = {}) {
    const token = store.getState().currentUser.token ? 'Token ' + store.getState().currentUser.token : '';

    return fetch(url, {
        // optional fetch options
        method,
        body: JSON.stringify(data), // you may send any data, encoded as you wish. shall match content-type
        headers: {
            'content-type': 'application/json',
            Authorization: token,
        },
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
