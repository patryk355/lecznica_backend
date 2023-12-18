const {isISO8601} = require('validator');

exports.phoneValidator = (value) => {
    return !!value.match(/^\+[1-9]\d{10,14}$/);
}

exports.stringRequiredValidator = (value) => {
    return typeof value === 'string' && value.trim().length > 0;
}

exports.stringValidator = (value) => {
    return typeof value === 'string';
}

exports.numberValidator = (value) => {
    return typeof value === 'number';
}

exports.dateValidator = (value) => {
    return typeof value === 'string' && isISO8601(value, {strict: true});
}
