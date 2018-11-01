import {applyMiddleware, createStore, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';
import reducer from './reducer';
import errorMiddleware from './errorMiddleware';
import ApiStoreLink from './apiStoreLink';

export default (initialState = undefined) => {
    const link = new ApiStoreLink();

    const store = createStore(
        persistReducer(
            {
                debug: true,
                key: 'blacksheep',
                whitelist: ['user', 'token'],
                storage
            },
            reducer
        ),
        initialState,
        composeWithDevTools(
            applyMiddleware(
                thunkMiddleware.withExtraArgument(link.api),
                errorMiddleware, // must be before promiseMiddleware
                promiseMiddleware(),
                createLogger({
                    level: process.env.NODE_ENV !== 'production' ? 'log' : 'error',
                    collapsed: (getState, action, logEntry) => !logEntry.error,
                    diff: true
                })
            )
        )
    );

    link.setStore(store);

    if (module.hot) {
        module.hot.accept('./reducer', () => {
            store.replaceReducer(require('./reducer').default);
        });
    }

    return {
        persistor: persistStore(store),
        store
    };
};
