import _ from "lodash";
import { createSelector } from "reselect";

export const getEmail = state => _.get(state, "email", {});

export const getEmailSent = createSelector([getEmail], email => {
    return email.get("sent").toArray();
});

export const getEmailLoading = createSelector([getEmail], email => {
    return email.get("loading");
});

export const getEmailError = createSelector([getEmail], email => {
    return email.get("error");
});
