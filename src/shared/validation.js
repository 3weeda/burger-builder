export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        // trim() bymsa7 el white spaces
        //&& de 3shan n2olo en lazm kol el rules tb2a true m3aya 3shan a2bal el validations
        isValid = value.trim() !== '' && isValid;
    }
    //rule rewsha awi
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
}
