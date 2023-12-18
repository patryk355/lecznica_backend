const db = require('../models');
const HttpError = require('../utils/http-error');
const Doctor = db.doctors;

exports.findAll = async (req, res, next) => {
    let data;

    try {
        data = await Doctor.findAll();
        res.status(200).json(data);
    } catch (err) {
        const error = new HttpError('Fetching doctors failed, please try again.', 500);
        return next(error);
    }
};
