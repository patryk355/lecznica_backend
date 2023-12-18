const express = require('express');
const treatments = require("../controllers/treatment.controller");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use(checkAuth);

router.post("/", treatments.create);

router.get("/", treatments.findAll);

router.put("/:id", treatments.update);

module.exports = router;
