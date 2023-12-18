const db = require('../models');
const HttpError = require('../utils/http-error');
const Chart = db.charts;
const {stringRequiredValidator, numberValidator} = require('../utils/validators');

exports.findAll = async (req, res, next) => {
    let data;

    try {
        data = await Chart.findAll();
        res.status(200).json(data);
    } catch (err) {
        const error = new HttpError('Fetching charts failed, please try again.', 500);
        return next(error);
    }
};

exports.create = async (req, res, next) => {
    const {number, patientId} = req.body;

    if (!stringRequiredValidator(number) || !numberValidator(patientId)) {
        const error = new HttpError('invalid_args', 400);
        return next(error);
    }

    const data = {number, patientId, is_active: true};

    const newChart = Chart.build(data);

    try {
        const result = await newChart.save();
        res.status(201).json(result);
    } catch (err) {
        console.error('err', err)
        const error = new HttpError('Cannot create chart, please try again.', 500);
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const {number, is_active} = req.body;

    if (!id) {
        const error = new HttpError('Wrong chart id.', 400);
        return next(error);
    }

    const data = {};

    if (stringRequiredValidator(number)) {
        data.number = number;
    }
    if (typeof is_active === 'boolean') {
        data.is_active = is_active;
    }

    try {
        const result = await Chart.update(data, {where: {id: id}});
        if (result[0] === 1) {
            res.status(200).json(data);
        } else {
            res.status(400).send({
                message: `Cannot update chart with id=${id}. Maybe chart was not found or args are not valid!`
            });
        }
    } catch (err) {
        console.error(err);
        const error = new HttpError('Cannot update chart, please try again.', 500);
        return next(error);
    }
};
