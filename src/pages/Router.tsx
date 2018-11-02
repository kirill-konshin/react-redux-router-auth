import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {allowFoo, disAllowFoo} from '../lib/acl';
import {authenticatedWrapper, notAuthenticatedWrapper} from '../auth/Auth';
import ProtectedRoute from '../auth/ProtectedRoute';

import App from './App';
import Login from './Login';
import Allowed from './Allowed';
import Mobx from './Mobx';

const AppRoute = props => (
    <App {...props}>
        <ProtectedRoute path="/app/allowed" acl={allowFoo} component={Allowed} />
        <ProtectedRoute path="/app/not-allowed" acl={disAllowFoo} component={Allowed} />
        <Route path="/app/mobx" component={Mobx} />
    </App>
);

export default ({store, persistor}) => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <Switch>
                    <Route path="/app" component={authenticatedWrapper(AppRoute)} />
                    <Route path="/login" component={notAuthenticatedWrapper(Login)} />
                    <Redirect to="/app" />
                </Switch>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
