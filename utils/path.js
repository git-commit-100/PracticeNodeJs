// getting root file from directory irrespective of OS

// require -> node global var
// .main -> entry point for node app

const path = require("path");

module.exports = path.dirname(require.main.filename);
