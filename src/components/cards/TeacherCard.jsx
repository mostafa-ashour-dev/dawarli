import { FaGraduationCap, FaUserGraduate } from "react-icons/fa";



export default function TeacherCard({ avatar, name, gender, phoneNumber, subject, description, stagesTought, educationType, city }) {
    return (
        <div className="teacherCard">

            <div className="moreInfoBadge">
                <div className="infoBox">
                    <h6>Desctiption</h6>
                    <p>{description || "Description"}</p>
                </div>

                <div className="infoBox">
                    <h6>City </h6>
                    <p>{city || "City"}</p>
                </div>

                <div className="infoBox">
                    <h6>Gender</h6>
                    <p>{gender || "Gender"}</p>
                </div>

                <div className="infoBox">
                    <h6>Phone Number</h6>
                    <p>{phoneNumber || "+20123456789"}</p>
                </div>


            </div>

            <div className="teacherAvatarAndName">
                <div className="teacherAvatar">
                    <img src={avatar || gender && gender.toLowerCase() === "male" ? "/imgs/user-male.png" : "/imgs/user-female.png"} alt={name} />
                </div>
                <div>
                    <h4>{name || "Teacher Name"}</h4>
                    <p>{subject || "Subject"}</p>
                </div>
            </div>

            <div className="teacherStagesTought">
                <FaUserGraduate />
                <p>{stagesTought || "Primary Stage"}</p>
            </div>

            <div className="teacherEductionType">
                <FaGraduationCap />
                <p>{educationType || "Education Type"}</p>
            </div>
        </div>
    )
}