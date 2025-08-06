"use client";


import { FaFilter } from "react-icons/fa";
import SideBar from "../navbars/SideBar";
import PaginationBar from "../ui/PaginationBar";
import SearchBar from "../ui/SearchBar";
import TeacherCard from "../cards/TeacherCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "../ui/Loader";
import NotFound from "../ui/NotFound";
import TeacherCardSkeleton from "../cards/TeacherCardSkeleton";


async function getTeachers(filterData) {

    const {
        type = "",
        city = "",
        stagesTaught = "",
        subject = "",
        query = "",
        page = 1,
        limit = 10
    } = filterData;

    const params = new URLSearchParams(filterData);

    if (type && type !== "all") params.set("type", type);
    if (city && city !== "all") params.set("city", city);
    if (subject && subject !== "all") params.set("subject", subject);
    if (stagesTaught && stagesTaught !== "all") params.set("stagesTaught", stagesTaught) 
    if (query) params.set("query", query);
    if (page) params.set("page", page);
    if (limit) params.set("limit", limit);

    const res = await axios.get(`/api/teachers?${params.toString()}`);
    return res.data;
}

export default function TeachersPage() {


    const [filterData, setFilterData] = useState({
        type: "",
        city: "",
        subject: "",
        stagesTaught: "",
        query: "",
        page: 1,
        limit: 9
    });
    const [showFilters, setShowFilters] = useState(false);


    const query = useSearchParams().get("query")
    const router = useRouter();

    function handleFiltersChange(e, type) {
        if (type === "search") {
            e.preventDefault();

            setFilterData({ ...filterData, query: e.target.query.value });

            if (!e.target.query.value) {
                router.push(`/teachers`);
                return;
            }
            router.push(`/teachers?query=${e.target.query.value}`);
            return;
        }

        if (type === "next" || type === "previous") {
            setFilterData({ ...filterData, page: filterData.page + (type === "next" ? 1 : -1) });
            return;
        }

        const { name, value } = e.target;
        setFilterData({ ...filterData, [name]: value });
    };



    const { data, isLoading, error } = useQuery({
        queryKey: ["teachers", filterData],
        queryFn: ({ queryKey }) => {
            const [_key, params] = queryKey;
            return getTeachers(params);
        },
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (query && filterData.query !== query) {
            setFilterData({ ...filterData, query: query });
        }
    }, [query]);

    return (
        <main className="mainWrapper">
            <SideBar headerText={"Filters"} handleShowFilters={() => setShowFilters(!showFilters)} showFilters={showFilters} headerIcon={<FaFilter />} overview={filterData.overview} changeHandler={handleFiltersChange} page={"teachers"} />
            <section className="sectionContainer">
                <SearchBar headerText={"Showing teachers results in \"Egypt\" "} results={data && data?.teachers} handleShowFilters={() => setShowFilters(!showFilters)} query={filterData.query} changeHandler={handleFiltersChange} placeholder={"Search for a teacher..."} />
                <div className={`gridContainer ${data && data?.teachers.length === 0 && "noResults"}`}>
                    {isLoading && Array(9).fill(0).map((_, index) => <TeacherCardSkeleton key={index + 1} />) || !data && Array(9).fill(0).map((_, index) => <TeacherCardSkeleton key={index + 1} />)}
                    {data && data.teachers.length > 0 ? data.teachers.map((teacher, index) => <TeacherCard key={index} name={teacher.name} subject={teacher.subject} description={teacher.description} city={teacher.city} gender={teacher.gender} phoneNumber={teacher.phone} educationType={teacher.educationType} stagesTaught={teacher.stagesTaught} avatar={teacher.avatar} />) : data && data.teachers.length === 0 && <NotFound text={"No teachers found"} query={filterData.query} /> || error && <p className="noResults">Something went wrong</p> }
                </div>

                <PaginationBar isLoading={isLoading} page={filterData.page} nextPage={data?.next?.page} totalPages={data?.totalPages} previousPage={data?.previous?.page} changeHandler={handleFiltersChange} />
            </section>
        </main>
    )
}