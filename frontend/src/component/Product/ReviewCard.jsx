import profilePng from "../../images/Profile.png";
import ReactStars from "react-rating-stars-component";
export const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    value: review.rating,
    isHalf: true,
    size: window.innerWidth > 600 ? 25 : 20,
  };

  return (
    <>
      <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
      </div>
    </>
  );
};
