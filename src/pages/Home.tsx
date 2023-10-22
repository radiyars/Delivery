import qs from "qs";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import Categories from "../сomponents/Categories";
import ItemBlock from "../сomponents/ItemBlock/ItemBlock";
import Skeleton from "../сomponents/ItemBlock/Skeleton";
import Pagination from "../сomponents/Pagination/Pagination";
import SortPopup from "../сomponents/SortPopup";

import { selectFilters, selectItemsData } from "../redux/filter/selectors";
import { fetchItems } from "../redux/item/asyncActions";
import { setcurrentPage } from "../redux/filter/slice";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, searchText, currentPage } =
    useSelector(selectFilters);
  const { items, status } = useSelector(selectItemsData);

  const getItems = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchText ? `search=${searchText}` : "";

    dispatch(
      fetchItems({
        currentPage: String(currentPage),
        categoryId: category,
        sortProperty: sort.sortBy,
        search,
      })
    );

    window.scrollTo(0, 0);
  };

  //! Если это не первый рендер, то подготоавливаем адресную строку с помощью библиотеки "qs"
  //   useEffect(() => {
  //     if (isMounted.current) {
  //       const queryString = qs.stringify(
  //         {
  //           sortProperty: sort.sortBy,
  //           categoryId,
  //           currentPage: currentPage,
  //         },
  //         { skipNulls: true }
  //       );
  //       navigate(`?${queryString}`);

  //       if (!window.location.search) {
  //         dispatch(fetchItems({} as FetchItems));
  //       }
  //     }
  //     // Первый рендер - ок!
  //     isMounted.current = true;
  //   }, [categoryId, sort.sortBy, currentPage]);

  //! Если при первом рендере получили данные из адресной строчки, то парсим параметры филтрации в редакс
  //   useEffect(() => {
  //     if (window.location.search) {
  //       const params = qs.parse(
  //         window.location.search.substring(1)
  //       ) as unknown as FetchItems;
  //       const sort = SORT_LIST.find((obj) => obj.sortBy === params.sortProperty);

  //       dispatch(
  //         setFilters({
  //           searchText: params.search,
  //           categoryId: Number(params.categoryId),
  //           currentPage: Number(params.currentPage),
  //           sort: sort || SORT_LIST[0],
  //         })
  //       );
  //     }
  //     isSearch.current = true;
  //   }, []);

  // При первом рендере запрашиваем пиццы.
  useEffect(() => {
    // Если пришил параметры из адресной строки, то ничего не делай
    // if (!isSearch.current) {
    // Запрос данных при изменении параметров фильтрации
    getItems();
    // }

    isSearch.current = false;
  }, [categoryId, sort.sortBy, searchText, currentPage]);

  const onChangePage = (page: number) => {
    dispatch(setcurrentPage(page));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <SortPopup />
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
            : items.map((obj: any) => <ItemBlock key={obj.id} {...obj} />)}
        </div>
      )}
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};

export default Home;
