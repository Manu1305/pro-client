import React, { useEffect, useState } from "react";
import "./shop.css";
import FilterationCard from "./Dashboard/FilterationCard";
import men from "./Images/men.png";
import women from "./Images/women.png";
import kids from "./Images/kids.png";
import footer from "./Images/footwear.png";
import Card from "./Card/Card";
import { useParams } from "react-router-dom";

const Shop = ({ products, setProductLength, ProductLength }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState("");

  const { cate } = useParams();

  useEffect(() => {
    if (cate) {
      // alert(cate)
      if (cate && products) {
        const data = products.filter(item =>  item.selectedCategory ===  cate
        );
        setFilteredProducts(data);
      }
      if (cate.toLocaleLowerCase() === "All".toLocaleLowerCase())
        setFilteredProducts(products);
    }
  }, []);




  // useEffect(() => {
  //   // setFilteredProducts(products)
  //   console.log("first",products)
  //   setFilteredProducts(products)
  // },[products])

  // console.log("products",products)
  // console.log("filteredProducts",filteredProducts)
  return (
    <div className="Home-main">
      <div className="Home-upper-sec">
        <div className="Home-upper-sec-1">
          <FilterationCard
            category={category}
            setCategory={setCategory}
            setFilteredProducts={setFilteredProducts}
            filteredProducts={filteredProducts}
            products={products}
            setProductLength={setProductLength}
          />
        </div>
        <div className="Home-upper-sec-2">
          <div className="card-main-collection">
            {[
              { id: 1, src: men, category: "Mens" },
              { id: 1, src: women, category: "Women" },
              { id: 2, src: kids, category: "Kids" },
              { id: 3, src: footer, category: "Footwear" },
            ].map((item) => (
              <div
                className="collection-card"
                key={item.id}
                onClick={() => setCategory(item.category)}
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
