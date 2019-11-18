var express = require("express");
var router = express.Router();

var affordabilityWoRLBerlinController = require("../controllers/affordabilityWoRLBerlinController");
var affordabilityWoRLBboxController = require("../controllers/affordabilityWoRLBboxController");
var validator = require("../helpers/validator");

router.get(
  "/berlin/:income/:rooms",
  validator.affordabilityBerlin,
  affordabilityWoRLBerlinController.index
);

router.get(
  "/bbox/:bbox/:income/:rooms",
  validator.affordabilityBbox,
  affordabilityWoRLBboxController.index
);

module.exports = router;
