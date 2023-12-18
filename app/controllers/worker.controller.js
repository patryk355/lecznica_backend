const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../models');
const HttpError = require('../utils/http-error');
const Worker = db.workers;

exports.auth = async (req, res, next) => {
    const {login, password} = req.body;

    let existingWorker;

    try {
        existingWorker = await Worker.findOne({where: {login: login}});
    } catch (err) {
        const error = new HttpError('Logging in failed, please try again later.', 500);
        return next(error);
    }

    if (!existingWorker) {
        const error = new HttpError('Invalid credentials, could not log you in.', 403);
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingWorker.password);
    } catch (err) {
        const error = new HttpError('Could not log you in, please check your credentials and try again.', 500);
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError('Invalid credentials, could not log you in.', 403);
        return next(error);
    }

    let token;

    try {
        token = jwt.sign({
            userId: existingWorker.id,
            login: existingWorker.login
        }, process.env.JWT_KEY);
    } catch (err) {
        const error = new HttpError('Logging in failed, please try again.', 500);
        return next(error);
    }

    res.status(201).json({
        id: existingWorker.id,
        login: existingWorker.login,
        is_admin: existingWorker.is_admin,
        token: token
    });
};
