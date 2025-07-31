"use client";

import ReachtMarkDown from "react-markdown";


export default function ChatCard ({content, role, time, ref}) {
    
    return (
        <div className={`chatMessage ${role === "user" ? "user" : "bot"}`} ref={ref}>
            <div className="chatMessageCard">
                <div className="chatMessageContent"><ReachtMarkDown>{content}</ReachtMarkDown></div>
                <span>{time}</span>
            </div>
        </div>
    )
}