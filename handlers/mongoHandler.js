const mongoose = require("mongoose");
const settings = require("../configs/settings.json");
const moment = require("moment");
const chalk = require("chalk");

mongoose.connect("mongodb+srv://wex:wex@wex.xtauw.mongodb.net/wex?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let Databasename = "wex"
mongoose.connection.on("connected", () => {
  console.log(chalk `{cyan MongoDB } {greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} {magenta MongoDB Bağlantısı başarılı bir şekilde kuruldu.} DataBase: {yellow ${Databasename}}`);
});
mongoose.connection.on("error", () => {
  console.error(chalk `{cyan MongoDB } {greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} {magenta MongoDB Bağlantısı kurulmadı.} DataBase: {yellow ${Databasename}}`);
});
