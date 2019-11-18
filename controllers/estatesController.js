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
  const { company } = req.params;
  const companies = [  
  ["Ado Immobilien", "ADO Immobilien Management GmbH"],
  ["Akelius", "AKELIUS GmbH"],
  ["Degewo", "degewo AG"],
  ["Deutsche Wohnen", "Deutsche Wohnen Gruppe"],
  ["Gesobau", "GESOBAU AG"],
  ["Gewobag", "Gewobag AG"],
  ["Howoge", "HOWOGE GmbH"],
  ["Vonovia", "Vonovia SE"],
  ["Immonexxt", "Immonexxt GmbH"],
  ["Stadt und Land", "Stadt und Land GmbH"]];

  function getIndexOf(arr, k) {
    for (var i = 0; i < arr.length; i++) {
      var index = arr[i].indexOf(k);
      if (index > -1) {
        return i;
      }
    }
  }
  let reqCompany = companies[getIndexOf(companies, company)][1];

  model.db.all(
    "SELECT geo_lon, geo_lat, obj_wohnflaeche as obj_flatSize, obj_zimmer AS obj_rooms, cst_gesamtmiete AS cst_totalCosts FROM mw_data WHERE is_anbieter_agg LIKE ?",
    [reqCompany],
    (err, rows) => {
      if (typeof rows == "undefined" || rows.length == 0 || err) {
        res.status(500).json({
          errors: "no result",
          reqData: {
            company: company
          }
        });
      } else {
        let data = [];
        rows.forEach(row => {
          data.push(row);
        });
        res.send({
          reqData: {
            company: company
          },
          resData: data
        });
      }
    }
  );
};
