"use client";

import { cities } from "@/constants/filtersOptions";
import StarRating from "../ui/StarRating";
import { FaCity, FaGraduationCap } from "react-icons/fa";

export default function SchoolCard({ onClick, image, title, educationType, city, location, link, rating }) {

    return (
        <div className="schoolCard" onClick={onClick}>
            <div className="schoolImage">
                <img src={image || "https://via.placeholder.com/150"} alt={title} />
            </div>
            <div className="schoolContentInfo">
                <h4>{title || "School Name"}</h4>
                <p> <FaGraduationCap /> {educationType || "Education Type"}</p>
                <div className="ratingAndCity">
                    <StarRating rating={rating} />

                    <span>
                        <FaCity />
                        {city ? (
                            (() => {
                                const addressParts = city.split(",").map(part => part.trim().toLowerCase());

                                const matchedCity = cities.find(cityName =>
                                    addressParts.includes(cityName.toLowerCase())
                                );

                                return matchedCity || "Egypt";
                            })()
                        ) : "Egypt"}
                    </span>

                </div>
            </div>
        </div>
    )
}