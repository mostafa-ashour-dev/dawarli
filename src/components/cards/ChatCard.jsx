"use client";

import ReachtMarkDown from "react-markdown";


export default function ChatCard ({content, role, time, ref}) {

    const formatedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    return (
        <div className={`chatMessage ${role === "user" ? "user" : "bot"}`} ref={ref}>
            <div className="chatMessageCard">
                <div className="chatMessageContent"><ReachtMarkDown>{content}</ReachtMarkDown></div>
                <span>{formatedTime}</span>
            </div>
        </div>
    )
}