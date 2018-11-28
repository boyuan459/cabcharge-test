import axiosInstance from './axiosInstance';

export function send({to, cc, bcc, subject, text}) {
    return axiosInstance.post('/api/emails', {
        to, cc, bcc, subject, text
    }).then(result => {
        console.log(result);
        return Promise.resolve(result.data);
    })
    .catch(err => Promise.reject(err));
}