import "./Product.css";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

import {
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
} from "@chakra-ui/react";

import { clearErrors, getProduct } from "../../actions/productActions";

import { Loader } from "../layout/Loader/Loader";
import { ProductCard } from "../Home/ProductCard";
import { MetaData } from "../layout/MetaData";

const categories = ["Laptop", "Smartphone", "Camera", "Footwear", "Attire"];

export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("");

  const [sliderValue, setSliderValue] = useState(0);

  const [ratings, setRatings] = useState(sliderValue);

  const [showTooltip, setShowTooltip] = useState(false);

  const alert = useAlert();

  const dispatch = useDispatch();

  const {
    products,
    productsCount,
    resultPerPage,
    loading,
    error,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  let [price, setPrice] = useState([0, 25000]);

  let [visualPrice, setVisualPrice] = useState(price);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((el) => <ProductCard product={el} key={el._id} />)}
          </div>

          <div className="filterBox">
            <Text fontSize="lg">Price</Text>
            <div className="priceFilter">
              <RangeSlider
                defaultValue={price}
                min={0}
                max={25000}
                step={100}
                onChangeEnd={(val) => {
                  setPrice(val);
                  setCurrentPage(1);
                }}
                onChange={(val) => setVisualPrice(val)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <div>
                <span id="lowPrice">{visualPrice[0]}</span>
                {" - "}
                <span id="maxPrice">{visualPrice[1]}</span>
              </div>
            </div>
            <Text fontSize={"lg"}>Categories</Text>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => {
                    setCategory(category);
                    setCurrentPage(1);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Text component="legend">Ratings Above</Text>
              <Slider
                id="slider"
                value={sliderValue}
                min={0}
                max={5}
                boxSize={20}
                height={"3vmax"}
                padding="0"
                mt={0}
                onChange={(v) => setSliderValue(v)}
                onChangeEnd={(v) => setRatings(v)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <SliderTrack>
                  <SliderFilledTrack bg={"#1c6dd0"} />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="#1c6dd0"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={`${sliderValue}`}
                >
                  <SliderThumb />
                </Tooltip>
              </Slider>
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
