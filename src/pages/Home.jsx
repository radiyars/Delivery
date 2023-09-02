import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Categories from "../сomponents/Categories";
import Pagination from "../сomponents/Pagination/Pagination";
import Sort from "../сomponents/Sort";
import Skeleton from "./../сomponents/PizzaBlock/Skeleton";
import PizzaBlock from "./../сomponents/PizzaBlock/index";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { categoryId, sortType, searchText } = useSelector(
        (state) => state.filter
    );
    const [currnetPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchText ? `search=${searchText}` : "";

        fetch(
            `https://64dc883ce64a8525a0f6a48c.mockapi.io/items?page=${currnetPage}&limit=4&
			${category}&sortBy=${sortType.sortProperty}&${search}`
        )
            .then((res) => {
                return res.json();
            })
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchText, currnetPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
            <Pagination
                onChangePage={(number) => {
                    setCurrentPage(number);
                }}
                currentPage={currnetPage}
            />
        </div>
    );
};

export default Home;
