import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../сomponents/Categories";
import Pagination from "../сomponents/Pagination/Pagination";
import Sort from "../сomponents/Sort";
import Skeleton from "./../сomponents/PizzaBlock/Skeleton";
import PizzaBlock from "./../сomponents/PizzaBlock/index";
import axios from "axios";
import { setCurrnetPage } from "../redux/slices/filterSlice";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { categoryId, sortType, searchText, currnetPage } = useSelector(
        (state) => state.filter
    );
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchText ? `search=${searchText}` : "";

        axios
            .get(
                `https://64dc883ce64a8525a0f6a48c.mockapi.io/items?page=${currnetPage}&limit=4&
			${category}&sortBy=${sortType.sortProperty}&${search}`
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            });
    }, [categoryId, sortType, searchText, currnetPage]);

    const onChangePage = (number) => {
        dispatch(setCurrnetPage(number));
    };

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
            <Pagination onChangePage={onChangePage} currentPage={currnetPage} />
        </div>
    );
};

export default Home;
