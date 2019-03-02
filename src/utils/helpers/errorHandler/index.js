import { regexConst } from 'constants/index.js';

let errorCategoriser;

function errorStringParser(errorMsg, err) {
    return `${errorMsg}\n${err}`;
}

function errorObjectParser(errors) {
    let errorMsg = '';
    for (const errName in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, errName)) {
            if (errName === 'details' || errName === 'detail') {
                const msg = errorCategoriser(errors[errName]);

                errorMsg = errorStringParser(errorMsg, msg);
            } else {
                // const msg = `${errName}: ${errorCategoriser(errors[errName])}`;
                const msg = `${errorCategoriser(errors[errName])}`;
                errorMsg = errorStringParser(errorMsg, msg);
            }
        }
    }
    return errorMsg;
}

function errorArrayParser(error) {
    let errorMsg = '';
    for (const err of error) {
        const msg = errorCategoriser(err);
        errorMsg = errorStringParser(errorMsg, msg);
    }
    return errorMsg;
}

errorCategoriser = function errorCategoriser(errors) {
    let errorMsg = '';
    if (errors instanceof Array) {
        let msg = errorArrayParser(errors);
        // msg = `[${msg}]`;
        msg = `${msg}`;
        errorMsg = errorStringParser(errorMsg, msg);
    } else if (errors instanceof Object) {
        const msg = errorObjectParser(errors);
        errorMsg = errorStringParser(errorMsg, msg);
    } else if (typeof errors === 'string') {
        errorMsg += errors;
    } else {
        throw new Error('invalid error type');
    }
    return errorMsg;
};
export function errorParser(errors, defaultMsg) {
    let errorMsg = '';
    try {
        errorMsg = errorCategoriser(errors);
    } catch (err) {
        errorMsg = defaultMsg || 'Something went wrong';
    }
    errorMsg = errorMsg.trim().replace(regexConst.cleanError, '');
    return errorMsg;
}
