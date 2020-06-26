import {
  getPagesNumber,
  paginate,
  filterAppsByCategory,
  getCategories,
  compareBySumOfPlansPrice,
} from "./utils";
import { PAGE_SIZE } from "../config/config";

const appsJSONExample = [
  {
    id: "9b565b11-7311-5b5e-a699-97873dffb361",
    name: "Voice Report",
    description: "Calls reporting and analytics of your calls.",
    categories: ["Voice Analytics", "Reporting", "Optimization"],
    subscriptions: [
      {
        name: "Trial",
        price: 0,
      },
      {
        name: "Professional",
        price: 3500,
      },
    ],
  },
  {
    id: "470fedc5-489e-5acb-a200-c85adaa18356",
    name: "Power Dialer",
    description:
      "Auto dialer that will help increase your connect rates and talk time.",
    categories: ["Dialer"],
    subscriptions: [
      {
        name: "Trial",
        price: 0,
      },
      {
        name: "Professional",
        price: 4500,
      },
      {
        name: "Premium",
        price: 6000,
      },
    ],
  },
  {
    id: "52714d80-e3c4-5593-b9a3-e2ff484be372",
    name: "Smart Text",
    description: "Use SMS to help you communicate with your customers.",
    categories: ["Channels"],
    subscriptions: [
      {
        name: "Trial",
        price: 0,
      },
    ],
  },
  {
    id: "8d68c357-59e6-505a-b0e1-4953196b14df",
    name: "Customer Chat",
    description: "Improve your call center with live chat support.",
    categories: ["Channels"],
    subscriptions: [
      {
        name: "Trial",
        price: 0,
      },
    ],
  },
];

describe("Utility functions", () => {
  it("should get the pages number", () => {
    expect(getPagesNumber(appsJSONExample)).toBe(2);
  });

  it("should paginate the apps by page size and page number ", () => {
    expect(paginate(appsJSONExample, PAGE_SIZE, 1)).toStrictEqual(
      appsJSONExample.slice(0, 3)
    );
  });

  it("should filter the apps by category", () => {
    expect(filterAppsByCategory(appsJSONExample, "Channels")).toStrictEqual(
      appsJSONExample.slice(2, 4)
    );
  });

  it("should get all categories with no-duplicated values", () => {
    expect(getCategories(appsJSONExample)).toStrictEqual([
      "Channels",
      "Dialer",
      "Optimization",
      "Reporting",
      "Voice Analytics",
    ]);
  });

  it("should sort the apps by ascending order of the sum of the plans price", () => {
    expect([...appsJSONExample].sort(compareBySumOfPlansPrice)).toStrictEqual([
      appsJSONExample[2],
      appsJSONExample[3],
      appsJSONExample[0],
      appsJSONExample[1],
    ]);
  });
});
