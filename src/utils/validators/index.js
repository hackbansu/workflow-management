import constants, { regexConst } from 'constants/index.js';
import moment from 'moment';

export function validateEmail(email) {
    const isValid = regexConst.email.test(String(email));

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
    // const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValid = regexConst.password.test(String(password));

    if (!isValid) {
        return {
            isValid,
            message:
                password.length === 0
                    ? 'This field is required'
                    : 'Password must be 8 character long. Only Alphabates and number are allowed',
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

export function validateDate(givenDate, compareDate) {
    if (typeof givenDate === 'string') {
        givenDate = moment(givenDate);
        if (givenDate.invalidAt() !== -1) {
            return { isValid: false, message: 'cannot parse to date' };
        }
    }

    compareDate = compareDate || moment();
    compareDate = typeof compareDate === 'string' ? moment(compareDate) : compareDate;
    compareDate = compareDate.invalidAt() !== -1 ? moment() : compareDate;
    if (!moment.isMoment(givenDate)) {
        return { isValid: false, message: 'instance must be moments' };
    }

    if (givenDate < compareDate) {
        return { isValid: false, message: `moment must be grater than ${String(compareDate)}` };
    }
    return { isValid: true, message: '' };
}
