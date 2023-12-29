import React, { useEffect, useState } from "react";
import "./shop.css";
import FilterationCard from "./Dashboard/FilterationCard";
import men from "./Images/men.png";
import women from "./Images/women.png";
import kids from "./Images/kids.png";
import footer from "./Images/footwear.png";
import Card from "./Card/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Shop = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.productReducer.product);
  const { cate } = useParams();
  const [category, setCategory] = useState(cate ? cate : "All");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (cate && cate !== "All") {
      if (cate.length > 1) {
        const data = products.filter((item) => {
          const categeory = item.selectedCategory.toLocaleLowerCase();
          const subCate = item.selectedSubcategory.toLocaleLowerCase();
          const tags = item.tags.toLocaleLowerCase();

          return (
            tags.includes(cate.toLocaleLowerCase()) ||
            categeory.toLocaleLowerCase() === cate.toLocaleLowerCase() ||
            subCate.includes(cate.toLocaleLowerCase())
          );
        });
        setFilteredProducts(data);
      } else {
        const data = products.filter((item) => item.selectedCategory === cate);
        setFilteredProducts(data);
      }
    } else {
      setFilteredProducts(products || []);
    }
  }, [cate, products]);

  return (
    <div className="Home-mainmain">
      <div className="Home-upper-sec">
        <div className="Home-upper-sec-1">
          <FilterationCard
            category={category}
            setCategory={setCategory}
            setFilteredProducts={setFilteredProducts}
            filteredProducts={filteredProducts}
          />
        </div>
        <div className="Home-upper-sec-2">
          <div className="card-main-collection">
            {[
              { id: 1, src: men, category: "Mens" },
              { id: 1, src: women, category: "Womens" },
              { id: 2, src: kids, category: "Kids" },
              { id: 3, src: footer, category: "Footwear" },
            ].map((item) => (
              <div
                className="collection-card"
                key={item.id}
                onClick={() => {
                  setCategory(item.category);
                  navigate(`/shop/${item.category}`);
                }}
              >
                <img src={item.src} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Home-content">
        <div className="Home-total-items">
          <strong className="d-block py-2">
            Total {filteredProducts.length} items
          </strong>
        </div>

        <div className="product-section">
          {filteredProducts.length &&
            filteredProducts.map((items) => <Card items={items} />)}
        </div>
      </div>
    </div>
  );
};

export default Shop;
