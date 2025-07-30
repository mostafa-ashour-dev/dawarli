"use client";

import { useState } from "react";
import { FaArrowUp, FaRobot, FaTimes } from "react-icons/fa";
import ChatCard from "../cards/ChatCard";


const messages = [
    {
        role: "bot",
        content: "Hi! we are still working on this feature!",
        time: "12:00 PM"
    },
    {
        role: "user",
        content: "Oh ok its fine :)",
        time: "12:01 PM"
    }
]

export default function ChatBot({enabled}) {

    const [show, setShow] = useState(false);

    function handleShow() {
        setShow(!show);
        document.body.classList.toggle("overflowHidden");
    }

    return (
        <div className={`chatBot ${show ? "active" : " "}`}>
            <div className="chatContainer">
                <button className="closeBtn" onClick={handleShow}><FaTimes /></button>

                <header className="chatHeader">
                    <div className="chatBotImage">
                        <img src="/imgs/robot.png" alt="robot" />
                    </div>
                    <div>
                        <h3>Cora Assistant</h3>
                        <p>Online</p>
                    </div>

                </header>

                <div className="chatMessagesContainer">
                    {messages.map((message, index) => <ChatCard key={index} content={message.content} role={message.role} time={message.time} />)}
                </div>

                <form action="" className="chatForm">
                    <input type="text" placeholder="Type a message..." />
                    <button type="submit" disabled={!enabled} title={enabled ? "Send" : "Feature coming soon..."} ><FaArrowUp /></button>
                </form>
            </div>

            <button className="chatBtn" onClick={handleShow}>
                <FaRobot />
            </button>
        </div>
    )
}