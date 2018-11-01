import isPromise from 'is-promise';
import {HTTP} from './actions';
import {error} from './helpers';

const types = [error(HTTP)];

export default () => next => action => {
    if (!isPromise(action.payload)) return next(action);

    if (types.includes(action.type)) {
        // Dispatch initial pending promise, but catch any errors
        return next(action).catch(error => {
            console.warn('Middleware has caught an error', error);
            return error;
        });
    }

    return next(action);
};
