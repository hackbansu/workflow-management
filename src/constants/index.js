export default {
    PROFILE_PIC_TYPES: '.jpg,.png,.jpeg',
    COMPANY_LOGO_PIC_TYPES: '.jpg,.png,.jpeg',
    INVITE_FILE_TYPES: '.csv',
};

export const regexConst = {
    cleanError: /^\[+|\]$/gm,
    absoluteUrl: RegExp('^http(s)?://', 'i'),
};

export const isAbsoluteUrl = url => regexConst.absoluteUrl.test(url);
