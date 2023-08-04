import React from "react";
import { FeaturedList } from "./FeaturedList";

const Featured = () => {
  return (
    <>
      <section className="Discount background NewArrivals">
        <div className="container">
          <div className="heading3">
            <div className="heading-left row  f_flex">
              <h2>Big Discounts</h2>
            </div>
            <div className="heading-right row ">
              <span>View all</span>
              <i className="fa-solid fa-caret-right"></i>
            </div>
          </div>
          <FeaturedList />
        </div>
      </section>
    </>
  );
};

export default Featured;
