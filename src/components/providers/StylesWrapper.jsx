"use client";
import "../../app/globals.scss"
import { ReactQueryProvider } from "./ReactQueryProvider";

export default function StylesWrapper({ children }) {
    return (
        <ReactQueryProvider>
            <div className="stylesWrapper">{children}</div>
        </ReactQueryProvider>
    )
}