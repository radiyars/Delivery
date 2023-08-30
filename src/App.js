import React, { useState } from "react";
import "./scss/app.scss";
import Header from "./сomponents/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

export const SearchContext = React.createContext();

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchText, setSearchText }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
