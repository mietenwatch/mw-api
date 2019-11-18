var express = require('express');
var router = express.Router();
var estatesController = require("../controllers/estatesController");
var validator = require("../helpers/validator");

router.get('/:company', validator.estates, estatesController.index);

module.exports = router;
