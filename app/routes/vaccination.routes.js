const express = require('express');
const vaccinations = require("../controllers/vaccination.controller");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use(checkAuth);

router.post("/", vaccinations.create);

router.get("/", vaccinations.findAll);

router.put("/:id", vaccinations.update);

module.exports = router;
