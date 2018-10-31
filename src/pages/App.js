import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getUser} from "../components/reducer";
import {logout, loadUser} from "../components/actions";

const App = ({logout, loadUser, user, children}) => (
    <div>
        {!user ? <div>Loading...</div> : <button onClick={e => logout()}>Logout {user.name}</button>}
        <button onClick={async e => {
            try {
                console.log(await loadUser('123'));
            } catch (e) {
                console.error(e);
            }
        }}>Attempt to load someone else (results in logout)
        </button>
        <hr/>
        <Link to="/app/allowed">Allowed</Link>
        <Link to="/app/not-allowed">Not Allowed</Link>
        <hr/>
        {children}
    </div>
);

export default connect(state => ({
    user: getUser(state)
}), {
    logout,
    loadUser
})(App);