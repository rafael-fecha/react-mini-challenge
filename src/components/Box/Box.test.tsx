import React from "react";

import { render } from "@testing-library/react";
import { Box } from "./Box";

const appJSONExample = {
  id: "9b565b11-7311-5b5e-a699-97873dffb361",
  name: "Voice Report",
  description: "Calls reporting and analytics of your calls.",
  categories: ["Voice Analytics", "Reporting", "Optimization"],
  subscriptions: [
    {
      name: "Trial",
      price: 0,
    },
  ],
};

describe("Box component", () => {
  it("should display the text Free when plan has value 0", () => {
    const { getByText } = render(
      <Box
        id={appJSONExample.id}
        name={appJSONExample.name}
        description={appJSONExample.description}
        categories={appJSONExample.categories}
        subscriptions={appJSONExample.subscriptions}
      />
    );

    expect(getByText("Free")).toBeDefined();
  });
});
