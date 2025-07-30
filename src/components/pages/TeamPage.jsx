"use client"

import { teamMembers } from "@/constants/siteInfo";
import TeamMemberCard from "../cards/TeamMemberCard";





export default function TeamPage() {

    return (
        <main className="teamPage margin">
            <h1>Edu-Findr Team</h1>

            <div className="teamMembersContainer">
                {teamMembers && teamMembers.map((member) => <TeamMemberCard key={member.name} {...member} />)}
            </div>
        </main>
    );

}