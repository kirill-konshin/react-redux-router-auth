import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import {getToken} from '../redux/reducer';

const locationHelper = locationHelperBuilder({});

export const authenticatedWrapper = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => !!getToken(state),
    wrapperDisplayName: 'authenticatedWrapper'
});

export const notAuthenticatedWrapper = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
    authenticatedSelector: state => !getToken(state), //FIXME @see https://github.com/mjrussell/redux-auth-wrapper/issues/241
    wrapperDisplayName: 'notAuthenticatedWrapper'
});
