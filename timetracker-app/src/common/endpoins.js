const AUTH_SIGNIN = '/auth/signin';
const AUTH_RESETPASSWORD = '/auth/resetpassword';

const TIMEREGISTRATIONS = '/timeregistrations';
const TIMEREGISTRATIONS_SELF = `${TIMEREGISTRATIONS}/self`;
const TIMEREGISTRATIONS_ID = id => `${TIMEREGISTRATIONS}/${id}`;

const USERS = '/users';
const USERS_SELF = `${USERS}/self`;

const LANGUAGES = "/localization/languages";
const LANGUAGES_ID = id => `${LANGUAGES}/${id}`;
const LANGUAGES_ID_PARTIAL = id => `${LANGUAGES_ID(id)}/partial`;

export default {
    AUTH_RESETPASSWORD, AUTH_SIGNIN, TIMEREGISTRATIONS, TIMEREGISTRATIONS_ID, TIMEREGISTRATIONS_SELF, USERS, USERS_SELF, LANGUAGES, LANGUAGES_ID, LANGUAGES_ID_PARTIAL
}