import { IApp, ISubscription } from "../interfaces/app.interfaces";
import { PAGE_SIZE } from "../config/config";

/**
 * A method that gets the all possible categories used in the
 * application data (without duplicated categories).
 *
 * @param {IApp[]} appsData - applications data.
 * @returns {string[]}
 */
const getCategories = (appsData: IApp[]): string[] => {
  const categoryList = new Set<string>();
  appsData?.forEach(({ categories }) => {
    categories?.forEach(categoryList.add, categoryList);
  });
  return Array.from(categoryList).sort();
};

/**
 * A method that gets the all apps that belong to a certain category.
 * Note: one app can belong to more than one category.
 *
 * @param {IApp[]} appsData - applications data.
 * @returns {IApp[]}
 */
const filterAppsByCategory = (appsData: IApp[], category: string): IApp[] => {
  return appsData?.filter(({ categories }) => {
    return categories?.includes(category);
  });
};

/**
 * A method that sorts the apps by ascending order of the
 * sum of the plans price.
 *
 * @param {IApp} a
 * @param {IApp} b
 * @returns {-1 | 0 | 1}
 */
const compareBySumOfPlansPrice = (a: IApp, b: IApp) => {
  const getTotal = (elements: ISubscription[], property: "price") => {
    return elements?.reduce((prev, cur) => {
      return prev + cur[property];
    }, 0);
  };

  const totalA = getTotal(a.subscriptions, "price");
  const totalB = getTotal(b.subscriptions, "price");
  if (totalA < totalB) {
    return -1;
  }
  if (totalA > totalB) {
    return 1;
  }
  return 0;
};

/**
 * A method that gets the minimum page number to paginate
 * the apps with page size = PAGE_SIZE
 *
 * @param {IApp[]} displayedApps
 * @returns {number}
 */
const getPagesNumber = (displayedApps: IApp[]): number => {
  return Math.ceil(displayedApps?.length / PAGE_SIZE);
};

/**
 * A method that gets the apps that belong to a certain page number
 * due to the apps pagination.
 *
 * @param {IApp[]} displayedApps
 * @returns {number}
 */
const paginate = (apps: IApp[], pageSize: number, pageNumber: number) => {
  return apps.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export {
  getCategories,
  filterAppsByCategory,
  compareBySumOfPlansPrice,
  getPagesNumber,
  paginate,
};
