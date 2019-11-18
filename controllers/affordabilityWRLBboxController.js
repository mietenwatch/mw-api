const model = require("../models/indexModel");
const { validationResult } = require("express-validator");

exports.index = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      res.status(422).json({
        errors: errors.array()
      })
    );
  }
  const { bbox, income, rooms } = req.params;
  bboxValues = bbox.split(",");
  const NWlat = bboxValues[0];
  const NWlon = bboxValues[1];
  const SElat = bboxValues[2];
  const SElon = bboxValues[3];
  let roomsQuery;

  switch (rooms) {
    case "1":
      roomsQuery = " obj_zimmer < 2";
      break;
    case "2":
      roomsQuery = " obj_zimmer >= 2 AND obj_zimmer < 3";
      break;
    case "3":
      roomsQuery = " obj_zimmer >= 3 AND obj_zimmer < 4";
      break;
    case "4":
      roomsQuery = " obj_zimmer >= 4 AND obj_zimmer < 5";
      break;
    case "5":
      roomsQuery = " obj_zimmer >= 5 AND obj_zimmer < 6";
      break;
    default:
      roomsQuery = " obj_zimmer < 2";
  }
  model.db.all(
    "SELECT geo_lon, geo_lat, obj_wohnflaeche as obj_flatSize, obj_zimmer AS obj_rooms, cst_md_gesamtmiete AS cst_totalCosts FROM mw_data WHERE geo_lat >= ? AND geo_lat <= ? AND geo_lon <= ? AND geo_lon >= ? AND cst_md_gesamtmiete != 'NA' AND " +
      roomsQuery,
    [NWlat, SElat, SElon, NWlon],
    (err, rows) => {
      if (typeof rows == "undefined" || rows.length == 0 || err) {
        res.status(500).json({
          errors: "no result",
          reqData: {
            income: income,
            rooms: rooms,
            bbox: {
              NWlat: NWlat,
              NWlon: NWlon,
              SElat: SElat,
              SElon: SElon
            }
          }
        });
      } else {
        let data = [];
        rows.forEach(row => {
          row.cst_affordable =
            (parseFloat(row.cst_totalCosts) <= (parseFloat(income) * 0.3)) ? true : false;
          data.push(row);
        });
        res.send({
          reqData: {
            income: income,
            rooms: rooms,
            bbox: {
              NWlat: NWlat,
              NWlon: NWlon,
              SElat: SElat,
              SElon: SElon
            }
          },
          resData: data
        });
      }
    }
  );
};
