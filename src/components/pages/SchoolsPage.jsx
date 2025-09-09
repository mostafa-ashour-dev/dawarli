"use client";
import { FaFilter } from "react-icons/fa"
import SideBar from "@/components/navbars/SideBar";
import SchoolCard from "@/components/cards/SchoolCard";
import SearchBar from "@/components/ui/SearchBar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationBar from "../ui/PaginationBar";
import SchoolDetails from "../ui/SchoolDetails";
import Loader from "../ui/Loader";
import NotFound from "../ui/NotFound";
import SchoolCardSkeleton from "../cards/SchoolCardSkeleton";


async function getSchools(filterData) {

    const {
        city = "",
        type = "",
        overview = 3,
        query = "",
        page = 1,
        limit = 10
    } = filterData;

    const params = new URLSearchParams(filterData);

    if (city && city !== "all") params.set("city", city);
    if (type && type !== "all") params.set("type", type);
    if (overview) params.set("overview", overview);
    if (query) params.set("query", query);
    if (page) params.set("page", page);
    if (limit) params.set("limit", limit);



    const res = await axios.get(`/api/schools?${params.toString()}`);
    return res.data;
}

export default function SchoolsPage() {

    const [filterData, setFilterData] = useState({
        city: "all",
        type: "all",
        overview: 5,
        query: "",
        page: 1,
        limit: 9
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showFilters, setShowFilters] = useState(false);

    const query = useSearchParams().get("query");
    const router = useRouter();
    function handleFiltersChange(e, type) {
        if (type === "search") {
            e.preventDefault();

            setFilterData({ ...filterData, query: e.target.query.value });

            if(!e.target.query.value) {
                router.push(`/`);
                return;
            }
            router.push(`/?query=${e.target.query.value}`);
            return;
        }

        if (type === "next" || type === "previous") {
            setFilterData({ ...filterData, page: filterData.page + (type === "next" ? 1 : -1) });
            return;
        }

        const { name, value } = e.target;
        setFilterData({ ...filterData, [name]: value });
    }


    useEffect(() => {
        if (query && filterData.query !== query) {
            setFilterData({ ...filterData, query: query });
        }
    }, [query]);

    const { data, isLoading, error } = useQuery({
        queryKey: ["schools", filterData],
        queryFn: ({ queryKey }) => {
            const [_key, params] = queryKey;
            return getSchools(params);
        },
        refetchOnWindowFocus: false
    });


    const [showDetals, setShowDetails] = useState(false);

    function handleShowDetails() {
        setShowDetails(!showDetals);
        document.body.classList.toggle("overflowHidden");
    }


    return (
        <main className="mainWrapper">
            <SideBar headerText={"Filters"} headerIcon={<FaFilter />} handleShowFilters={() => setShowFilters(!showFilters)} showFilters={showFilters} overview={filterData.overview} changeHandler={handleFiltersChange} page={"/schools"} />
            <section className="sectionContainer">
                <SearchBar handleShowFilters={() => setShowFilters(!showFilters)} results={data && data?.schools} headerText={"Showing school results in \"Egypt\" "} query={filterData.query} changeHandler={handleFiltersChange} placeholder={"Search for a school..."} />
                <div className={`gridContainer ${data && data?.schools.length === 0 && "noResults"}`}>
                    {isLoading && Array(9).fill(0).map((_, index) => <SchoolCardSkeleton key={index + 1} />) || !data && Array(9).fill(0).map((_, index) => <SchoolCardSkeleton key={index + 1} />)}

                    {data && data?.schools.length > 0 ? data?.schools.map((school, index) => (<SchoolCard onClick={() => {
                        setCurrentIndex(index);
                        handleShowDetails();
                    }} title={school.title} key={index + 1} educationType={school.educationType} city={school.location && school.location[0].address} rating={school.rating} image={school.image} />)) : data && data?.schools.length === 0 && <NotFound query={filterData.query} notFoundString={"No schools found"} /> || error && <p className="noResults">Something went wrong</p>}
                </div>

                <PaginationBar isLoading={isLoading} page={filterData.page} nextPage={data?.next?.page} totalPages={data?.totalPages} previousPage={data?.previous?.page} changeHandler={handleFiltersChange} />
            </section>

            <SchoolDetails show={showDetals} handleShowDetails={handleShowDetails} title={data?.schools[currentIndex]?.title} image={data?.schools[currentIndex]?.image} location={data?.schools[currentIndex]?.location} educationType={data?.schools[currentIndex]?.educationType} rating={data?.schools[currentIndex]?.rating} />
        </main>
    )
}