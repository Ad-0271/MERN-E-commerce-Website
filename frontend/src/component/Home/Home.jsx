import "./Home.css";

import { Mouse } from "@styled-icons/bootstrap/Mouse/Mouse";
import { Icon } from "@chakra-ui/icon";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAlert } from "react-alert";

import { clearErrors, getProduct } from "../../actions/productActions";

import { ProductCard } from "./ProductCard";
import { MetaData } from "../layout/MetaData";
import { Loader } from "../layout/Loader/Loader";

export const Home = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <Icon as={Mouse} />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((el) => <ProductCard product={el} key={el._id} />)}
          </div>
        </>
      )}
    </>
  );
};
