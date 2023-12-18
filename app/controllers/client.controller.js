const db = require('../models');
const HttpError = require('../utils/http-error');
const Client = db.clients;
const {phoneValidator, stringRequiredValidator} = require('../utils/validators');

exports.findAll = async (req, res, next) => {
    let data;

    try {
        data = await Client.findAll();
        res.status(200).json(data);
    } catch (err) {
        const error = new HttpError('Fetching clients failed, please try again.', 500);
        return next(error);
    }
};

exports.create = async (req, res, next) => {
    const {first_name, last_name, phone_number, city, postcode, street, street_number} = req.body;

    if (!phone_number || !phoneValidator(phone_number)) {
        const error = new HttpError('invalid_phone_number', 400);
        return next(error);
    }

    function isValid(data) {
        let isValid = true;
        for (const key in data) {
            if (!stringRequiredValidator(data[key])) {
                isValid = false;
            }
        }
        return isValid;
    }

    if (!isValid(req.body)) {
        const error = new HttpError('invalid_args', 400);
        return next(error);
    }

    const newClient = Client.build({
        first_name, last_name, phone_number, city, postcode, street, street_number
    });

    try {
        const result = await newClient.save();
        res.status(201).json(result);
    } catch (err) {
        console.error('err', err)
        const error = new HttpError('Cannot create client, please try again.', 500);
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const {first_name, last_name, phone_number, city, postcode, street, street_number} = req.body;

    if (!id) {
        const error = new HttpError('Wrong client id.', 400);
        return next(error);
    }

    const data = {};

    if (stringRequiredValidator(first_name)) {
        data.first_name = first_name;
    }
    if (stringRequiredValidator(last_name)) {
        data.last_name = last_name;
    }
    if (phone_number && phoneValidator(phone_number)) {
        data.phone_number = phone_number;
    }
    if (stringRequiredValidator(city)) {
        data.city = city;
    }
    if (stringRequiredValidator(postcode)) {
        data.postcode = postcode;
    }
    if (stringRequiredValidator(street)) {
        data.street = street;
    }
    if (stringRequiredValidator(street_number)) {
        data.street_number = street_number;
    }

    try {
        const result = await Client.update(data, {where: {id: id}});
        if (result[0] === 1) {
            res.status(200).json(data);
        } else {
            res.status(400).send({
                message: `Cannot update Client with id=${id}. Maybe Client was not found or args are not valid!`
            });
        }
    } catch (err) {
        console.error(err);
        const error = new HttpError('Cannot update client, please try again.', 500);
        return next(error);
    }
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        const error = new HttpError('Wrong client id.', 400);
        return next(error);
    }

    try {
        const result = await Client.destroy({where: {id: id}});
        if (result === 1) {
            res.status(200).json({id});
        } else {
            res.status(400).send({
                message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
            });
        }
    } catch (err) {
        console.error(err);
        const error = new HttpError('Cannot delete client, please try again.', 500);
        return next(error);
    }
};
