import React, { SFC } from "react";
import { IApp } from "../../interfaces/app.interfaces";

export const Box: SFC<IApp> = ({
  id,
  name,
  description,
  categories,
  subscriptions,
}) => (
  <li key={id}>
    <div className="app-item">
      <div className="box-info">
        <div className="box-info--content">
          <div className="description">
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
          <div className="tags">
            {categories.map((category, i) => [
              <span key={i}>{category}</span>,
              "/",
            ])}
          </div>
        </div>
        <div className="box-info--footer">
          <ul>
            {subscriptions?.map((subscription, i) => (
              <li key={i}>
                <span>{subscription.name}</span>{" "}
                <h3>
                  {subscription.price === 0 ? "Free" : subscription.price}
                  <sup></sup>
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </li>
);
