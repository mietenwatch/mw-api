// INITIALIZE DATABASE
var sqlite3 = require("sqlite3").verbose();
exports.db = new sqlite3.Database("./static/mw_data.sqlite");