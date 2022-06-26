import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import SearchResults from "./components/SearchResults";
import SearchAppBar from "./components/Search";


// + Initiate the search functionality by opening the application through url containing
//      the pair string: `http://url.com/{cryptocurrency_pair}/`,
//      and opening the detail view on a pair by `http://url.com/{cryptocurrency_pair}/details`

// BONUS:
// + While staying on the results page, update the market prices automatically in a reasonable time intervals.

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const Details = () => {
    return <div>Details page</div>;
  };

  const Results = () => {
    // Loading should be set in store
    return (
      <>
        <Backdrop
          sx={{
            color: "#0c3b69",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <SearchResults />
      </>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchAppBar />}>
          <Route path="/:search" element={<Results />} />
          <Route path="/:search/details" element={<Details />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
