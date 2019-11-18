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
  const { income, rooms } = req.params;
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
    "SELECT mw_data.geo_ortsteil_id AS ot_id, mw_data.geo_ortsteil AS ot_name, SUM(CASE WHEN cst_md_gesamtmiete <= ? * 0.3 THEN 1 ELSE 0 END) AS ot_affordableFlats, count(*) as ot_totalFlats FROM mw_data WHERE cst_md_gesamtmiete != 'NA' AND " +
      roomsQuery +
      " GROUP BY mw_data.geo_ortsteil HAVING ot_totalFlats >= 10",
    [income],
    (err, rows) => {
      if (typeof rows == "undefined" || rows.length == 0 || err) {
        res.status(500).json({
          errors: "no result",
          reqData: {
            income: income,
            rooms: rooms
          }
        });
      } else {
        const data = [];
        const berlinData = [];
        model.db.get(
          "SELECT COUNT(*) AS berlin_totalFlats, SUM(CASE WHEN cst_md_gesamtmiete <= ? * 0.3 THEN 1 ELSE 0 END) AS berlin_affordableFlats FROM mw_data WHERE cst_md_gesamtmiete != 'NA' AND " +
            roomsQuery,
            [income],
          (err, row) => {
            if (err) {
              console.log(err)
            }
            row.berlin_soaf =
            Math.round((row.berlin_affordableFlats / row.berlin_totalFlats) * 100) /
            100;
            berlinData.push(row);
            rows.forEach(row => {
              row.ot_soaf =
                Math.round((row.ot_affordableFlats / row.ot_totalFlats) * 100) /
                100;
              data.push(row);
            });
            res.send({
              reqData: {
                income: income,
                rooms: rooms
              },
              berlinData: berlinData,
              resData: data
            });
          }
        );
      }
    }
  );
};
