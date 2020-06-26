import React from "react";

import { render } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { PAGE_SIZE } from "../../config/config";

describe("Pagination component", () => {
  it("should add active class to the clicked pagination number", () => {
    let activePageNumber = 1;

    const handlePaginationClick = (pageNumber: number) => {
      activePageNumber = pageNumber;
    };

    const { getByText, rerender } = render(
      <Pagination
        pagesNumber={PAGE_SIZE}
        onClickPagination={handlePaginationClick}
        activePage={activePageNumber}
      />
    );

    const getElement: any = getByText(activePageNumber.toString());
    expect(getElement.parentElement.classList.contains("active")).toBe(true);

    getByText("2").click();

    rerender(
      <Pagination
        pagesNumber={PAGE_SIZE}
        onClickPagination={handlePaginationClick}
        activePage={activePageNumber}
      />
    );

    expect(activePageNumber).toBe(2);
  });
});
