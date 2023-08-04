import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import styles from "./SearchBar.module.css";
import { addProduct } from "../../../Redux/product/productAction";
import { useSelector, useDispatch } from "react-redux";
import { apiURL } from "../../../const/config";

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
    axios
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

    return items.filter((data) =>
      data.productDetail.brand.includes(query)
    );
  }

  useEffect(() => {
    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      setIsSearching(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
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
            <div
              className={styles.link}
              key={value.productDetail.brand}
              onClick={clear}
            >
              <Link to={`/ViewDetails/${value._id}`}>
                {value.productDetail.brand}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;