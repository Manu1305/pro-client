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
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const item = products;
  const filteredItems = getFilteredUniqueItems(query, item).slice(0, 5);

  function clear() {
    setQuery("");
    setSelectedSuggestion("");
  }

  function handleSuggestionClick(suggestion) {
    setQuery("");
    setSelectedSuggestion("");
  }

  function getFilteredUniqueItems(query, items) {
    if (!query) {
      return items;
    }

    
    const uniqueItems = [];
    const addedCollections = new Set();

    const queryLowercase = query.toLowerCase(); // Convert query to lowercase

    for (const product of items) {
      const productCollectionsLowercase = product.collections.toLowerCase(); // Convert product collections to lowercase
      if (productCollectionsLowercase.includes(queryLowercase) && !addedCollections.has(productCollectionsLowercase)) {
        uniqueItems.push(product);
        addedCollections.add(productCollectionsLowercase);
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
        value={selectedSuggestion || query}
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
            <div className={styles.link} key={value.tags} onClick={() => handleSuggestionClick(value.collections)}>
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
