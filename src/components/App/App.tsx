import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";

import "./App.css";

import { Nav } from "../Nav/Nav";
import { Box } from "../Box/Box";
import { Pagination } from "../Pagination/Pagination";

import { IApp } from "../../interfaces/app.interfaces";

import {
  compareBySumOfPlansPrice,
  filterAppsByCategory,
  getCategories,
  paginate,
  getPagesNumber,
} from "../../utils/utils";
import { PAGE_SIZE } from "../../config/config";

const App = () => {
  const [appsData, setAppsData] = useState<IApp[]>([]);
  const [displayedApps, setDisplayedApps] = useState<IApp[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  /**
   * A method that handles the request to get the application data.
   * Later, the app's data state will be updated and the displayed app's
   * state as well.
   *
   * @returns {Promise<void>}
   */
  const fetchAppData = async () => {
    try {
      const { data } = await axios.get<IApp[]>("apps.json");
      setAppsData(data);
      const sortedApps = data?.sort(compareBySumOfPlansPrice);
      setDisplayedApps(sortedApps);
      setTotalPages(getPagesNumber(sortedApps));
      setCategories(getCategories(data));
    } catch (err) {
      console.error(`Error on step fetching apps data: ${err}`);
    }
  };

  /**
   * A method that is triggered when one of the nav category items is clicked by the user.
   * In the end, it will be displayed to the user just the apps which belong to the clicked
   * category item in the nav.
   *
   * @param {string} category - clicked category item.
   * @returns {void}
   */
  const handleCategoryClick = (category: string) => {
    try {
      const appsFilteredByCategory = filterAppsByCategory(
        appsData,
        category
      ).sort(compareBySumOfPlansPrice);
      setSelectedCategory(category);
      setPageNumber(1);
      setDisplayedApps(appsFilteredByCategory);
      setTotalPages(getPagesNumber(appsFilteredByCategory));
    } catch (err) {
      console.error(`Error on step filtering apps data by category: ${err}`);
    }
  };

  /**
   * A method that is triggered when one of the pagination numbers is clicked by the user.
   * In the end, it will be displayed to the user just the apps which belong to the clicked
   * pagination number.
   *
   * @param {number} pageNumber - clicked page number.
   * @returns {void}
   */
  const handlePaginationClick = (pageNumber: number) => {
    try {
      if (0 < pageNumber && pageNumber <= totalPages) {
        setPageNumber(pageNumber);
      }
    } catch (err) {
      console.error(`Error on step setting pagination number: ${err}`);
    }
  };

  /**
   * A method that is triggered when the user types something in the search bar.
   * In the end, it will be displayed to the user just the app's which name matches
   * the input value typed in the search.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - event triggered when search bar input value is changed.
   * @returns {void}
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const appsFilteredByAppName = event?.currentTarget?.value
        ? appsData
            ?.filter(
              ({ name }) =>
                name
                  .toLowerCase()
                  .indexOf(event.currentTarget.value.toLowerCase()) > -1
            )
            .sort(compareBySumOfPlansPrice)
        : appsData;
      setSelectedCategory("");
      setPageNumber(1);
      setDisplayedApps(appsFilteredByAppName);
      setTotalPages(getPagesNumber(appsFilteredByAppName));
    } catch (err) {
      console.error(
        `Error on step filtering apps by appName on search field: ${err}`
      );
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  return (
    <div className="flex-container">
      <Nav
        categories={categories}
        onCategoryClick={handleCategoryClick}
        activeCategory={selectedCategory}
      />
      ,
      <section className="apps-list">
        <header>
          <input
            type="text"
            placeholder="Search App"
            onChange={handleInputChange}
          />
        </header>
        <ul>
          {paginate(displayedApps, PAGE_SIZE, pageNumber)?.map((apps) => (
            <Box
              key={apps.id}
              id={apps.id}
              name={apps.name}
              description={apps.description}
              categories={apps.categories}
              subscriptions={apps.subscriptions}
            />
          ))}
        </ul>
        <Pagination
          pagesNumber={totalPages}
          onClickPagination={handlePaginationClick}
          activePage={pageNumber}
        />
      </section>
    </div>
  );
};

export default App;
