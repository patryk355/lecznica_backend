const express = require('express');
const prescriptions = require("../controllers/prescription.controller");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use(checkAuth);

router.post("/", prescriptions.create);

router.get("/", prescriptions.findAll);

router.put("/:id", prescriptions.update);

module.exports = router;
