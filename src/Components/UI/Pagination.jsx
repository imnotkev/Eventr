import React from "react";

const Pagination = ({ eventsPerPage, totalEvents, paginate, currentPage }) => {
  const pageNumbers = [];
  const [currPageNumber, setCurrPageNumber] = React.useState(1);

  for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <ul className="pagination animate__animated animate__fadeIn animate__faster">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination__list">
            <button
              onClick={() => {
                paginate(number);
                setCurrPageNumber(number);
              }}
              className={
                number === currentPage
                  ? "btn pagination__link pagination__link--curr"
                  : "btn pagination__link"
              }
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination;
