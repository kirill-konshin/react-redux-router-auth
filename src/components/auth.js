import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

const locationHelper = locationHelperBuilder({});

export const authenticatedWrapper = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => !!state.token,
    wrapperDisplayName: 'authenticatedWrapper'
});

export const notAuthenticatedWrapper = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
    authenticatedSelector: state => !state.token,
    wrapperDisplayName: 'notAuthenticatedWrapper'
});

export const allowFoo = (token) => true;
export const disAllowFoo = (token) => {
    throw new Error('Not allowed for token ' + token);
};