import { CgMouse } from "react-icons/cg";
import "./Home.css";
import { Product } from "./Product";
import { MetaData } from "../layout/MetaData";

const product = {
  name: "White shirt",
  price: 3000,
  _id: "sample id",
};

export const Home = () => {
  return (
    <>
      <MetaData title="ECOMMERCE" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};
