import ApiConstants from 'constants/api';
import { isAbsoluteUrl } from 'constants/index.js';

export function parseEmployeeData(emp) {
    const { first_name: firstName, last_name: lastName, email, profile_photo_url: profilePhoto, id: userId } = emp.user;
    const { designation, is_admin: isAdmin, status, id: employeeId } = emp;

    return {
        user: {
            firstName,
            lastName,
            profilePhoto: isAbsoluteUrl(profilePhoto) ? profilePhoto : `${ApiConstants.MEDIA_URL}${profilePhoto}`,
            email,
            id: userId,
        },
        designation,
        isAdmin,
        status,
        id: employeeId,
    };
}
