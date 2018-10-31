import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";

import {allowFoo, authenticatedWrapper, disAllowFoo, notAuthenticatedWrapper} from "../lib/auth";

import ProtectedRoute from "../components/ProtectedRoute";
import App from "./App";
import Login from "./Login";
import Allowed from "./Allowed";

const AppRoute = () => (
    <App>
        <ProtectedRoute path="/app/allowed" acl={allowFoo} component={Allowed}/>
        <ProtectedRoute path="/app/not-allowed" acl={disAllowFoo} component={Allowed}/>
    </App>
);

export default ({store}) => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/app" component={authenticatedWrapper(AppRoute)} />
                <Route path="/login" component={notAuthenticatedWrapper(Login)}/>
                <Redirect to="/app"/>
            </Switch>
        </BrowserRouter>
    </Provider>
);
