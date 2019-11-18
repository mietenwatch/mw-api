const { check } = require("express-validator");
const bboxBerlin = [52.728807, 12.937775, 52.284122, 13.934784];
const bigPlayers = [
  "Ado Immobilien",
  "Akelius",
  "Degewo",
  "Deutsche Wohnen",
  "Gesobau",
  "Gewobag",
  "Howoge",
  "Immonexxt",
  "Stadt und Land",
  "Vonovia"
];

exports.affordabilityBerlin = [
  check("income", "Please provide a valid income")
    .not()
    .isEmpty(),
  check("income", "Please provide a valid income").isFloat(),
  check("income").custom((value, { req }) => {
    if (value < 0 || value > 6000) {
      throw new Error("income: provide an income between 0 and 6000");
    }
    return true;
  }),
  check("rooms", "Please provide a valid number of rooms / persons.")
    .not()
    .isEmpty(),
  check("rooms", "Please provide a valid number of rooms / persons.").isFloat(),
  check("rooms").custom((value, { req }) => {
    if (value < 1 || value > 5) {
      throw new Error("rooms: provide a room / persons number between 1 and 5");
    }
    return true;
  })
];

exports.affordabilityBbox = [
  check("bbox").custom((value, { req }) => {
    const reqBbox = [];
    values = value.split(",");
    values.forEach(element => {
      reqBbox.push(parseFloat(element));
    });
    if (
      reqBbox[0] > bboxBerlin[0] ||
      reqBbox[0] < bboxBerlin[2] ||
      reqBbox[0] > reqBbox[2]
    ) {
      throw new Error("BBox: NW latitude not valid");
    }

    if (
      reqBbox[1] < bboxBerlin[1] ||
      reqBbox[1] > bboxBerlin[3] ||
      reqBbox[1] > reqBbox[3]
    ) {
      throw new Error("BBox: NW longitude not valid");
    }

    if (
      reqBbox[2] > bboxBerlin[0] ||
      reqBbox[2] < bboxBerlin[2] ||
      reqBbox[2] < reqBbox[0]
    ) {
      throw new Error("BBox: SE latitude not valid");
    }

    if (
      reqBbox[3] < bboxBerlin[1] ||
      reqBbox[3] > bboxBerlin[3] ||
      reqBbox[3] < reqBbox[1]
    ) {
      throw new Error("BBox: SE longitude not valid");
    }
    if (reqBbox[2] - reqBbox[0] > 0.2 || reqBbox[1] - reqBbox[4] > 0.4) {
      throw new Error("Out of max bounding box");
    }
    return true;
  }),
  check("income", "Please provide a valid income")
    .not()
    .isEmpty(),
  check("income", "Please provide a valid income").isFloat(),
  check("income").custom((value, { req }) => {
    if (value < 0 || value > 6000) {
      throw new Error("income: provide an income between 0 and 6000");
    }
    return true;
  }),
  check("rooms", "Please provide a valid number of rooms / persons.")
    .not()
    .isEmpty(),
  check("rooms", "Please provide a valid number of rooms / persons.").isFloat(),
  check("rooms").custom((value, { req }) => {
    if (value < 1 || value > 5) {
      throw new Error("rooms: provide a room / persons number between 1 and 5");
    }
    return true;
  })
];

exports.estates = [
  check("company", "Please provide a valid NW latitude.")
    .not()
    .isEmpty(),
  check("company", "Please provide a valid NW latitude.").isString(),
  check("company").custom((value, { req }) => {
    if (bigPlayers.indexOf(value) >= 0) {
      return true;
    } else {
      throw new Error("company: value not valid");
    }
  })
];
