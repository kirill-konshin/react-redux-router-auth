import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, RouteProps} from 'react-router-dom';
import {getUser} from '../redux/reducer';

export interface ProtectedRouteProps extends RouteProps {
    acl?: any;
}

export interface ProtectedRouteState {
    loading: boolean;
    error?: Error;
}

@connect(state => ({
    user: getUser(state)
}))
class ProtectedRoute extends Component<ProtectedRouteProps, ProtectedRouteState> {
    state = {loading: true, error: null};

    async componentDidMount() {
        await this.verifyAccess(this.props);
    }

    verifyAccess = async props => {
        this.setState({loading: true});
        try {
            const {user, acl} = props;
            await acl(user);
        } catch (error) {
            this.setState({error});
        } finally {
            this.setState({loading: false});
        }
    };

    render() {
        const {loading, error} = this.state;
        if (loading) return <div>Resolving permissions</div>;
        if (error) return <div>Access denied: {error.message}</div>;
        const {children} = this.props;
        return children;
    }
}

const RouteWrapper: React.SFC<ProtectedRouteProps> = ({acl, children, component, render, ...props}) => (
    <Route
        {...props}
        render={() => (
            <ProtectedRoute acl={acl}>
                <Route {...props} component={component} render={render}>
                    {children}
                </Route>
            </ProtectedRoute>
        )}
    />
);

export default RouteWrapper;
