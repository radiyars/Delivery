import { useEffect, useState } from "react";
import Categories from "../сomponents/Categories";
import Sort from "../сomponents/Sort";
import Skeleton from "./../сomponents/PizzaBlock/Skeleton";
import PizzaBlock from "./../сomponents/PizzaBlock/index";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: "популярности",
        sortProperty: "rating",
    });

    useEffect(() => {
        setIsLoading(true);
        fetch(
            // "https://64dc883ce64a8525a0f6a48c.mockapi.io/items?category=" +
            `https://64dc883ce64a8525a0f6a48c.mockapi.io/items?
			${categoryId > 0 ? `category=${categoryId}` : ""}
			&sortBy=${sortType.sortProperty}&order=desc`
        )
            .then((res) => {
                return res.json();
            })
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={setCategoryId}
                />
                <Sort value={sortType} onChangeSort={setSortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
        </div>
    );
};

export default Home;
