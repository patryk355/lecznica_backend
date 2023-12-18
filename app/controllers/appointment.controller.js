const db = require('../models');
const HttpError = require('../utils/http-error');
const Appointment = db.appointments;
const {stringRequiredValidator, stringValidator, numberValidator, dateValidator} = require('../utils/validators');

exports.findAll = async (req, res, next) => {
    let data;

    try {
        data = await Appointment.findAll();
        res.status(200).json(data);
    } catch (err) {
        const error = new HttpError('Fetching appointments failed, please try again.', 500);
        return next(error);
    }
};

exports.create = async (req, res, next) => {
    const {date, type, notes, doctorId, patientId} = req.body;

    if (!dateValidator(date) || !stringRequiredValidator(type) || !['konsultacja', 'szczepienie', 'zabieg'].includes(type) || !numberValidator(doctorId) || !numberValidator(patientId)) {
        const error = new HttpError('invalid_args', 400);
        return next(error);
    }

    const data = {date, type, doctorId, patientId, notes: notes && stringValidator(notes) ? notes : ''};

    const newAppointment = Appointment.build(data);

    try {
        const result = await newAppointment.save();
        res.status(201).json(result);
    } catch (err) {
        console.error('err', err)
        const error = new HttpError('Cannot create appointment, please try again.', 500);
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const {date, type, notes, doctorId} = req.body;

    if (!id) {
        const error = new HttpError('Wrong appointment id.', 400);
        return next(error);
    }

    const data = {};

    if (dateValidator(date)) {
        data.date = date;
    }
    if (stringRequiredValidator(type) && ['konsultacja', 'szczepienie', 'zabieg'].includes(type)) {
        data.type = type;
    }
    if (stringValidator(notes)) {
        data.notes = notes;
    }
    if (numberValidator(doctorId)) {
        data.doctorId = doctorId;
    }

    try {
        const result = await Appointment.update(data, {where: {id: id}});
        if (result[0] === 1) {
            res.status(201).json(data);
        } else {
            res.status(400).send({
                message: `Cannot update appointment with id=${id}. Maybe appointment was not found or args are not valid!`
            });
        }
    } catch (err) {
        console.error(err);
        const error = new HttpError('Cannot update appointment, please try again.', 500);
        return next(error);
    }
};
