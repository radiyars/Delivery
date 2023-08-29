import React, { useState } from "react";
import "./scss/app.scss";
import Header from "./сomponents/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

function App() {
    const [filterText, setFilterText] = useState("");

    return (
        <div className="wrapper">
            <Header setFilterText={setFilterText} />
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home filterText={filterText} />}
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
