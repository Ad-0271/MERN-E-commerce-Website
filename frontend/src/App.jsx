import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { Header } from "./component/layout/Header/Header";
import { Footer } from "./component/layout/Footer/Footer";
import { Home } from "./component/Home/Home";
import { ProductDetails } from "./component/Product/ProductDetails";
import { Products } from "./component/Product/Products";
import { Search } from "./component/Product/Search";
import { LoginSignUp } from "./component/User/LoginSignUp";
import { store } from "./store";
import { loadUser } from "./actions/userActions";
import { Profile } from "./component/User/Profile";
import { UpdateProfile } from "./component/User/UpdateProfile";
import { UpdatePassword } from "./component/User/UpdatePassword";
import { ForgotPassword } from "./component/User/ForgotPassword";

import { PrivateRoute } from "./component/Route/PrivateRoute";

import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header user={user} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/login" element={<LoginSignUp />}></Route>
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/me/update"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/password/update"
          element={
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/password/forgot" element={<ForgotPassword />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
