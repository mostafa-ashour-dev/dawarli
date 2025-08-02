"use client";



export default function AboutPage() {
    return (
        <main className="aboutPage margin padding">
            <h1>About Dawarli</h1>

            <div className="aboutContainer">
                <div className="aboutContent">
                    <p>
                        Our project is a smart educational directory platform designed to help students and parents easily discover, compare, and connect with schools and educational institutions. Instead of searching through scattered sources, we provide all the essential information—like fees, location, reviews, and education types—in one organized place. This streamlines the school search process and makes decision-making much easier and more efficient.</p>
                    <p>To make the experience even more interactive, we’ve developed a built-in chatbot assistant. This bot helps users by answering questions, guiding them through school options, and even applying filters like city, type, or rating. The platform uses smart search features and data filtering to provide accurate and tailored results, saving users time and avoiding confusion from unreliable sources. (comming soon)</p>
                    <p>The platform is currently under development by a diverse team including web developers, a cybersecurity specialist, and a data analyst. We’re working on weekly milestones, aiming to launch a functional MVP soon. The long-term vision includes expanding to universities and training centers, and helping educators publish verified content. Our goal is to bring clarity, trust, and simplicity to the education discovery journey.</p>
                </div>

                <div className="aboutImage">
                    <img src="/imgs/dawarli.png" alt="placeholder" />
                    <h2>Dawarli</h2>
                </div>
            </div>
        </main>
    );
}