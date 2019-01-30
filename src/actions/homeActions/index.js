import actions from '../../constants/actions';
import constants from '../../constants';

const homeActions = actions.home;
const { UPDATE_DATA_REQUESTED, UPDATE_DATA_FAILURE, UPDATE_DATA_SUCCESS } = homeActions;

export const updateData = () => dispatch => {
    dispatch({
        type: UPDATE_DATA_REQUESTED,
        data_1: 20,
    });

    const CurrentWeatherUrl = 'http://' + constants.API_URL + '/current.js';
    return fetch(CurrentWeatherUrl)
        .then(response => response.json().then(body => ({ response, body })))
        .then(({ response, body }) => {
            if (!response.ok) {
                dispatch({
                    type: UPDATE_DATA_FAILURE,
                    data_1: 21,
                    isError: true,
                });
            }

            dispatch({
                type: UPDATE_DATA_SUCCESS,
                data_1: 22,
            });
        })
        .catch(err => {
            dispatch({
                type: UPDATE_DATA_FAILURE,
                data_1: 21,
                isError: true,
            });
        });
};
