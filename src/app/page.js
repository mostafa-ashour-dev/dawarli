
import SchoolsPage from "@/components/pages/SchoolsPage";
import "./globals.scss";
import { Suspense } from "react";


export const metadata = {
  title: "Edu-Findr | Search for schools and teachers in your area.",
  description: "Search for schools and teachers in your area.",
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
