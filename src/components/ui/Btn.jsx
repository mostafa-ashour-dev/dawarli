"use client";
import "@/styles/ui/_btn.scss"
import Link from "next/link";

function checkIfExternalURL(url) {
    return url.startsWith("http://") || url.startsWith("https://");
}


export default function Btn({ text, onClick, link, active, icon, showIconOnSmallScreen, hideTextOnSmallScreen }) {
    if (link && checkIfExternalURL(link)) {
        return (
            <a href={link} className={`btn ${active ? "active" : ""} ${showIconOnSmallScreen ? "showIconOnSmallScreen" : ""} ${hideTextOnSmallScreen ? "hideTextOnSmallScreen" : ""}`} target="_blank" rel="noopener noreferrer" onClick={onClick && onClick}>
                {icon && icon || ""}
                <span>{text}</span>
            </a>
        )
    } else if (link && !checkIfExternalURL(link)) {
        return (
            <Link href={link} className={`btn ${active ? "active" : ""} ${showIconOnSmallScreen ? "showIconOnSmallScreen" : ""} ${hideTextOnSmallScreen ? "hideTextOnSmallScreen" : ""}`} onClick={onClick && onClick}>
                {icon && icon || ""}
                <span>{text}</span>
            </Link>
        )
    } else {
        return (
            <button className={`btn ${active ? "active" : ""} ${showIconOnSmallScreen ? "showIconOnSmallScreen" : ""} ${hideTextOnSmallScreen ? "hideTextOnSmallScreen" : ""}`} onClick={onClick && onClick}>
                {icon && icon || ""}
                <span>{text}</span>
            </button>
        )
    }
}