const express = require('express');
const patients = require("../controllers/patient.controller");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use(checkAuth);

router.post("/", patients.create);

router.get("/", patients.findAll);

router.put("/:id", patients.update);

module.exports = router;
