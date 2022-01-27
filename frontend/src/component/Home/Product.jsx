import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
  edit: false,
  color: "rgba(20, 20, 20, 0.1)",
  activeColor: "tomato",
  value: 2.5,
  isHalf: true,
  size: window.innerWidth > 600 ? 25 : 20,
};

export const Product = ({ product }) => {
  return (
    <Link className="productCard" to={product._id}>
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.1QKgb3kO7E8TJmxjF7hiVAHaKk%26pid%3DApi&f=1"
        alt={product.name}
      />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} /> <span>(256 reviews)</span>
      </div>
      <span>{product.price}</span>
    </Link>
  );
};
