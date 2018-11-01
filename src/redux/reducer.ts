import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {persistCombineReducers, persistStore} from 'redux-persist';
import {HTTP, LOAD_USER, LOGIN, LOGOUT} from './actions';
import {error, success} from './helpers';

const isHttpAuthError = payload => payload && payload.status === 401;

const token = (state = null, {type, payload}) => {
    switch (type) {
        case success(LOGIN):
            return payload.token;
        case error(HTTP):
            return isHttpAuthError(payload) ? null : state;
        case LOGOUT:
        case error(LOGIN):
        case error(LOAD_USER):
            return null;
        default:
            return state;
    }
};

const user = (state = null, {type, payload}) => {
    switch (type) {
        case success(LOAD_USER):
            return payload;
        case error(HTTP):
            return isHttpAuthError(payload) ? null : state;
        case LOGOUT:
        case error(LOGIN):
        case error(LOAD_USER):
            return null;
        default:
            return state;
    }
};

export const getToken = state => state.token;
export const getUser = state => state.user;

export default combineReducers({
    token,
    user,
    form
});
