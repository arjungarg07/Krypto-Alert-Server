const { configs } = require('eslint-plugin-sonarjs');
const fetch = require('isomorphic-fetch');

const Currency = require('../models/CurrencyModel');
const coins = require('../acronym.json');

const resourceUrl = process.env.TICKER_API;
const CurrencyOID = process.env.CURRENCY_OID;

class currencyController {
  async update() {
    try {
      const data = await fetch(resourceUrl);
      const body = await data.json();
      const result = await Currency.findByIdAndUpdate(CurrencyOID, body);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async getTop(req,res) {
    try {
      const id = process.env.CURRENCY_OID;
      const results = await Currency.findById(id);
      const {BTC,BNB,ETH,DOGE,ADA,XRP} = results._doc;
      // console.log(results._doc.BTC);
      const filteredResults = {BTC,BNB,ETH,DOGE,ADA,XRP};
      const resultArray = [];
      for (const [key, value] of Object.entries(filteredResults)) {
        const name = key.includes('USDT') ? key.replace(/USDT/g, '') : key.toLowerCase();
        const coinName = coins[name.toLowerCase()];
        resultArray.push({
          coinName,
          acronym: key,
          highest_buy_bid: value && value.highest_buy_bid,
          lowest_sell_bid: value && value.lowest_sell_bid,
          last_traded_price: value && value.last_traded_price,
          yes_price: value && value.yes_price,
          volumeMax: value && value.volume && value.volume.max,
          volumeMin: value && value.volume && value.volume.min,
          volume: value && value.volume && value.volume.volume,
        });
      }
      res.send({status: 1, msg: 'Data fetched Successfully', data: resultArray });
    } catch (err) {
      console.log(err);
      res.status(500).send({status: 0, msg: 'Internal Server Error'});
    }
  }

  async getAll(req,res) {
    try {
      const id = process.env.CURRENCY_OID;
      const results = await Currency.findById(id);
      const { _id, ...final} = results._doc;
      const resultArray = [];
      for (const [key, value] of Object.entries(final)) {
        const name = key.includes('USDT') ? key.replace(/USDT/g, '') : key.toLowerCase();
        const coinName = coins[name.toLowerCase()];
        resultArray.push({
          coinName,
          acronym: key,
          highest_buy_bid: value && value.highest_buy_bid,
          lowest_sell_bid: value && value.lowest_sell_bid,
          last_traded_price: value && value.last_traded_price,
          yes_price: value && value.yes_price,
          volumeMax: value && value.volume && value.volume.max,
          volumeMin: value && value.volume && value.volume.min,
          volume: value && value.volume && value.volume.volume,
        });
      }
      res.send({status: 1, msg: 'Data fetched Successfully', data: resultArray });
    } catch (err) {
      console.log(err);
      res.status(500).send({status: 0, msg: 'Internal Server Error'});
    }
  }
}

module.exports = new currencyController();