var express = require("express");
var router = express.Router();

var affordabilityH4BerlinController = require("../controllers/affordabilityH4BerlinController");
var affordabilityH4BboxController = require("../controllers/affordabilityH4BboxController");
var validator = require("../helpers/validator");

router.get(
  "/berlin/:income/:rooms",
  validator.affordabilityBerlin,
  affordabilityH4BerlinController.index
);

router.get(
  "/bbox/:bbox/:income/:rooms",
  validator.affordabilityBbox,
  affordabilityH4BboxController.index
);

module.exports = router;
