import { useQueryContext } from "../../global_variables/QueryContext";
import QueryResults from "./QueryResults";
import { useEffect, useRef, useState } from "react";

const QUERY_URL = import.meta.env.VITE_URL_QUERY_SEARCH;

export default function Searchbar() {
  const { query, setQuery } = useQueryContext();
  const [searchResults, setSearchResults] = useState([]);
  const [productFound, setProductFound] = useState(true);
  const timeoutRef = useRef(null);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`${QUERY_URL + "/" + query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setProductFound(true);
      setSearchResults(data);
    } catch (error) {
      console.log("Error fetching search results:", error.message);
      setProductFound(false);
      setSearchResults(error.message);
    }
  };

  function debounce(callback, delay = 500) {
    return function (...args) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (query === "") {
      setProductFound(true);
      setSearchResults([]);
      return;
    }
    const debouncedFetch = debounce(fetchSearchResults);
    debouncedFetch();
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <form data-testid="sb-input" className="searchbar" action="">
        <svg
          className="search_icon"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
        <input
          value={query}
          onChange={(e) => handleChange(e)}
          placeholder="  Search..."
          type="search"
        />
      </form>
      {query === "" ? (
        ""
      ) : (
        <QueryResults
          query={query}
          productFound={productFound}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          setQuery={setQuery}
        />
      )}
    </>
  );
}
