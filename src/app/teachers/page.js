import TeachersPage from "@/components/pages/TeachersPage";
import { Suspense } from "react";


export const metadata = {
    title: "Search for teachers in your area.",
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