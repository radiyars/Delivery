import axios from "axios";
import qs from "qs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setcurrentPage, setFilters } from "../redux/slices/filterSlice";
import Categories from "../сomponents/Categories";
import Pagination from "../сomponents/Pagination/Pagination";
import Sort, { sortList } from "../сomponents/Sort";
import Skeleton from "./../сomponents/PizzaBlock/Skeleton";
import PizzaBlock from "./../сomponents/PizzaBlock/PizzaBlock";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { categoryId, sortType, searchText, currentPage } = useSelector(
        (state) => state.filter
    );

    const fetchPizzas = () => {
        setIsLoading(true);
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchText ? `search=${searchText}` : "";

        axios
            .get(
                `https://64dc883ce64a8525a0f6a48c.mockapi.io/items?page=${currentPage}&limit=4&
    		${category}&sortBy=${sortType.sortProperty}&${search}`
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            });
    };

    // Если это не первый рендер, то подготоавливаем адресную строку с помощью библиотеки "qs"
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId,
                currentPage: currentPage,
            });
            navigate(`?${queryString}`);
        }
        // Первый рендер - ок!
        isMounted.current = true;
    }, [categoryId, sortType.sortProperty, currentPage]);

    // Если при первом рендере получили данные из адресной строчки, то парсим параметры филтрации в редакс
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find(
                (obj) => obj.sortProperty === params.sortProperty
            );
            dispatch(setFilters({ ...params, sort }));
        }
        isSearch.current = true;
    }, []);

    // При первом рендере запрашиваем пиццы.
    useEffect(() => {
        // Если пришил параметры из адресной строки, то ничего не делай
        if (!isSearch.current) {
            // Запрос данных при изменении параметров фильтрации
            fetchPizzas();
        }

        isSearch.current = false;

        window.scrollTo(0, 0);
    }, [categoryId, sortType.sortProperty, searchText, currentPage]);

    const onChangePage = (number) => {
        dispatch(setcurrentPage(number));
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
            <Pagination onChangePage={onChangePage} currentPage={currentPage} />
        </div>
    );
};

export default Home;
