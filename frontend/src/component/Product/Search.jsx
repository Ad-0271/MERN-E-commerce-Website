import "./Search.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MetaData } from "../layout/MetaData";

export const Search = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    console.log(keyword);
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <MetaData title="Search a product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a product..."
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input type="submit" value="Search" />
      </form>
    </>
  );
};
