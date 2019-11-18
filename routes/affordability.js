var express = require("express");
var router = express.Router();

var affordabilityBerlinController = require("../controllers/affordabilityBerlinController");
var affordabilityBboxController = require("../controllers/affordabilityBboxController");
var validator = require("../helpers/validator");

router.get(
  "/berlin/:income/:rooms/:socialHousing",
  validator.affordabilityBerlin,
  affordabilityBerlinController.index
);

router.get(
  "/bbox/:bbox/:income/:rooms/:socialHousing",
  validator.affordabilityBbox,
  affordabilityBboxController.index
);

module.exports = router;
