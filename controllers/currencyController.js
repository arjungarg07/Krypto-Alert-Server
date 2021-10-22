const fetch = require("isomorphic-fetch");
const Currency = require("../models/CurrencyModel");
const coins = require("../acronym.json");

const resourceUrl = process.env.TICKER_API;
const CurrencyOID = process.env.CURRENCY_OID;
class currencyController {
  async update() {
    try {
      const data = await fetch(resourceUrl);
      const results = await data.json();
      const currency = {};
      results.forEach((item) => {
        const coinName = item.name;
        const acronym = item.symbol.toUpperCase();
        const change24H = item?.market_data?.price_change_percentage_24h;
        const change1YR = item?.market_data?.price_change_percentage_1y;
        const inr_obj = {
          coinName,
          price: item?.market_data?.current_price?.inr,
          change24H,
          change1YR,
        };
        const usd_obj = {
          coinName,
          price: item?.market_data?.current_price?.usd,
          change24H,
          change1YR,
        };
        currency[`${acronym}USDT`] = usd_obj;
        currency[acronym] = inr_obj;
      });
      await Currency.findByIdAndUpdate(CurrencyOID, currency);
    } catch (err) {
      console.log(err);
    }
  }

  async getTop(req, res) {
    try {
      const id = process.env.CURRENCY_OID;
      const results = await Currency.findById(id);
      const { BTCUSDT, BNBUSDT, ETHUSDT, DOGEUSDT, ADAUSDT, XRPUSDT } =
        results._doc;
      // console.log(results._doc.BTC);
      const filteredResults = {
        BTCUSDT,
        BNBUSDT,
        ETHUSDT,
        DOGEUSDT,
        ADAUSDT,
        XRPUSDT,
      };
      const resultArray = [];
      for (const [key, value] of Object.entries(filteredResults)) {
        const obj = {acronym: key,...value};
        resultArray.push(obj);
      }
      res.send({
        status: 1,
        msg: "Data fetched Successfully",
        data: resultArray,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: 0, msg: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const id = process.env.CURRENCY_OID;
      const results = await Currency.findById(id);
      // eslint-disable-next-line no-unused-vars
      const { _id, __v, ...filteredData } = results._doc;
      const resultArray = [];
      for (const [key, value] of Object.entries(filteredData)) {
        const obj = {acronym: key,...value};
        resultArray.push(obj);
      }
      res.send({
        status: 1,
        msg: "Data fetched Successfully",
        data: resultArray
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: 0, msg: "Internal Server Error" });
    }
  }
}

module.exports = new currencyController();
