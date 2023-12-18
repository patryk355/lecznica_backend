const express = require('express');
const clients = require("../controllers/client.controller");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use(checkAuth);

router.post("/", clients.create);

router.get("/", clients.findAll);

router.put("/:id", clients.update);

router.delete("/:id", clients.delete);

module.exports = router;
