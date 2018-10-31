import React, {Component} from "react";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import {getToken} from "./reducer";

class ProtectedRoute extends Component {
    state = {loading: true, error: null};

    verifyAccess = async props => {
        this.setState({loading: true});
        try {
            const {token, acl} = props;
            await acl(token);
        } catch (error) {
            this.setState({error});
        } finally {
            this.setState({loading: false});
        }
    };

    async componentDidMount() {
        await this.verifyAccess(this.props);
    }

    render() {
        const {loading, error} = this.state;
        if (loading) return <div>Resolving permissions</div>;
        if (error) return <div>Access denied: {error.message}</div>;
        return this.props.children;
    }
}

ProtectedRoute = connect(state => ({
    token: getToken(state)
}))(ProtectedRoute);

const RouteWrapper = ({acl, children, component: Cmp, ...props}) => (
    <Route
        {...props}
        render={() => (
            <ProtectedRoute acl={acl}>
                {Cmp ? <Cmp>{children}</Cmp> : children}
            </ProtectedRoute>
        )}
    />
);

export default RouteWrapper;
