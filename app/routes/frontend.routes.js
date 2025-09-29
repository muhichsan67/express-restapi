const express = require('express');
const router = express.Router();
const controller = require("../controllers/frontend.controller");

// Middleware header untuk semua request ke router ini

router.get("/get-property", controller.getProperty);

module.exports = router;
