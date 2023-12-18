const db = require('../models');
const HttpError = require('../utils/http-error');
const Patient = db.patients;
const {stringRequiredValidator, numberValidator, dateValidator, stringValidator} = require('../utils/validators');

exports.findAll = async (req, res, next) => {
    let data;

    try {
        data = await Patient.findAll();
        res.status(200).json(data);
    } catch (err) {
        const error = new HttpError('Fetching patients failed, please try again.', 500);
        return next(error);
    }
};

exports.create = async (req, res, next) => {
    const {species, strain, coloration, name, birth_date, weight, drugs, allergies, clientId} = req.body;

    if (!stringRequiredValidator(species) || !stringRequiredValidator(strain) || !stringRequiredValidator(coloration) || !stringRequiredValidator(name) || !dateValidator(birth_date) || !numberValidator(weight)) {
        const error = new HttpError('invalid_args', 400);
        return next(error);
    }

    const data = {
        species,
        strain,
        coloration,
        name,
        birth_date,
        weight,
        drugs: typeof drugs === 'string' ? drugs : '',
        allergies: typeof allergies === 'string' ? allergies : '',
    }

    if (numberValidator(clientId)) {
        data.clientId = clientId;
    }

    const newPatient = Patient.build(data);

    try {
        const result = await newPatient.save();
        res.status(201).json(result);
    } catch (err) {
        console.error('err', err)
        const error = new HttpError('Cannot create patient, please try again.', 500);
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const {species, strain, coloration, name, birth_date, weight, drugs, allergies, clientId} = req.body;

    if (!id) {
        const error = new HttpError('Wrong patient id.', 400);
        return next(error);
    }

    const data = {};

    if (stringRequiredValidator(species)) {
        data.species = species;
    }
    if (stringRequiredValidator(strain)) {
        data.strain = strain;
    }
    if (stringRequiredValidator(coloration)) {
        data.coloration = coloration;
    }
    if (stringRequiredValidator(name)) {
        data.name = name;
    }
    if (stringValidator(drugs)) {
        data.drugs = drugs;
    }
    if (stringValidator(allergies)) {
        data.allergies = allergies;
    }
    if (dateValidator(birth_date)) {
        data.birth_date = birth_date;
    }
    if (numberValidator(weight)) {
        data.weight = weight;
    }
    if (numberValidator(clientId)) {
        data.clientId = clientId;
    }

    try {
        const result = await Patient.update(data, {where: {id: id}});
        if (result[0] === 1) {
            res.status(200).json(data);
        } else {
            res.status(400).send({
                message: `Cannot update Patient with id=${id}. Maybe Patient was not found or args are not valid!`
            });
        }
    } catch (err) {
        console.error(err);
        const error = new HttpError('Cannot update Patient, please try again.', 500);
        return next(error);
    }
};
