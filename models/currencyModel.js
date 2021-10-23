const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
},{ strict: false });
  
const Currency = mongoose.model('Currency', currencySchema);
module.exports = Currency;
