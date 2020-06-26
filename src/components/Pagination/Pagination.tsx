import React, { SFC } from "react";

interface IPagination {
  pagesNumber: number;
  onClickPagination: (pageNumber: number) => void;
  activePage: number;
}

export const Pagination: SFC<IPagination> = ({
  pagesNumber,
  onClickPagination,
  activePage,
}) => (
  <ul className="pagination">
    <li>
      <a href="/#" onClick={() => onClickPagination(activePage - 1)}>
        &lt;
      </a>
    </li>
    {[...Array(pagesNumber)].map((_e, i) => (
      <li key={i} className={`${i + 1 === activePage ? "active" : ""}`}>
        <a href="/#" onClick={() => onClickPagination(i + 1)}>
          {i + 1}
        </a>
      </li>
    ))}
    <li>
      <a href="/#" onClick={() => onClickPagination(activePage + 1)}>
        &gt;
      </a>
    </li>
  </ul>
);
