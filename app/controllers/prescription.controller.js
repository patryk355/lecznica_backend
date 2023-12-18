const db = require('../models');
const HttpError = require('../utils/http-error');
const Prescription = db.prescriptions;
const {stringRequiredValidator, numberValidator, dateValidator} = require('../utils/validators');

exports.findAll = async (req, res, next) => {
    let data;

    try {
        data = await Prescription.findAll();
        res.status(200).json(data);
    } catch (err) {
        const error = new HttpError('Fetching prescriptions failed, please try again.', 500);
        return next(error);
    }
};

exports.create = async (req, res, next) => {
    const {number, date, drug_name, dose, packages_amount, appointmentId} = req.body;

    if (!stringRequiredValidator(number) || !dateValidator(date) || !stringRequiredValidator(drug_name) || !numberValidator(dose) || !numberValidator(packages_amount) || !numberValidator(appointmentId)) {
        const error = new HttpError('invalid_args', 400);
        return next(error);
    }

    const data = {
        number,
        date,
        drug_name,
        dose,
        packages_amount,
        appointmentId
    };

    const newPrescription = Prescription.build(data);

    try {
        const result = await newPrescription.save();
        res.status(201).json(result);
    } catch (err) {
        console.error('err', err)
        const error = new HttpError('Cannot create prescription, please try again.', 500);
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const {number, date, drug_name, dose, packages_amount, appointmentId} = req.body;

    if (!id) {
        const error = new HttpError('Wrong prescription id.', 400);
        return next(error);
    }

    const data = {};

    if (stringRequiredValidator(number)) {
        data.number = number;
    }
    if (dateValidator(date)) {
        data.date = date;
    }
    if (stringRequiredValidator(drug_name)) {
        data.drug_name = drug_name;
    }
    if (numberValidator(dose)) {
        data.dose = dose;
    }
    if (numberValidator(packages_amount)) {
        data.packages_amount = packages_amount;
    }
    if (numberValidator(appointmentId)) {
        data.appointmentId = appointmentId;
    }

    try {
        const result = await Prescription.update(data, {where: {id: id}});
        if (result[0] === 1) {
            res.status(201).json(data);
        } else {
            res.status(400).send({
                message: `Cannot update prescription with id=${id}. Maybe prescription was not found or args are not valid!`
            });
        }
    } catch (err) {
        console.error(err);
        const error = new HttpError('Cannot update prescription, please try again.', 500);
        return next(error);
    }
};
