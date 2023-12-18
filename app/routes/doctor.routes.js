const express = require('express');
const doctors = require("../controllers/doctor.controller");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use(checkAuth);

router.get("/", doctors.findAll);

module.exports = router;
