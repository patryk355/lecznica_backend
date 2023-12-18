const express = require('express');
const charts = require("../controllers/chart.controller");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use(checkAuth);

router.post("/", charts.create);

router.get("/", charts.findAll);

router.put("/:id", charts.update);

module.exports = router;
