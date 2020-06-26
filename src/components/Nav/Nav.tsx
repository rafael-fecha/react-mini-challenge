import React, { SFC } from "react";

import { IApp } from "../../interfaces/app.interfaces";

type ValueOf<T> = T[keyof T];

interface INav {
  categories: ValueOf<Pick<IApp, "categories">>;
  onCategoryClick: (category: string) => void;
  activeCategory: string;
}

export const Nav: SFC<INav> = ({
  categories,
  onCategoryClick,
  activeCategory,
}) => (
  <nav className="nav-categories">
    <h2>Categories</h2>
    <ul className="nav-menu">
      {categories?.map((category, i) => (
        <li
          key={i}
          className={`${category === activeCategory ? "active" : ""}`}
        >
          <a href="/#" onClick={() => onCategoryClick(category)}>
            {category}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
