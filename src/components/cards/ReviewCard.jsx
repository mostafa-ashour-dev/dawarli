



export default function ReviewCard ({name, role, content, rating, img}) {
    return (
        <div className="review">
            <div className="reviewCreator">
                <img src={img} alt="user" />
                <div className="reviewCreatorInfo">
                    <h4>{name}</h4>
                    <p>{role}</p>
                </div>
            </div>

            <p>{content}</p>

            <span> Rating {rating}</span>
        </div>
    )
}