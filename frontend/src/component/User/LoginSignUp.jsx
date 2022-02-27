import "./LoginSignUp.css";

import { Mail } from "@styled-icons/entypo/Mail";
import { LockOpen } from "@styled-icons/boxicons-solid/LockOpen";
import { Face } from "@styled-icons/material/Face";
import { Icon } from "@chakra-ui/icon";

import { useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Loader } from "../layout/Loader/Loader";
import { login, register } from "../../actions/userActions";
import { clearErrors } from "../../actions/productActions";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useEffect } from "react";

export const LoginSignUp = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  const loginTab = useRef(null);

  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setEmail] = useState("");
  const [loginPassword, setPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myform = { name, email, password, avatar };

    dispatch(register(myform));
  };

  const registerData = ({ name, value, files }) => {
    if (name === "avatar") {
      const reader = new FileReader();

      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="loginSignUpContainer">
            <div className="loginSignUpBox">
              <div>
                <div className="login_signup_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form
                action=""
                className="loginForm"
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="loginEmail">
                  <Icon as={Mail} />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <Icon as={LockOpen} />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <Icon as={Face} />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => registerData(e.target)}
                  />
                </div>
                <div className="signUpEmail">
                  <Icon as={Mail} />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => registerData(e.target)}
                  />
                </div>
                <div className="signUpPassword">
                  <Icon as={LockOpen} />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => registerData(e.target)}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="AvatarPreview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => registerData(e.target)}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
