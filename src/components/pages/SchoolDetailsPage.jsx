"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation"


async function getSchool(schoolName) {
    const res = await axios.get(`/api/schools?query=${schoolName}`);
    return res.data
}


export default function SchoolDetailsPage() {
    const { schoolName } = useParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ["schoolDetails", schoolName],
        queryFn: ({queryKey}) => {
            const [_key, params] = queryKey;
            return getSchool(params);
        }
    })


    return (
        <main className="schoolDetailsWrapper">
            <div className="schoolImage">
                <img src="https://logo.png" alt="Suiii" />
            </div>
        </main>
    )
}