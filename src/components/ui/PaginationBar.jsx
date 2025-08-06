"use client";


import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


export default function PaginationBar({ page, changeHandler, nextPage, totalPages, isLoading }) {



    return (
        <div className="paginationBar">
            {
                isLoading && <div className="loading-indicator">
                    <div className="spinner"></div>
                </div> || (
                    <>
                        <button className="paginationBtn prev" disabled={page === 1} onClick={(e) => changeHandler(e, "previous")}><FaArrowLeft /></button>
                        <div className="paginationDots">
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                                <button key={pageNumber} className={`paginationDot ${page === pageNumber ? "active" : ""}`} onClick={(e) => changeHandler({ target: { name: "page", value: pageNumber } })}>{pageNumber}</button>
                            ))}
                        </div>
                        <button className="paginationBtn next" disabled={!nextPage} onClick={(e) => changeHandler(e, "next")}><FaArrowRight /></button>
                    </>
                )}

        </div>
    )
}