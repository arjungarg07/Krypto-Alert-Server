const fetch = require('isomorphic-fetch');

const Currency = require('../models/currencyModel');

const resourceUrl = process.env.TICKER_API;
const CurrencyOID = process.env.CURRENCY_OID;

class dataController {
  async update() {
    const data = await fetch(resourceUrl);
    const body = await data.json();
    const {BTC, SHIB, JULD, ICX, XMR, SAFEMOON, WIN, DOGE, SIA, ICP, THETA, WAN, LET, DENT, USDT, XRP, ETH, ETHUSDT, BTCUSDT, XRPUSDT, DOGEUSDT, TRX, TRXUSDT} = body;
    const currencyData = {BTC, SHIB, JULD, ICX, XMR, SAFEMOON, WIN, DOGE, SIA, ICP, THETA, WAN, LET, DENT, USDT, XRP, ETH, ETHUSDT, BTCUSDT, XRPUSDT, DOGEUSDT, TRX, TRXUSDT};
    const result = await Currency.findByIdAndUpdate(CurrencyOID, currencyData);
    console.log(result);
  }
}

module.exports = new dataController();