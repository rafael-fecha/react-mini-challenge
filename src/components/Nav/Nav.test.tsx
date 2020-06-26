import React from "react";

import { render } from "@testing-library/react";
import { Nav } from "./Nav";

describe("Nav component", () => {
  it("should add active class to the clicked nav item", () => {
    let activeCategory = "";

    const handleCategoryClick = (category: string) => {
      activeCategory = category;
    };

    const { getByText, rerender } = render(
      <Nav
        categories={["Channels", "Dialer"]}
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />
    );

    getByText("Channels").click();

    rerender(
      <Nav
        categories={["Channels", "Dialer"]}
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />
    );

    const getElement: any = getByText(activeCategory.toString());
    expect(getElement.parentElement.classList.contains("active")).toBe(true);
  });
});
