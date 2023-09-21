import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import styles from "./SearchBar.module.css";
import { addProduct } from "../../../Redux/product/productAction";
import { useSelector, useDispatch } from "react-redux";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";

function SearchBar({ products }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const item = products;
  const filteredItems = getFilteredUniqueItems(query, item).slice(0, 5); // Slice to get only the first 5 unique results

  function clear() {
    setQuery("");
  }

  function getFilteredUniqueItems(query, items) {
    if (!query) {
      return items;
    }

    const uniqueItems = [];
    const addedCollections = new Set();

    for (const product of items) {
      if (product.collections.includes(query) && !addedCollections.has(product.collections)) {
        uniqueItems.push(product);
        addedCollections.add(product.collections);
      }
    }

    return uniqueItems;
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
            <div className={styles.link} key={value.tags} onClick={clear}>
              <Link to={`/shoppingPages/searchresult/${value.collections}`}>
                {value.collections}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
