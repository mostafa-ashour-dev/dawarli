import TeachersPage from "@/components/pages/TeachersPage";
import { Suspense } from "react";


export const metadata = {
    title: "Teachers",
    description: "Search for top-rated tutors in Egypt and connect with qualified teachers. dawarli makes it easier to choose the best education for your child.",
}

export default function Teachers() {

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <TeachersPage />
            </Suspense>
        </>
    )
}