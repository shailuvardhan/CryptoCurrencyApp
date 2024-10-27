import React, { useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
// 👆 classic theme, see below for other theme / css options
import "./index.css";

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { coinsList, pageHandler } = props;
  let totalPages = Math.ceil(coinsList.length / 10);

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with `page`
    pageHandler(page);
  }

  return (
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={(page) => handlePageChange(page)}
      //   onPageChange={setCurrentPage}
      //   onClick={pageHandler}
    />
  );
};

export default Pagination;
