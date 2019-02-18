import ApiConstants from 'constants/api';

export function parseEmployeeData(emp) {
    const { first_name: firstName, last_name: lastName, email, profile_photo_url: profilePhoto, id: userId } = emp.user;
    const { designation, is_admin: isAdmin, status, id: employeeId } = emp;

    return {
        user: {
            firstName,
            lastName,
            profilePhoto: RegExp('^http(s)?://', 'i').test(profilePhoto)
                ? profilePhoto
                : `${ApiConstants.MEDIA_URL}${profilePhoto}`,
            email,
            id: userId,
        },
        designation,
        isAdmin,
        status,
        id: employeeId,
    };
}
