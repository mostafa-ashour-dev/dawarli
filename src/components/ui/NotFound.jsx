"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Btn from "./Btn";
import { useTransition } from "react";
import Loader from "./Loader";


export default function NotFound({ query, notFoundString, page }) {

    const [isRouting, startTransition] = useTransition();

    function handleStartTransition() {
        startTransition(() => {
            return null
        });
    }

    return (
        <div className={`notFoundContainer ${page === "404" ? "margin padding" : ""}`}>
            {isRouting && <Loader />}
            <DotLottieReact src="./lotties/notFound.lottie"
                loop
                autoplay />
            <p>{query ? `No results for "${query}"` : notFoundString || "Page Not Found"}</p>
            {page === "404" && <Btn link={"/"} text={"Go Home"} active={true} onClick={handleStartTransition} /> }
        </div>
    )
}