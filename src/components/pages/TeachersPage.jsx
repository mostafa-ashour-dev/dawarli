"use client";


import { FaFilter } from "react-icons/fa";
import SideBar from "../navbars/SideBar";
import PaginationBar from "../ui/PaginationBar";
import SearchBar from "../ui/SearchBar";



export default function TeachersPage() {


    function handleFiltersChange() {

    }

    const filterData = {}
    return (
        <main className="mainWrapper">
            <SideBar headerText={"Filters"} headerIcon={<FaFilter />} overview={filterData.overview} changeHandler={handleFiltersChange} page={"/teachers"} />
            <section className="sectionContainer">
                <SearchBar headerText={"Showing teachers results in \"Egypt\" "} query={filterData.query} changeHandler={handleFiltersChange} placeholder={"Search for a teacher..."} />
                <div className="gridContainer">
                    data
                </div>

                {/* <PaginationBar page={filterData.page} nextPage={data?.next?.page} totalPages={data?.totalPages} previousPage={data?.previous?.page} changeHandler={handleFiltersChange} /> */}
            </section>
        </main>
    )
}