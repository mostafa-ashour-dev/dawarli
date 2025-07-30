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


async function getTeachers(filterData) {

    const {
        type = "",
        city = "",
        stagesTought = "",
        query = "",
        page = 1,
        limit = 10
    } = filterData;

    const params = new URLSearchParams(filterData);

    if (type && type !== "all") params.set("type", type);
    if (city && city !== "all") params.set("city", city);
    if (stagesTought && stagesTought !== "all") params.set("stagesTought", stagesTought) 
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
        stagesTought: "",
        query: "",
        page: 1,
        limit: 9
    });

    const query = useSearchParams().get("query")
    const router = useRouter();

    function handleFiltersChange(e, type) {
        if (type === "search") {
            e.preventDefault();

            setFilterData({ ...filterData, query: e.target.query.value });

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
    });

    useEffect(() => {
        if (query && filterData.query !== query) {
            setFilterData({ ...filterData, query: query });
        }
    }, [query]);

    return (
        <main className="mainWrapper">
            <SideBar headerText={"Filters"} headerIcon={<FaFilter />} overview={filterData.overview} changeHandler={handleFiltersChange} page={"teachers"} />
            <section className="sectionContainer">
                <SearchBar headerText={"Showing teachers results in \"Egypt\" "} query={filterData.query} changeHandler={handleFiltersChange} placeholder={"Search for a teacher..."} />
                <div className="gridContainer">
                    {data && data.teachers.length > 0 ? data.teachers.map((teacher, index) => <TeacherCard key={index} name={teacher.name} subject={teacher.subject} description={teacher.description} city={teacher.city} gender={teacher.gender} phoneNumber={teacher.phone} educationType={teacher.educationType} stagesTought={teacher.stagesTought} avatar={teacher.avatar} />) : data && data.teachers.length === 0 && <p className="noResults">Teacher not found</p>}
                </div>

                <PaginationBar page={filterData.page} nextPage={data?.next?.page} totalPages={data?.totalPages} previousPage={data?.previous?.page} changeHandler={handleFiltersChange} />
            </section>
        </main>
    )
}