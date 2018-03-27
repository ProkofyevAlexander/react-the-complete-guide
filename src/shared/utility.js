export const checkValidity = (value, rules) => {

    if (!rules) {
        return true;
    }

    let isValid = true;

    value = value.trim();

    if (isValid && rules.required) {
        isValid = value !== '';
    }

    if (isValid && rules.minLength) {
        isValid = value.length >= rules.minLength;
    }

    if (isValid && rules.maxLength) {
        isValid = value.length <= rules.maxLength;
    }

    if (isValid && rules.isEmail) {
        isValid = /.+@.+\..+/.test(value);
    }

    return isValid;
};
