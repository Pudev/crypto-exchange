import axios from "axios";
import { roundPrice } from "../utils/helper";
import { Exchanges } from "../utils/enums";

export const getBinanceTickerData = async (symbol) => {
  try {
    const { data } = await axios.get(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol.toUpperCase()}`
    );

    return {
      exchange: Exchanges.Binance,
      price: roundPrice(data.lastPrice),
    };
  } catch (error) {
    return {
      exchange: Exchanges.Binance,
      price: "N/A",
    };
  }
};

export const getBinanceTradesData = async (symbol) => {
  try {
    const { data } = await axios.get(
      `https://api.binance.com/api/v3/trades?symbol=${symbol.toUpperCase()}&limit=10`
    );

    const transformResult = data.map((d) => {
      return {
        amount: d.qty,
        price: roundPrice(d.price),
        direction: d.isBuyerMaker ? 'Buy' : 'Sell',
      };
    });

    return transformResult;
  } catch (error) {
    // return {
    //   exchange: Exchanges.Binance,
    //   price: "N/A",
    // };
  }
};

export const getBitfinexTickerData = async (symbol) => {
  const options = {
    method: "GET",
    url: `https://api-pub.bitfinex.com/v2/ticker/t${symbol.toUpperCase}`,
    headers: { Accept: "application/json" },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getKrakenTickerData = async (symbol) => {
  const { data } = await axios.get(
    `https://api.kraken.com/0/public/Ticker?pair=${symbol.toUpperCase()}`
  );

  if (data.error.length > 0) {
    return {
      exchange: Exchanges.Kraken,
      price: "N/A",
    };
  }

  const restData = data?.result[Object.keys(data?.result)[0]];
  const lastPrice = restData?.l[0];
  const price = roundPrice(lastPrice);
  return {
    exchange: Exchanges.Kraken,
    price,
  };
};

export const getKrakenTradesData = async (symbol) => {
  const { data } = await axios.get(
    `https://api.kraken.com/0/public/Trades?pair=${symbol.toUpperCase()}`,
  );

  if (data.error.length > 0) {
    return {
      exchange: Exchanges.Kraken,
      price: "N/A",
    };
  }

  const restData = data?.result[Object.keys(data?.result)[0]];

  const transformResult = restData.map(d => {
    return {
      amount: 20000,
      price: 333,
      direction: 'Buy'
    };
  })
  
}

export const getHuobiTickerData = async (symbol) => {
  const { data } = await axios.get(
    `https://api.huobi.pro/market/detail/merged?symbol=${symbol.toLowerCase()}`
  );

  if (data.status === "error") {
    return {
      exchange: Exchanges.Huobi,
      price: "N/A",
    };
  }

  const price = roundPrice(data?.tick?.close);
  return {
    exchange: Exchanges.Huobi,
    price,
  };
};
