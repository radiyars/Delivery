import qs from "qs";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectFilters,
  selectItemsData,
  setFilters,
  setcurrentPage,
} from "../redux/slices/filterSlice";
import { fetchItems } from "../redux/slices/itemsSlice";
import Categories from "../сomponents/Categories";
import Pagination from "../сomponents/Pagination/Pagination";
import Sort, { sortList } from "../сomponents/Sort";
import ItemBlock from "../сomponents/ItemBlock/ItemBlock";
import Skeleton from "../сomponents/ItemBlock/Skeleton";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortType, searchText, currentPage } =
    useSelector(selectFilters);
  const { items, status } = useSelector(selectItemsData);

  const getItems = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchText ? `search=${searchText}` : "";

    dispatch(
      // @ts-ignore
      fetchItems({
        currentPage,
        category,
        sortProperty: sortType.sortProperty,
        search,
      })
    );

    window.scrollTo(0, 0);
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
    // if (!isSearch.current) {
    // Запрос данных при изменении параметров фильтрации
    getItems();
    // }

    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchText, currentPage]);

  const onChangePage = (page: number) => {
    dispatch(setcurrentPage(page));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка😕</h2>
          <p>Не удалось загрузить товары</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj: any) => (
                <Link key={obj.id} to={`/item/${obj.id}`}>
                  <ItemBlock {...obj} />
                </Link>
              ))}
        </div>
      )}
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};

export default Home;
