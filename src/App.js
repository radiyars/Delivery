import React, { useEffect, useState } from "react";
import "./scss/app.scss";
import Categories from "./сomponents/Categories";
import Header from "./сomponents/Header";
import PizzaBlock from "./сomponents/PizzaBlock";
import Sort from "./сomponents/Sort";

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://64dc883ce64a8525a0f6a48c.mockapi.io/items")
            .then((res) => {
                return res.json();
            })
            .then((arr) => {
                setItems(arr);
            });
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map((obj) => (
                            <PizzaBlock key={obj.id} {...obj} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
