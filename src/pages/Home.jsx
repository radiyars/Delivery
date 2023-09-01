import { useContext, useEffect, useState } from "react";
import Categories from "../сomponents/Categories";
import Sort from "../сomponents/Sort";
import Skeleton from "./../сomponents/PizzaBlock/Skeleton";
import PizzaBlock from "./../сomponents/PizzaBlock/index";
import Pagination from "../сomponents/Pagination/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = () => {
  const { searchText } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

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

  useEffect(() => {});
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
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
