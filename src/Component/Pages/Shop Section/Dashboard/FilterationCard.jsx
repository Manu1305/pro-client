import React, { useState } from "react";
import "./filterationCard.css";
import Range from "../Range/Range";

const FilterationCard = ({
  filteredProducts,
  setFilteredProducts,
  category,
  setCategory,
  products,
}) => {
  const [range, setRange] = useState([130, 3000]);
  const allProducts = [...products];

  // price filterartion
  const priceFilteration = (product) => {
    const filteredProducts = product.filter(
      (item) => item.sellingPrice >= range[0] && item.sellingPrice <= range[1]
    );
    return filteredProducts;
  };

  // categories filterartion
  const categFilteration = (Products) => {
    const filteredProducts = Products.filter((item) => {
      return item.selectedCategory.toLowerCase() === category.toLowerCase();
    });
    return filteredProducts;
  };

  const filterButton = () => {
    console.log(category, " && ", range);

    if (category !== "All") {
      const filtByCate = categFilteration(allProducts);

      const filtByPrc = priceFilteration(filtByCate);

      setFilteredProducts(filtByPrc);
    } else {
      const filtByPrc = priceFilteration(allProducts);
      setFilteredProducts(filtByPrc);
    }
  };

  return (
    <div className="Dashboard-main">
      <div className="Dashboard-card">
        <div className="Dashboard-card-text">
          <span>Product categories</span>
        </div>
        <div className="card-checkbox">
          <div className="part1">
            {["All", "Kids", "Mens", "Womens"].map((item, id) => (
              <div className="checkbox" key={id}>
                <input
                  type="checkbox"
                  value={item}
                  checked={item === category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label> {item}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-filter">
          <div className="filter-text">
            <h3>Filter By Price</h3>
          </div>
          <div>
            <Range setRange={setRange} range={range} />
          </div>
        </div>
        <div onClick={filterButton} className="Card-btn cursor-pointer">
          <button>Filter</button>
        </div>
      </div>
    </div>
  );
};

export default FilterationCard;
