import "./scss/app.scss";
import Categories from "./сomponents/Categories";
import Header from "./сomponents/Header";
import PizzaBlock from "./сomponents/PizzaBlock";
import Sort from "./сomponents/Sort";
import React from "react";

function App() {
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
                        <PizzaBlock title="Мексиканская" price="500" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
