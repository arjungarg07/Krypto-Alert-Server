const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  BTC: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: { 
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  },
  SHIB: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  },
  JULD: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  },
  ICX: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  },
  XMR: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  },
  SAFEMOON: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  WIN: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  DOGE: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  SIA: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  ICP: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  THETA: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  WAN: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  LET: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  DENT: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  USDT: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  XRP: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  ETH: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  ETHUSDT: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  BTCUSDT: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  XRPUSDT: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  DOGEUSDT: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  TRX: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
  TRXUSDT: {
    highest_buy_bid: { type: Number},
    lowest_sell_bid: { type: Number},
    last_traded_price: {type: Number},
    yes_price: {type: Number},
    volume: {
      max: {type: String},
      min: {type: String},
      volume: {type: Number}
    }
  }, 
});
  
const Currency = mongoose.model('Currency', currencySchema);
module.exports = Currency;
