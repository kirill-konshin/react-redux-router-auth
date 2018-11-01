import React from 'react';

export default ({Cmp, helperText, input, meta: {error, touched}, ...props}) => (
    <Cmp {...input} {...props} error={touched && !!error} helperText={(touched && error) || helperText} />
);
