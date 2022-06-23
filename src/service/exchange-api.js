import axios from "axios";

export const fetchBinanceData = async (symbol) => {
  try {
    const { data } = await axios.get(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol.toUpperCase()}`
    );

    const price = parseFloat(data?.lastPrice).toFixed(4);

    return {
      exchange: "Binance",
      price: price,
    };
  } catch (error) {
    return {
      exchange: "Binance",
      price: "N/A",
    };
  }
};

export const fetchBitfinexData = async () => {
  const options = {
    method: "GET",
    url: "https://api-pub.bitfinex.com/v2/ticker/tBTCUSD",
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

export const fetchKraken = async (symbol) => {
  const { data } = await axios.get(
    `https://api.kraken.com/0/public/Ticker?pair=${symbol.toUpperCase()}`
  );

  if (data.error.length > 0) {
    return {
      exchange: "Kraken",
      price: "N/A",
    };
  }
  // obj[Object.keys(obj)[0]]

  const restData = data?.result[Object.keys(data?.result)[0]];
  const price = parseFloat(restData?.l[0]).toFixed(4);
  return {
    exchange: "Kraken",
    price,
  };
};

export const fetchHuobi = async (symbol) => {
  const { data } = await axios.get(
    `https://api.huobi.pro/market/detail/merged?symbol=${symbol.toLowerCase()}`
  );

  if (data.status === "error") {
    return {
      exchange: "Huobi",
      price: "N/A",
    };
  }

  const price = parseFloat(data?.tick?.close).toFixed(4);
  return {
    exchange: "Huobi",
    price,
  };
};
