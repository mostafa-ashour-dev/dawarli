"use client";

import moment from "moment";
import ReachtMarkDown from "react-markdown";
// import "moment-timezone";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


dayjs.extend(relativeTime);

export default function ChatCard ({content, role, time, ref}) {

    
    
    return (
        <div className={`chatMessage ${role === "user" ? "user" : "bot"}`} ref={ref}>
            <div className="chatMessageCard">
                <div className="chatMessageContent"><ReachtMarkDown>{content}</ReachtMarkDown></div>
                <span>{dayjs(time).fromNow()}</span>
            </div>
        </div>
    )
}