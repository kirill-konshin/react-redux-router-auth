export const requiredFields = (values, requiredFields) =>
    requiredFields.reduce((errors, field) => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
        return errors;
    }, {});
