import {Store} from 'redux';
import request from '../lib/api';
import {getToken} from './reducer';
import {error} from './helpers';
import {HTTP} from './actions';

/**
 * Special class that provides a link between API and Redux Store
 */
export default class ApiStoreLink {
    protected store: Store;

    setStore = (store: Store) => (this.store = store);

    api = async ({method = 'GET', url, body}) => {
        try {
            if (!this.store) throw new Error('Store not assigned');

            const res = await request({
                method,
                url,
                body,
                token: getToken(this.store.getState()) // here goes your selector
            });

            if (!res.ok) throw res;

            return await res.json();
        } catch (e) {
            if (e instanceof Response) {
                console.error(`Global HTTP error handler: ${e.status} ${e.statusText}`);
                // service action for reducers to capture HTTP errors
                this.store.dispatch({
                    type: error(HTTP),
                    payload: e
                });
            }
            throw e; // re-throw an error
        }
    };
}
