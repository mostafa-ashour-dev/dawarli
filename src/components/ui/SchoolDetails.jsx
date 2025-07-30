"use client";

import { FaCity, FaGraduationCap, FaLocationArrow, FaTimes, FaUserEdit } from "react-icons/fa";
import StarRating from "./StarRating";
import Btn from "./Btn";
import { useState } from "react";
import ReviewCard from "../cards/ReviewCard";


const descriptions = [
    "{school_name} is a premier educational institution committed to academic excellence and holistic development. Our state-of-the-art facilities and dedicated faculty create an environment where students thrive both academically and personally.",
    "At {school_name}, we believe in nurturing young minds through innovative teaching methods and a well-rounded curriculum. Our school fosters creativity, critical thinking, and character development in a supportive community.",
    "{school_name} stands as a beacon of quality education, offering a balanced approach to learning that combines rigorous academics with extracurricular enrichment. We prepare students to meet the challenges of tomorrow's world.",
    "With a legacy of educational excellence, {school_name} provides a dynamic learning environment where students discover their passions and develop the skills needed for success in an ever-changing global landscape.",
    "{school_name} is more than just a school - it's a vibrant learning community that values diversity, innovation, and personal growth. Our comprehensive programs cater to the intellectual, social, and emotional needs of every student.",
    "Dedicated to shaping future leaders, {school_name} offers a stimulating academic environment complemented by outstanding arts, athletics, and technology programs. We empower students to reach their full potential.",
    "{school_name} provides a transformative educational experience that blends traditional values with modern teaching approaches. Our committed educators guide students on their journey to becoming responsible global citizens.",
    "At {school_name}, education goes beyond textbooks. We cultivate curiosity, resilience, and ethical values in our students through experiential learning opportunities and a supportive school culture.",
    "{school_name} is recognized for its academic rigor and nurturing environment. Our personalized approach to learning ensures each student receives the attention and resources they need to excel.",
    "As a forward-thinking institution, {school_name} combines academic excellence with character education. We prepare students not just for tests, but for life, with skills that will serve them well into adulthood.",
];

