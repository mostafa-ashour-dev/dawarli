"use client";

import { FaFilter, FaSearch } from "react-icons/fa";

 
export default function SearchBar({headerText, placeholder, changeHandler, query, handleShowFilters}) {
    return (
        <header className="searchBarHeader">
            <div className="headerAndFilters">
                <h2>{!query ? headerText : "Showing results for " + `\"${query}\"` || ""} </h2>
                <button className="showFiltersBtn" onClick={handleShowFilters}>
                    <FaFilter />
                </button>
            </div>

                    
            <form className="searchForm" onSubmit={(e) => {
                changeHandler(e, "search");
            }}>
                <FaSearch /> 
                <input type="text" name="query" defaultValue={query || ""} placeholder={placeholder || "Search for a school..."} />
            </form>
        </header>
    )
}