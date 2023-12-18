const express = require('express');
const sicknesses = require("../controllers/sickness.controller");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use(checkAuth);

router.post("/", sicknesses.create);

router.get("/", sicknesses.findAll);

router.put("/:id", sicknesses.update);

module.exports = router;