const schoolReviews = [
    {
        name: "Mohamed Ali",
        role: "Parent",
        content: "This school has been wonderful for my child. The teachers are attentive and the curriculum is well-structured. My son has improved significantly in math since joining.",
        rating: 4.5,
        img: "/imgs/user-male.png"
    },
    {
        name: "Sarah Johnson",
        role: "Parent",
        content: "Excellent facilities and dedicated staff. The communication between teachers and parents could be better, but overall we're very satisfied with the education our daughter is receiving.",
        rating: 4.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "David Thompson",
        role: "Parent",
        content: "The sports program at this school is outstanding. My child has developed both athletic skills and teamwork. Academic standards are maintained well alongside extracurricular activities.",
        rating: 5.0,
        img: "/imgs/user-male.png"
    },
    {
        name: "Emily Chen",
        role: "Teacher",
        content: "I've been teaching here for 3 years and it's a supportive environment for both staff and students. The administration listens to teacher feedback and works to implement positive changes.",
        rating: 4.5,
        img: "/imgs/user-female.png"
    },
    {
        name: "James Wilson",
        role: "Parent",
        content: "Good school overall, though the homework load can be heavy at times. The teachers are knowledgeable and care about student success. The new science lab is a great addition.",
        rating: 4.0,
        img: "/imgs/user-male.png"
    },
    {
        name: "Fatima Abdullah",
        role: "Parent",
        content: "The diversity at this school is wonderful. My children have learned so much about different cultures while receiving a quality education. The language programs are particularly strong.",
        rating: 5.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "Robert Garcia",
        role: "Parent",
        content: "My child was struggling in their previous school but has flourished here. The individualized attention and smaller class sizes make a big difference. Highly recommend!",
        rating: 5.0,
        img: "/imgs/user-male.png"
    },
    {
        name: "Lisa Park",
        role: "Parent",
        content: "The arts program is exceptional. My daughter has discovered a passion for music thanks to the talented instructors. I do wish there were more field trip opportunities though.",
        rating: 4.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "Michael Brown",
        role: "Parent",
        content: "Solid academic foundation with good extracurricular options. The school could improve its technology resources, but the teaching quality is excellent.",
        rating: 4.0,
        img: "/imgs/user-male.png"
    },
    {
        name: "Aisha Mohamed",
        role: "Parent",
        content: "The Islamic studies program is well-integrated with the national curriculum. My children are receiving both religious and secular education at high standards.",
        rating: 4.5,
        img: "/imgs/user-female.png"
    },
    {
        name: "Daniel Kim",
        role: "Parent",
        content: "Very pleased with how the school handled distance learning during recent disruptions. They were well-prepared and maintained educational quality throughout.",
        rating: 4.5,
        img: "/imgs/user-male.png"
    },
    {
        name: "Olivia Smith",
        role: "Parent",
        content: "The early years program is nurturing and effective. My kindergartener has developed both academically and socially. The teachers truly understand young children's needs.",
        rating: 5.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "Thomas Wright",
        role: "Parent",
        content: "Good school with strong values. The discipline policy is fair and effective. My son has become more responsible since attending.",
        rating: 4.0,
        img: "/imgs/user-male.png"
    },
    {
        name: "Noor Hassan",
        role: "Parent",
        content: "The Quran memorization program is excellent. My child has progressed rapidly while still keeping up with regular subjects. The teachers are patient and encouraging.",
        rating: 5.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "Christopher Lee",
        role: "Parent",
        content: "The STEM focus is preparing my child well for future studies. The robotics club and science fair opportunities are impressive for a school at this level.",
        rating: 4.5,
        img: "/imgs/user-male.png"
    },
    {
        name: "Sophia Martinez",
        role: "Parent",
        content: "We transferred here last year and couldn't be happier. The welcoming community made our transition smooth. My daughter looks forward to school every day.",
        rating: 5.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "William Johnson",
        role: "Parent",
        content: "The school facilities are modern and well-maintained. The library is particularly impressive with its range of resources. Some after-school programs could be expanded.",
        rating: 4.0,
        img: "/imgs/user-male.png"
    },
    {
        name: "Amina Yusuf",
        role: "Parent",
        content: "I appreciate how the school incorporates Islamic values throughout the curriculum. My children are learning to be good students and good Muslims simultaneously.",
        rating: 5.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "Benjamin Clark",
        role: "Parent",
        content: "Strong academic results year after year. The college counseling in upper grades is particularly helpful. Some sports facilities could use updating though.",
        rating: 4.0,
        img: "/imgs/user-male.png"
    },
    {
        name: "Zainab Ibrahim",
        role: "Parent",
        content: "The Arabic language instruction is excellent. My children are becoming truly bilingual. The school environment is supportive and focused on holistic development.",
        rating: 5.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "Matthew Taylor",
        role: "Parent",
        content: "Good balance between academic rigor and student well-being. The teachers are approachable and responsive to parent concerns. The parking situation at drop-off could be improved.",
        rating: 4.0,
        img: "/imgs/user-male.png"
    },
    {
        name: "Leila Rahman",
        role: "Parent",
        content: "The school's emphasis on character development alongside academics is commendable. My daughter has grown in confidence and moral understanding.",
        rating: 5.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "Andrew Wilson",
        role: "Parent",
        content: "The music and drama programs are outstanding. My son's performance skills have blossomed. I wish there were more advanced math options for gifted students.",
        rating: 4.0,
        img: "/imgs/user-male.png"
    },
    {
        name: "Yasmin Omar",
        role: "Parent",
        content: "As a working parent, I appreciate the extended care options. The homework club has been especially helpful. The teachers genuinely care about each student's success.",
        rating: 4.5,
        img: "/imgs/user-female.png"
    },
    {
        name: "Ryan Scott",
        role: "Parent",
        content: "The school has effective anti-bullying policies and promotes kindness. My child feels safe and valued here. The science curriculum could be more challenging.",
        rating: 4.0,
        img: "/imgs/user-male.png"
    },
    {
        name: "Huda Ahmed",
        role: "Parent",
        content: "The Islamic environment is authentic and nurturing. My children are proud of their faith and excelling academically. The school events are always well-organized.",
        rating: 5.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "Kevin Adams",
        role: "Parent",
        content: "Good communication from the administration. The parent portal makes it easy to track my child's progress. Some classroom materials seem outdated.",
        rating: 4.0,
        img: "/imgs/user-male.png"
    },
    {
        name: "Mariam Khalid",
        role: "Parent",
        content: "The Quran recitation program produces amazing results. My daughter has memorized more than we expected at her age while maintaining excellent grades in all subjects.",
        rating: 5.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "Jason Miller",
        role: "Parent",
        content: "The school prepares students well for standardized tests. My son scored in the top percentiles after two years here. More focus on creative writing would be beneficial.",
        rating: 4.5,
        img: "/imgs/user-male.png"
    },
    {
        name: "Alya Nassar",
        role: "Parent",
        content: "The balance between Islamic studies and modern education is perfect. My children are getting the best of both worlds. The teachers are highly qualified and caring.",
        rating: 5.0,
        img: "/imgs/user-female.png"
    },
    {
        name: "Brian Cooper",
        role: "Parent",
        content: "The school has a strong sense of community. Parent involvement is encouraged and valued. Some after-school activities fill up too quickly during registration.",
        rating: 4.0,
        img: "/imgs/user-male.png"
    }
];

function getRandomDescription(title) {
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    const randomDescription = descriptions[randomIndex].replace("{school_name}", title);
    return randomDescription;
}

export default function SchoolDetails({ handleShowDetails, show, image, title, location, educationType, rating }) {

    
    return (
        <div className={`schoolDetails ${show && show ? "active" : ""} `}>

            <button className="backBtn" onClick={() => {
                handleShowDetails();
            }}><FaTimes /></button>

            <div className="schoolDetailsContainer">
                <div className="schoolDetailsContent">
                    <div className="schoolDetailsImage">
                        <img src={image || "/imgs/placeholder1.jpg"} alt={title} />
                    </div>
                    <div className="schoolDetailsInfo">
                        <StarRating rating={rating} />
                        <h2>{title || "School Name"}</h2>
                        <p>{descriptions[0].replace("{school_name}", title)}</p>
                        <div className="buttons">
                            <Btn text={"Location"} link={"https://www.google.com/maps/search/" + title + (location && location[0]?.address || ", Egypt") || "https://www.google.com/maps/search/"} active={true} />

                        </div>
                    </div>
                </div>

                <div className="bottomContainer">


                    <div className="schoolEducation infoBox">
                        <header><FaGraduationCap /> <h3>Education Type</h3></header>
                        <p>{educationType || "Egypt"}</p>
                    </div>

                    <div className="schoolLocation infoBox">
                        <header><FaCity /> <h3>Address</h3></header>
                        <p>{location && location[0]?.address || "Egypt"}</p>
                    </div>
                </div>

                <div className="reviewsContainer infoBox">
                    <header><FaUserEdit /> <h3>Reviews</h3></header>

                    <div className="reviewsGrid">

                        {

                            !rating ? (
                                <p>No reviews yet</p>
                            ) :

                            schoolReviews.map((review, index) => (
                                <ReviewCard key={index} name={review.name} role={review.role} content={review.content} rating={review.rating} img={review.img} />
                            ))
                        }

                       
                        
                    </div>
                </div>
                
            </div>

        </div>
    )
}