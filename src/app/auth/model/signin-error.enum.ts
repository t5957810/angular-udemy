export enum SigninError {
    EMAIL_NOT_FOUND = 'There is no user record corresponding to this identifier. The user may have been deleted.',
    INVALID_PASSWORD = 'The password is invalid or the user does not have a password.',
    USER_DISABLED = 'The user account has been disabled by an administrator.',
    TOO_MANY_ATTEMPTS_TRY_LATER = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
}
