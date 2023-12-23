const db = require('../models');
const HttpError = require('../utils/http-error');
const Vaccination = db.vaccinations;
const {
    stringRequiredValidator,
    stringValidator,
    numberValidator,
    dateValidator,
} = require('../utils/validators');

exports.findAll = async (req, res, next) => {
    let data;

    try {
        data = await Vaccination.findAll();
        res.status(200).json(data);
    } catch (err) {
        const error = new HttpError(
            'Fetching vaccinations failed, please try again.',
            500
        );
        return next(error);
    }
};

exports.create = async (req, res, next) => {
    const {
        type,
        serial_number,
        apply_date,
        expiration_date,
        notes,
        appointmentId,
    } = req.body;

    if (
        !stringRequiredValidator(type) ||
        !stringRequiredValidator(serial_number) ||
        !dateValidator(apply_date) ||
        !dateValidator(expiration_date) ||
        !numberValidator(appointmentId)
    ) {
        const error = new HttpError('invalid_args', 400);
        return next(error);
    }

    const data = {
        type,
        serial_number,
        apply_date,
        expiration_date,
        appointmentId,
        notes: stringValidator(notes) ? notes : '',
    };

    const newVaccination = Vaccination.build(data);

    try {
        const result = await newVaccination.save();
        res.status(201).json(result);
    } catch (err) {
        console.error('err', err);
        const error = new HttpError(
            'Cannot create vaccination, please try again.',
            500
        );
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const {
        type,
        serial_number,
        apply_date,
        expiration_date,
        notes,
        appointmentId,
    } = req.body;

    if (!id) {
        const error = new HttpError('Wrong vaccination id.', 400);
        return next(error);
    }

    const data = {};

    if (stringRequiredValidator(type)) {
        data.type = type;
    }
    if (stringRequiredValidator(serial_number)) {
        data.serial_number = serial_number;
    }
    if (dateValidator(apply_date)) {
        data.apply_date = apply_date;
    }
    if (dateValidator(expiration_date)) {
        data.expiration_date = expiration_date;
    }
    if (stringValidator(notes)) {
        data.notes = notes;
    }
    if (numberValidator(appointmentId)) {
        data.appointmentId = appointmentId;
    }

    try {
        const result = await Vaccination.update(data, {where: {id: id}});
        if (result[0] === 1) {
            res.status(201).json(data);
        } else {
            res.status(400).send({
                message: `Cannot update vaccination with id=${id}. Maybe vaccination was not found or args are not valid!`,
            });
        }
    } catch (err) {
        console.error(err);
        const error = new HttpError(
            'Cannot update vaccination, please try again.',
            500
        );
        return next(error);
    }
};
