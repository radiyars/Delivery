import React from "react";
import { Route, Routes } from "react-router-dom";
import Mainlayout from "./layouts/Mainlayout";
import Cart from "./pages/Cart";
import FullItem from "./pages/FullItem";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./scss/app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="item/:id" element={<FullItem />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
