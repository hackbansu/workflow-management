export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase());

    if (!isValid) {
        return {
            isValid,
            message: email.length === 0 ? 'This field is required' : 'Invalid email',
        };
    }

    return {
        isValid,
        message: '',
    };
}

export function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValid = re.test(String(password));

    if (!isValid) {
        return {
            isValid,
            message: password.length === 0 ? 'This field is required' : 'Invalid password',
        };
    }

    return {
        isValid,
        message: '',
    };
}

export function validateTextString(text) {
    const isValid = text.length !== 0;
    if (!isValid) {
        return { isValid, message: 'This field is required' };
    }
    return { isValid, message: '' };
}
