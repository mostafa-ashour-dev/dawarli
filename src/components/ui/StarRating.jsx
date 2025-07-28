import { FaRegStar, FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";


export default function StarRating({rating}) {

    const stars = [];

    for(let i =0; i < 5; i++) {
        const starValue = i + 1;

        if (rating >= starValue) {
            stars.push(<FaStar key={i}/>);
        } else if (rating >= starValue - 0.5) {
            stars.push(<FaStarHalfAlt key={i}/>);
        }else {
            stars.push(<FaRegStar key={i}/>);
        } 
    }
    


    return (
        <div className="starRating">
            {
                stars
            }
        </div>
    )
}