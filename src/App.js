import { Routes, Route } from "react-router-dom";

import SearchResults from "./components/SearchResults";
import SearchAppBar from "./components/Search";
import CryptoDetails from "./components/CryptoDetails";

const App = () => {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchAppBar />}>
            <Route path="/:search" element={<SearchResults />} />
            <Route path="/:search/details" element={<CryptoDetails />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
