import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import request from "./api";
import reducer from "./reducer";
import {getToken} from "./reducer";
import {error} from "./helpers";
import {HTTP} from "./actions";
import errorMiddleware from "./errorMiddleware";

export default initialState => {
    let store;

    // this is some library that makes requests
    const api = ({method = "GET", url, body}) =>
        request({
            method,
            url,
            body,
            token: getToken(store.getState()) // here goes your selector
        }).catch(e => {
            // service action for reducers to capture HTTP errors
            store.dispatch({
                type: error(HTTP),
                payload: e
            });
            throw e; // re-throw an error
        });

    store = createStore(
        reducer,
        initialState,
        applyMiddleware(
            thunkMiddleware.withExtraArgument(api),
            errorMiddleware, // must be before promiseMiddleware
            promiseMiddleware()
        )
    );
    return store;
};
