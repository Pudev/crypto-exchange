import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import SearchAppBar from "./components/Search";
import SearchResults from "./components/SearchResults";
import Modal from "./components/Modal";
import CryptoDetails from "./components/CryptoDetails";

import {
  getBinanceTickerData,
  getBinanceTradesData,
  getKrakenTickerData,
  getKrakenTradesData,
  getHuobiTickerData,
  getHuobiTradesData
  // fetchBitfinexData,
} from "./service/exchange-api";

import { Exchanges } from "./utils/enums";
// + Initiate the search functionality by opening the application through url containing
//      the pair string: `http://url.com/{cryptocurrency_pair}/`,
//      and opening the detail view on a pair by `http://url.com/{cryptocurrency_pair}/details`

// BONUS:
// + While staying on the results page, update the market prices automatically in a reasonable time intervals.

const App = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCryptoDetailModal, setShowCryptoDetailModal] = useState(false);

  const onSearch = async (value) => {
    const removeCryptoPairSlash = value.replace("/", "");
    const res = await getCryptoPriceData(removeCryptoPairSlash);
    setSearchResult([...res]);
    setSearch(removeCryptoPairSlash.toUpperCase());
  };

  const onOpenDetails = (exchange) => {
    setIsLoading(true);

    getCryptoTradesDetails(exchange, search);

    setIsLoading(false);
    setShowCryptoDetailModal(true);
  };

  const getCryptoPriceData = async (search) => {
    // not working - CORS ERROR
    // fetchBitfinexData();
    setIsLoading(true);

    const binanceData = await getBinanceTickerData(search);
    const krakenData = await getKrakenTickerData(search);
    const huobiData = await getHuobiTickerData(search);

    setIsLoading(false);
    return [binanceData, krakenData, huobiData];
  };

  const getCryptoTradesDetails = async (exchange, search) => {
    let res = [];
    switch (exchange) {
      case Exchanges.Binance:
        res = await getBinanceTradesData(search);
        break;
      case Exchanges.Kraken:
        res = await getKrakenTradesData(search);
        break;
      case Exchanges.Huobi:
        res = await getHuobiTradesData(search);
        break;
      default:
        res = [];
        break;
    }

    setDetails([...res]);
  };

  return (
    <div className="App">
      <SearchAppBar onSearch={onSearch} />
      {isLoading && (
        <Backdrop
          sx={{ color: "#0c3b69", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <SearchResults
        searchResult={searchResult}
        search={search}
        onClickRow={onOpenDetails}
      />
      <Modal
        open={showCryptoDetailModal}
        onClose={() => setShowCryptoDetailModal(false)}
      >
        <CryptoDetails data={details} />
      </Modal>
    </div>
  );
};

export default App;
