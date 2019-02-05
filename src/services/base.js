import { changeToastStateAction } from 'actions/common';

import store from '../store';

const { dispatch } = store;

export function makeApiRequest(url, method = 'GET', data = {}, token = '') {
    return fetch(url, {
        // optional fetch options
        method,
        body: JSON.stringify(data), // you may send any data, encoded as you wish. shall match content-type
        headers: {
            'content-type': 'application/json',
            Authorization: token ? 'Token ' + token : '',
        },
        mode: 'cors', // no-cors, cors, *same-origin
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json().then(body => ({ response, body })))
        .then(({ response, body }) => {
            if (response.status !== 200) {
                dispatch(changeToastStateAction('visible', body.detail ? body.detail : 'error occured'));
                setTimeout(() => {
                    dispatch(changeToastStateAction('invisible', ''));
                }, 3000);
                return null;
            }

            return { response, body };
        })
        .catch(err => {
            dispatch(changeToastStateAction('visible', 'Some error occured'));
            setTimeout(() => {
                dispatch(changeToastStateAction('invisible', ''));
            }, 3000);
            return null;
        });
}
