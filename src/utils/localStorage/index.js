/**
 * @function loadStore
 * @return {type} {return store or undefined}
 */
export const loadStore = () => {
    try {
        const serializeState = localStorage.getItem('reduxState');
        if (serializeState === null) {
            return undefined;
        }
        return JSON.parse(localStorage.getItem('reduxState'));
    } catch (err) {
        return undefined;
    }
};

/**
 * @function saveStore
 * @param  {state} Object storet to save in localstorage
 */
export const saveStore = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (err) {
        console.info('failed to save store');
        console.trace('err', err);
    }
};
