


export default function ChatCard ({content, role, time}) {
    
    return (
        <div className={`chatMessage ${role === "user" ? "user" : "bot"}`}>
            <div className="chatMessageCard">
                <p>{content}</p>
                <span>{time}</span>
            </div>
        </div>
    )
}