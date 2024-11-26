import React from "react";

const Pagination = ({ currentPage }: { currentPage: any }) => {
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      window.location.href = `/products?page=${prevPage}`;
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    window.location.href = `/products?page=${nextPage}`;
  };
  return (
    <>
      {currentPage > 1 && (
        <button onClick={handlePreviousPage} className="border p-1">
          {"<"}
        </button>
      )}
      <p className="mx-2"> {currentPage} </p>
      <button onClick={handleNextPage} className="border p-1">
        {">"}
      </button>
    </>
  );
};

export default Pagination;
