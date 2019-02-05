import { changeToastStateAction } from 'actions/common';

import store from '../store';

const { dispatch } = store;

/**
 * service function to make an api call to the server.
 * @param {string} url - url string to send the request to.
 * @param {string} method - request type to send.
 * @param {object} data - data to send in case of POST request
 * @param {string} token - token of the user to send
 */
export function makeApiRequest(url, method = 'GET', data = {}) {
    const token = store.currentUser.token ? 'Token ' + store.currentUser.token : '';

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
        .then(response => response.json().then(body => ({ response, body })))
        .then(({ response, body }) => {
            if (response.status !== 200) {
                // dispatch an action to show error in toast msg
                dispatch(changeToastStateAction('visible', body.detail ? body.detail : 'error occured'));
                setTimeout(() => {
                    dispatch(changeToastStateAction('invisible', ''));
                }, 3000);
                return null;
            }

            return { response, body };
        })
        .catch(err => {
            // dispatch an action to show error in toast msg
            dispatch(changeToastStateAction('visible', 'Some error occured'));
            setTimeout(() => {
                dispatch(changeToastStateAction('invisible', ''));
            }, 3000);
            return null;
        });
}
