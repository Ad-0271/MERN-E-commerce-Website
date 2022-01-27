import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";

export const Header = () => {
  const options = {
    burgerColorHover: "#1C6DD0",
    logoWidth: "20vmax",
    logo,
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#1C6DD0",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#1C6DD0",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#1C6DD0",
    searchIconColorHover: "#1C6DD0",
    cartIconColorHover: "#1C6DD0",
    cartIconMargin: "1vmax",
  };
  return <ReactNavbar {...options} />;
};
