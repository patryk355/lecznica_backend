const express = require('express');
const workers = require("../controllers/worker.controller");
const router = express.Router();

router.post("/", workers.auth);

module.exports = router;
