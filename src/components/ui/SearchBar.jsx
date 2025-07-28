"use client";

import { FaSearch } from "react-icons/fa";

 
export default function SearchBar({headerText, placeholder, changeHandler, query}) {
    return (
        <header className="searchBarHeader">
            <h2>{headerText}</h2>

                    
            <form className="searchForm" onSubmit={(e) => {
                changeHandler(e, "search");
            }}>
                <FaSearch /> 
                <input type="text" name="query" defaultValue={query || ""} placeholder={placeholder || "Search for a school..."} />
            </form>
        </header>
    )
}