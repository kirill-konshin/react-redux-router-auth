import React from "react";
import {connect} from "react-redux";
import {loginAndLoadUser} from "../components/actions";

const Login = ({loginAndLoadUser}) => (
    <div>
        <button onClick={e => loginAndLoadUser('foo', 'bar')}>Login</button>
    </div>
);

export default connect(null, {loginAndLoadUser})(Login);