
import SchoolsPage from "@/components/pages/SchoolsPage";
import "./globals.scss";
import { Suspense } from "react";


export const metadata = {
  title: "Schools | Dawarli - Your compass to schools & tutors.",
  description: "Search for top-rated schools in Egypt and connect with qualified teachers. dawarli makes it easier to choose the best education for your child.",
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SchoolsPage />
      </Suspense> 
    </>
  );
}
