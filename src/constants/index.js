export default {
    PROFILE_PIC_TYPES: '.jpg,.png,.jpeg',
    COMPANY_LOGO_PIC_TYPES: '.jpg,.png,.jpeg',
    INVITE_FILE_TYPES: '.csv',
};

export const regexConst = {
    cleanError: /^\[+|\]$/gm,
    absoluteUrl: RegExp('^http(s)?://', 'i'),
    password: /^[A-Za-z\d]{8,}$/,
    splitDateTime: /(?<days>\d+\s+)?(?<time>\d{2}:\d{2})(:\d{2}\.\d+)?/i,
};

export function isAbsoluteUrl(url) {
    return regexConst.absoluteUrl.test(url);
}
