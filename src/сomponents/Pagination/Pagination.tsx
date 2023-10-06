import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PagintaionProps = {
  currentPage: number;
  onChangePage: (variable: number) => void;
};

const Pagination: React.FC<PagintaionProps> = ({
  currentPage,
  onChangePage,
}) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={currentPage - 1}
  />
);

export default Pagination;
