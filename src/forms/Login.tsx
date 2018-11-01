import React from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import isEmail from 'validator/lib/isEmail';
import {connect} from 'react-redux';
import {loginAndLoadUser} from '../redux/actions';
import {requiredFields} from './formHelpers';
import Input from './Input';

const onSubmit = async ({email, password}, dispatch, {loginAndLoadUser}) => {
    try {
        await loginAndLoadUser(email, password);
    } catch (e) {
        throw new SubmissionError({_error: e.message || 'Incorrect email or password.'});
    }
};

const validate = values => {
    const errors = requiredFields(values, ['email', 'password']);

    if (values.email && !isEmail(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

interface LoginProps {
    handleSubmit?;
    submitting?;
    error?;
}

let Login: React.SFC<LoginProps> = ({handleSubmit, submitting, error}) => (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Field
            name="email"
            component={Input}
            Cmp={TextField}
            label="Email"
            placeholder="Please enter your email"
            margin="normal"
            fullWidth
        />
        <Field
            name="password"
            component={Input}
            Cmp={TextField}
            label="Password"
            placeholder="Please enter your password"
            type="password"
            margin="normal"
            fullWidth
        />
        {error && <div>{error}</div>}
        <Button color="primary" variant="contained" disabled={submitting} type="submit">
            {submitting ? 'Loading...' : 'Login'}
        </Button>
    </form>
);

Login = reduxForm({form: 'login', validate})(Login);
Login = connect(
    null,
    {loginAndLoadUser}
)(Login);

export default Login;
