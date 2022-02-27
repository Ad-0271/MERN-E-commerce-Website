import "./UpdateProfile.css";

import { Mail } from "@styled-icons/entypo/Mail";
import { Face } from "@styled-icons/material/Face";
import { Icon } from "@chakra-ui/icon";

import { useState, useEffect } from "react";

import { Loader } from "../layout/Loader/Loader";
import {
  updateProfile,
  clearErrors,
  loadUser,
} from "../../actions/userActions";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../actionTypes/userActionTypes";
import { useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";

export const UpdateProfile = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myform = { name, email, avatar };

    dispatch(updateProfile(myform));
  };

  const updateProfileData = ({ name, value, files }) => {
    const reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <Icon as={Face} />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <Icon as={Mail} />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="AvatarPreview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => updateProfileData(e.target)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
