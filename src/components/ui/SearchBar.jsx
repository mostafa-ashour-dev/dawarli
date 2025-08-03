"use client";

import { useEffect, useRef, useState } from "react";
import { FaFilter, FaSearch, FaTimes, FaTrash } from "react-icons/fa";

export default function SearchBar({ headerText, placeholder, changeHandler, query, handleShowFilters }) {
    const [searchHistory, setSearchHistory] = useState([]);
    const formRef = useRef(null);
    const inputRef = useRef(null);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("searchHistory");
        if (stored) {
            setSearchHistory(JSON.parse(stored));
        }


    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                formRef.current &&
                !formRef.current.contains(e.target)
            ) {
                setShowHistory(false);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    function handleAddSearchHistory(search) {

        if (searchHistory.includes(search)) {
            return;
        }
        const newHistory = [...searchHistory, search];
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }

    function handleHistoryClick(e, search) {
        e.preventDefault();
        if (inputRef.current && formRef.current) {
            inputRef.current.value = search;
            const event = new Event("submit", { bubbles: true, cancelable: true });
            formRef.current.dispatchEvent(event);
        }
    }

    function handleClearSearch(e) {
        e.preventDefault();
        inputRef.current.value = "";
        const event = new Event("submit", { bubbles: true, cancelable: true });
        formRef.current.dispatchEvent(event);

    }



    return (
        <header className="searchBarHeader">
            <div className="headerAndFilters">
                <h2>{!query ? headerText : `Showing results for "${query}"`}</h2>
                <button className="showFiltersBtn" onClick={handleShowFilters}>
                    <FaFilter />
                </button>
            </div>

            <form
                className="searchForm"
                ref={formRef}
                onSubmit={(e) => {
                    e.preventDefault();
                    const value = e.target.query.value;
                    changeHandler(e, "search");
                    handleAddSearchHistory(value);

                }}
            >
                <FaSearch />
                <input
                    type="text"
                    name="query"
                    ref={inputRef}
                    autoComplete="off"
                    autoCapitalize="sentences"
                    defaultValue={query || ""}
                    placeholder={placeholder || "Search for a school..."}
                    onFocusCapture={() => setShowHistory(true)}
                />

                {query && query !== "" && (
                    <button className="clearSearch" type="button" onClick={(e) => handleClearSearch(e)} title="Clear Search"><FaTimes /></button>
                ) || ""}

                <div className={`searchHistory ${showHistory ? "active" : ""}`}>
                    <header>
                        <h3>Search History</h3>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchHistory([]);
                                localStorage.removeItem("searchHistory");
                            }}
                        >
                            <FaTrash /> Clear History
                        </button>
                    </header>

                    <div className="searchHistoryContainer">
                        {searchHistory.length > 0 ? (
                            searchHistory.map((search, index) => (
                                <button key={index} type="button" onClick={(e) => handleHistoryClick(e, search)}>
                                    {search}
                                </button>
                            ))
                        ) : (
                            <p>No search history</p>
                        )}
                    </div>
                </div>
            </form>
        </header>
    );
}
