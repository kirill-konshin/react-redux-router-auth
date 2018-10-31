import {PENDING, FULFILLED, REJECTED} from "redux-promise-middleware";

export const DELIMETER = '_'; // PROMISE_TYPE_DELIMITER not exported from middleware

export const request = action => action + DELIMETER + PENDING;
export const success = action => action + DELIMETER + FULFILLED;
export const error = action => action + DELIMETER + REJECTED;
