"use client";

import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import Btn from "../ui/Btn";

const iconMap = {
    linkedin: <FaLinkedin />,
    github: <FaGithub />,
    facebook: <FaFacebook />,
    youtube: <FaYoutube />,
};


export default function TeamMemberCard({ avatar, name, role, description, socialLinks, portfolio }) {
      
    return (
        <div className="teamMemberCard">
            <div className="teamMemberTopInfo">
                <div className="teamMemberAvatar">
                    <img src={avatar} alt="robot" />
                </div>

                <div className="teamMemberInfo">
                    <h3>{name}</h3>
                    <p>{role}</p>
                </div>
            </div>

            <p>{description}</p>

            <div className="buttons">
                <ul>
{
    socialLinks && socialLinks.map((link, index) => <li key={index}><a href={link.url} target="_blank" rel="noopener noreferrer" >{iconMap[link.platform]}</a></li>)
}

                </ul>
                
                {portfolio && <Btn link={portfolio} text={"Portfolio"} active={true} />}

            </div>
        </div>
    )
}