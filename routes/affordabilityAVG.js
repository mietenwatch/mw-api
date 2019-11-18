var express = require("express");
var router = express.Router();

var affordabilityAVGBerlinController = require("../controllers/affordabilityAVGBerlinController");
var affordabilityAVGBboxController = require("../controllers/affordabilityAVGBboxController");
var validator = require("../helpers/validator");

router.get(
  "/berlin/:income/:rooms",
  validator.affordabilityBerlin,
  affordabilityAVGBerlinController.index
);

router.get(
  "/bbox/:bbox/:income/:rooms",
  validator.affordabilityBbox,
  affordabilityAVGBboxController.index
);

module.exports = router;
