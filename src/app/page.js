
import SchoolsPage from "@/components/pages/SchoolsPage";
import "./globals.scss";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SchoolsPage />
      </Suspense>
    </>
  );
}
