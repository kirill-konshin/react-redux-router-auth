import React from 'react';

//TODO Maybe use https://github.com/erikras/redux-form-material-ui
export default ({Cmp, helperText, input, meta: {error, touched}, ...props}) => (
    <Cmp {...input} {...props} error={touched && !!error} helperText={(touched && error) || helperText} />
);
