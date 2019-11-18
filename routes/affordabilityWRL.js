var express = require("express");
var router = express.Router();

var affordabilityWRLBerlinController = require("../controllers/affordabilityWRLBerlinController");
var affordabilityWRLBboxController = require("../controllers/affordabilityWRLBboxController");
var validator = require("../helpers/validator");

router.get(
  "/berlin/:income/:rooms",
  validator.affordabilityBerlin,
  affordabilityWRLBerlinController.index
);

router.get(
  "/bbox/:bbox/:income/:rooms",
  validator.affordabilityBbox,
  affordabilityWRLBboxController.index
);

module.exports = router;
