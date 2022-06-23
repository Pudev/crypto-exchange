import { useState } from "react";
import SearchAppBar from "./components/Search";
import SearchResults from "./components/SearchResults";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import {
  fetchBinanceData,
  fetchKraken,
  fetchHuobi,
} from "./service/exchange-api";

// + when click on price view additional historical information about the last few trades (sell/buy)
//      on that exchange, visualized in a modal window.

// + Initiate the search functionality by opening the application through url containing
//      the pair string: `http://url.com/{cryptocurrency_pair}/`,
//      and opening the detail view on a pair by `http://url.com/{cryptocurrency_pair}/details`

// + Loading

// BONUS:
// + While staying on the results page, update the market prices automatically in a reasonable time intervals.

// TODO:
// handle error when the api are throwing errors
// extract constant of the Exchanges
// extract base-api file

const App = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPriceData = async (search) => {
    // not working - CORS ERROR
    // fetchBitfinexData();
    setIsLoading(true);

    const binanceData = await fetchBinanceData(search);
    const krakenData = await fetchKraken(search);
    const huobiData = await fetchHuobi(search);

    setIsLoading(false);
    return [binanceData, krakenData, huobiData];
  };

  const onSearch = async (value) => {
    const removeCryptoPairSlash = value.replace("/", "");
    const res = await fetchPriceData(removeCryptoPairSlash);
    setSearchResult([...res]);
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
      <SearchResults searchResult={searchResult} />
    </div>
  );
};

export default App;
