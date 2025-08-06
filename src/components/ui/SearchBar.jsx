"use client";

import { useEffect, useRef, useState } from "react";
import { FaFilter, FaSearch, FaTimes, FaTrash } from "react-icons/fa";

export default function SearchBar({ headerText, placeholder, changeHandler, query, handleShowFilters, results }) {
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
            const isClickInsideForm = formRef.current && formRef.current.contains(e.target);
            const isClickOnRemoveBtn = e.target.closest("[data-remove]");

            if (!isClickInsideForm && !isClickOnRemoveBtn) {
                setShowHistory(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
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

    function removeSearchElement(index) {
        const newHistory = [...searchHistory];
        newHistory.splice(index, 1);
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }


    return (
        <header className="searchBarHeader">
            <div className="headerAndFilters">
                <h2>{!query ? headerText : results && results.length === 0 ? `No results for "${query}"` : `Showing results for "${query}"`}</h2>
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

                    if (value === "") return;
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
                    onClick={() => setShowHistory(true)}
                    onChange={() => {
                        setShowHistory(false);
                    }}
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
                                <div key={index} className="searchHistoryItem">
                                    <span onClick={(e) => handleHistoryClick(e, search)} >{search}</span>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); removeSearchElement(index); }} className="removeSearch" data-remove><FaTimes className="removeSearch"/></button>
                                </div>
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
