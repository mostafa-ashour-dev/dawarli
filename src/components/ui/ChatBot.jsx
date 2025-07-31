"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowUp, FaRobot, FaTimes } from "react-icons/fa";
import ChatCard from "../cards/ChatCard";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

export default function ChatBot({ enabled }) {

    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "user",
            content: "Hey there!",
            createdAt: "12:01 PM"
        }]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [chat, setChat] = useState(null);
    const lastMessageRef = useRef(null);



    async function handleSubmitForm(e) {
        e.preventDefault();
        if (!message.trim()) return;

        const newUserMessage = {
            role: "user",
            content: message.trim(),
            createdAt: new Date().toLocaleTimeString(),
        };

        setMessages(prev => [...prev, newUserMessage]);

        setMessage("");
        setLoading(true);

        try {
            if (chat) {
                const result = await chat.sendMessage(message.trim());

                const botMessage = {
                    role: "bot",
                    content: result.response.text(),
                    createdAt: new Date().toLocaleTimeString(),
                };

                setMessages(prev => [...prev, botMessage]);
            }
            
        } catch (error) {
            console.error("Can't send message", error);
            setMessages(prev => [...prev, newUserMessage]);
        } finally {
            setLoading(false);
        }
    }


    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;


    useEffect(() => {
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 5000,
            responseMimeType: "text/plain",
        };

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            },
        ]


        const sessionHistory = [
            {
                role: "user",
                parts: [{ text: "look these are schools info I want you to study the your name is cora assistant and your mission is to help parents or students choose the best school for them through the preferences they will send you. You will make them comparsions if they ask and you well help them choose the best for them and Don't answer any question about anysomething else this and remember if anyone asks you about the website its called Edu-Findr and you are the AI assistant in that site and you explain what is  the goal of the site which is providing info about schools and teachers in egypt the data are fully trustable and the site helps them choose the best."}]
            }
            , ...messages.map((msg) => ({
                role: msg.role,
                parts: [{ text: msg.content }],
            }))]


        async function initChat() {

            try {
                const chatSession = model.startChat({
                    generationConfig,
                    safetySettings,
                    history: sessionHistory,
                });

                setChat(chatSession);

                console.log("Successfully Initialized a chat!");

            } catch (err) {
                console.log(err);
            }


        }

        initChat()
        const storedMessages = sessionStorage.getItem("messages");
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }

    }, []);

    useEffect(() => {
        sessionStorage.setItem("messages", JSON.stringify(messages));
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

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
                        <p>{loading ? "Typing..." : "Online"}</p>
                    </div>

                </header>

                <div className="chatMessagesContainer" >
                    {messages.map((message, index) => <ChatCard key={index} content={message.content} role={message.role} time={message.createdAt} ref={index === messages.length - 1 ? lastMessageRef : null} />)}
                    {loading && <div className="loading-indicator">
                        <div className="spinner"></div>
                    </div>}
                </div>

                <form className="chatForm" onSubmit={handleSubmitForm}>
                    <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button type="submit" disabled={!enabled} title={enabled ? "Send" : "Feature coming soon..."} ><FaArrowUp /></button>
                </form>
            </div>

            <button className="chatBtn" onClick={handleShow}>
                <FaRobot />
            </button>
        </div>
    )
}