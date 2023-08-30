import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = (props) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => props.onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    // forcePage={props.currentPage - 1}
  />
);

export default Pagination;
