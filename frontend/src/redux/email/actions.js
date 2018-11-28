export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILURE = 'SEND_EMAIL_FAILURE';

export const sendEmail = (data) => ({
    type: SEND_EMAIL,
    data
});

export const sendEmailSuccess = (email) => ({
    type: SEND_EMAIL_SUCCESS,
    email
});

export const sendEmailFailed = (error) => ({
    type: SEND_EMAIL_FAILURE,
    error
});