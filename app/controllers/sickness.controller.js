const db = require('../models');
const HttpError = require('../utils/http-error');
const Sickness = db.sicknesses;
const {stringRequiredValidator, stringValidator, numberValidator, dateValidator} = require('../utils/validators');

exports.findAll = async (req, res, next) => {
    let data;

    try {
        data = await Sickness.findAll();
        res.status(200).json(data);
    } catch (err) {
        const error = new HttpError('Fetching sicknesses failed, please try again.', 500);
        return next(error);
    }
};

exports.create = async (req, res, next) => {
    const {name, notes, date, patientId} = req.body;

    if (!stringRequiredValidator(name) || !dateValidator(date) || !numberValidator(patientId)) {
        const error = new HttpError('invalid_args', 400);
        return next(error);
    }

    const data = {name, date, patientId, notes: stringValidator(notes) ? notes : ''};

    const newSickness = Sickness.build(data);

    try {
        const result = await newSickness.save();
        res.status(201).json(result);
    } catch (err) {
        console.error('err', err)
        const error = new HttpError('Cannot create sickness, please try again.', 500);
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const {date, name, notes, patientId} = req.body;

    if (!id) {
        const error = new HttpError('Wrong sickness id.', 400);
        return next(error);
    }

    const data = {};

    if (dateValidator(date)) {
        data.date = date;
    }
    if (stringRequiredValidator(name)) {
        data.name = name;
    }
    if (stringValidator(notes)) {
        data.notes = notes;
    }
    if (numberValidator(patientId)) {
        data.patientId = patientId;
    }

    try {
        const result = await Sickness.update(data, {where: {id: id}});
        if (result[0] === 1) {
            res.status(201).json(data);
        } else {
            res.status(400).send({
                message: `Cannot update sickness with id=${id}. Maybe sickness was not found or args are not valid!`
            });
        }
    } catch (err) {
        console.error(err);
        const error = new HttpError('Cannot update sickness, please try again.', 500);
        return next(error);
    }
};
