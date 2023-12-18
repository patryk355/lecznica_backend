const express = require('express');
const appointments = require("../controllers/appointment.controller");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use(checkAuth);

router.post("/", appointments.create);

router.get("/", appointments.findAll);

router.put("/:id", appointments.update);

module.exports = router;
