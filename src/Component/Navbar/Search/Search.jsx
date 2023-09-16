import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import styles from "./SearchBar.module.css";
import {
  addProduct,
  searcProducts,
} from "../../../Redux/product/productAction";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";

function SearchBar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const item = data;
  const filteredItems = getFilteredItems(query, item);

  function clear() {
    setQuery("");
  }

  useEffect(() => {
    httpService
      .get(`${apiURL}/product/get-all-products`)
      .then((res) => {
        setData(res.data);
        dispatch(addProduct(res.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function getFilteredItems(query, items) {
    if (!query) {
      return items;
    }

    return items.filter((data) => {
      console.log("data", data);
      return data.brand.includes(query);
    });
  }

  useEffect(() => {
    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      setIsSearching(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const allProducts = useSelector((state) => state.productReducer.allProducts);

  console.log("allProducts", allProducts);

  const searchHandler = (event) => {
    dispatch(searcProducts(event.target.value));
  };

  const onEnterPress = (event) => {
    const temp = [...data];

    if (event.key === "Enter") {
      // fisrt
      const searcDAta = temp.filter((product) => {
        if (
          product.selectedSubcategory
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.selectedCategory.toLowerCase().includes(query.toLowerCase())
        ) {
          return product;
        }
      });

      // setSearched(searcDAta);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        onChange={(e) => searchHandler(e)}
        className={styles.Searchinput}
      />
      <CiSearch className={styles.searchIcon} />
      {query && !isSearching && filteredItems.length === 0 && (
        <ul className={styles.resultsContainer}>
          <li>No results found</li>
        </ul>
      )}
      {query && filteredItems.length > 0 && (
        <div className={styles.resultsContainer}>
          {filteredItems.map((value) => (
            <div className={styles.link} key={value.brand} onClick={clear}>
              <Link to={`/ViewDetails/${value._id}`}>{value.brand}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

{
  /* <input
                      className="p-2 bg-slate-400"
                      type="text"
                      onChange={(e) => setQuery(e.target.value)}
                      // className={styles.Searchinput}
                      onKeyPress={onEnterPress}
                    />
                    <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto">
                      <ul>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                        <li>Hello</li>
                      </ul>
                    </div> */
}
