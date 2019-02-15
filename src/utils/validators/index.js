import constants from 'constants/index.js';

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
    const re = /^[A-Za-z\d]{8,}$/;
    // const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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

export function validateLogo(logo) {
    if (!logo) {
        return { isValid: true, message: '' };
    }

    if (constants.COMPANY_LOGO_PIC_TYPES.indexOf(logo.name.split('.').pop()) === -1) {
        return { isValid: false, message: 'Invalid file type' };
    }

    return { isValid: true, message: '' };
}

export function validateProfilePic(profilePic) {
    if (!profilePic) {
        return { isValid: true, message: '' };
    }

    if (constants.PROFILE_PIC_TYPES.indexOf(profilePic.name.split('.').pop()) === -1) {
        return { isValid: false, message: 'Invalid file type' };
    }

    return { isValid: true, message: '' };
}

export function validateInviteCsvFile(csvFile) {
    if (!csvFile && constants.INVITE_FILE_TYPES.indexOf(csvFile.name.split('.').pop()) === -1) {
        return { isValid: false, message: 'Invalid file type' };
    }

    return { isValid: true, message: '' };
}
