"use client";


import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


export default function PaginationBar({page, changeHandler, nextPage, totalPages }) {
    return (
        <div className="paginationBar"> 
            <button className="paginationBtn" disabled={page === 1} onClick={(e) => changeHandler(e, "previous")}><FaArrowLeft /></button>
            <div className="paginationDots">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button key={pageNumber} className={`paginationDot ${page === pageNumber ? "active" : ""}`} onClick={(e) => changeHandler({target: {name: "page", value: pageNumber}})}>{pageNumber}</button>
                ))}
            </div>
            <button className="paginationBtn" disabled={!nextPage} onClick={(e) => changeHandler(e, "next")}><FaArrowRight /></button>
        </div>
    )
}