const db = require('../models');
const HttpError = require('../utils/http-error');
const Treatment = db.treatments;
const {stringRequiredValidator, stringValidator, numberValidator, dateValidator} = require('../utils/validators');

exports.findAll = async (req, res, next) => {
    let data;

    try {
        data = await Treatment.findAll();
        res.status(200).json(data);
    } catch (err) {
        const error = new HttpError('Fetching treatments failed, please try again.', 500);
        return next(error);
    }
};

exports.create = async (req, res, next) => {
    const {type, date, notes, appointmentId} = req.body;

    if (!stringRequiredValidator(type) || !dateValidator(date) || !numberValidator(appointmentId)) {
        const error = new HttpError('invalid_args', 400);
        return next(error);
    }

    const data = {type, date, appointmentId, notes: stringValidator(notes) ? notes : ''};

    const newTreatment = Treatment.build(data);

    try {
        const result = await newTreatment.save();
        res.status(201).json(result);
    } catch (err) {
        console.error('err', err)
        const error = new HttpError('Cannot create treatment, please try again.', 500);
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const {type, date, notes, appointmentId} = req.body;

    if (!id) {
        const error = new HttpError('Wrong treatment id.', 400);
        return next(error);
    }

    const data = {};

    if (dateValidator(date)) {
        data.date = date;
    }
    if (stringRequiredValidator(type)) {
        data.type = type;
    }
    if (stringValidator(notes)) {
        data.notes = notes;
    }
    if (numberValidator(appointmentId)) {
        data.appointmentId = appointmentId;
    }

    try {
        const result = await Treatment.update(data, {where: {id: id}});
        if (result[0] === 1) {
            res.status(201).json(data);
        } else {
            res.status(400).send({
                message: `Cannot update treatment with id=${id}. Maybe treatment was not found or args are not valid!`
            });
        }
    } catch (err) {
        console.error(err);
        const error = new HttpError('Cannot update treatment, please try again.', 500);
        return next(error);
    }
};
