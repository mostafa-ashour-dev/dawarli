"use client";

import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import Btn from "../ui/Btn";

const iconMap = {
    linkedin: <FaLinkedin />,
    github: <FaGithub />,
    facebook: <FaFacebook />,
    youtube: <FaYoutube />,
};


export default function TeamMemberCard({ avatar, name, profession, description, scoialLinks, portfolio }) {
    return (
        <div className="teamMemberCard">
            <div className="teamMemberTopInfo">
                <div className="teamMemberAvatar">
                    <img src={avatar} alt="robot" />
                </div>

                <div className="teamMemberInfo">
                    <h3>{name}</h3>
                    <p>{profession}</p>
                </div>
            </div>

            <p>{description}</p>

            <div className="buttons">
                <ul>
{
    scoialLinks && scoialLinks.map((link) => <li key={link.id}><a href={link.link} target="_blank" rel="noopener noreferrer" >{iconMap[link.name]}</a></li>)
}

                </ul>
                
                {portfolio && <Btn link={portfolio} text={"Portfolio"} active={true} />}

            </div>
        </div>
    )
}