"use client";
import "@/styles/ui/_btn.scss"
import Link from "next/link";

function checkIfExternalURL(url) {
    return url.startsWith("http://") || url.startsWith("https://");
}


export default function Btn({text, onClick, link, active}) {
    if (link && checkIfExternalURL(link)) {
        return (
            <a href={link} className={`btn ${active ? "active" : ""}`} onClick={onClick && onClick}>{text}</a>
        )
    } else if (link && !checkIfExternalURL(link)) {
        return (
            <Link href={link} className={`btn ${active ? "active" : ""}`} onClick={onClick && onClick}>{text}</Link>
        )
    } else {
        return (
            <button className={`btn ${active ? "active" : ""}`} onClick={onClick && onClick}>{text}</button>
        )
    }
}