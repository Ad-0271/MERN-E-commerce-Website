import "./ProductDetails.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { Carousel } from "react-responsive-carousel";
import ReactStars from "react-rating-stars-component";

import { clearErrors, getProductDetails } from "../../actions/productActions";

import { ReviewCard } from "./ReviewCard";
import { Loader } from "../layout/Loader/Loader";
import { MetaData } from "../layout/MetaData";

export const ProductDetails = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    value: product.rating,
    isHalf: true,
    size: window.innerWidth > 600 ? 25 : 20,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="productDetails">
            <div>
              <Carousel
                autoPlay={true}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                stopOnHover={true}
                width={"20vmax"}
              >
                {product.images &&
                  product.images.map((el, i) => (
                    <div>
                      <img
                        src={el.url}
                        alt={`${i} Slide`}
                        key={el.url}
                        className="carouselImage"
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status: {""}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">Reviews</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review, i) => (
                  <ReviewCard review={review} key={i} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};
