"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowUp, FaRegArrowAltCircleLeft, FaRobot, FaSyncAlt, FaTimes } from "react-icons/fa";
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
            role: "bot",
            content: "Hello! How can I help you?",
            createdAt: new Date(),
        }
    ]);
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
            createdAt: new Date(),
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
                    createdAt: new Date(),
                };

                setMessages(prev => [...prev, botMessage]);
            }

        } catch (error) {
            console.error("Can't send message", error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const storedMessages = localStorage.getItem("messages");
        const parsedMessages = storedMessages ? JSON.parse(storedMessages) : messages;
        setMessages(parsedMessages);

        const sessionHistory = [
            {
                role: "user",
                parts: [{ text: "look these are schools info I want you to study the your name is cora assistant and your mission is to help parents or students choose the best school for them through the preferences they will send you. You will make them comparsions if they ask and you well help them choose the best for them and Don't answer any question about anysomething else this and remember if anyone asks you about the website its called Dawarli and you are the AI assistant in that site and you explain what is  the goal of the site which is providing info about schools and teachers in egypt the data are fully trustable and the site helps them choose the best our slogan is 'Your compass to schools & tutors.'" }],
            },
            ...parsedMessages.slice(1).map((msg) => ({
                role: msg.role,
                parts: [{ text: msg.content }],
            })),
        ];

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
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        async function initChat() {
            try {
                const chatSession = model.startChat({
                    generationConfig,
                    safetySettings,
                    history: sessionHistory,
                });

                setChat(chatSession);
                console.log("Chat initialized from localStorage history");
            } catch (err) {
                console.log("Failed to initialize chat session", err);
            }
        }

        initChat();
    }, []);



    function handleResetChat() {
        const newInitialMessage = {
            role: "bot",
            content: "Hello! How can I help you?",
            createdAt: new Date(),
        };

        setMessages([newInitialMessage]);
        localStorage.removeItem("messages");

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const sessionHistory = [
            {
                role: "user",
                parts: [{ text: "look these are schools info I want you to study the your name is cora assistant and your mission is to help parents or students choose the best school for them through the preferences they will send you. You will make them comparsions if they ask and you well help them choose the best for them and Don't answer any question about anysomething else this and remember if anyone asks you about the website its called Dawarli and you are the AI assistant in that site and you explain what is  the goal of the site which is providing info about schools and teachers in egypt the data are fully trustable and the site helps them choose the best our slogan is 'Your compass to schools & tutors.'" }],
            },
        ];

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
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        async function startNewChat() {
            try {
                const chatSession = await model.startChat({
                    generationConfig,
                    safetySettings,
                    history: sessionHistory,
                });
                setChat(chatSession);
                console.log("New chat session created");
            } catch (err) {
                console.log("Failed to create new chat session", err);
            }
        }

        startNewChat();
    }



    useEffect(() => {
        localStorage.setItem("messages", JSON.stringify(messages));
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        const storedChatSession = sessionStorage.getItem("chatSession");
        if (storedChatSession) {
            setChat(JSON.parse(storedChatSession));
        }
    }, []);

    function handleShow() {
        setShow(!show);
        document.body.classList.toggle("overflowHidden");
    }

    return (
        <div onClick={(e) => {
            if (e.target.classList.contains("chatBot")) {
                handleShow();
            }
        }} className={`chatBot ${show ? "active" : " "}`}>
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

                    {
                        messages.slice(1).length > 0 && <button className="resetBtn btn" onClick={handleResetChat} > <FaSyncAlt /> Reset Chat</button>
                    }
                </div>


                <form className="chatForm" onSubmit={handleSubmitForm}>
                    <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button type="submit" disabled={!enabled} title={enabled ? "Send" : "Feature coming soon..."} ><FaArrowUp /></button>
                </form>
            </div>

            <div className="chatBtnContainer">
                <button className={`chatBtn ${messages.map((message) => message.role).includes("user") ? "" : "active"}`} onClick={handleShow}>
                    <img src={"/imgs/robot.png"} />
                </button>
                {messages.map((message) => message.role).includes("user") ? "" : (
                    <p>Have a question?</p>
                )}
            </div>


        </div>
    )
}