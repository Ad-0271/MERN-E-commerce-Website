import "./UpdatePassword.css";

import { Icon } from "@chakra-ui/icon";
import { LockOpen } from "@styled-icons/boxicons-solid/LockOpen";
import { Lock } from "@styled-icons/boxicons-solid/Lock";
import { VpnKey } from "@styled-icons/material-rounded/VpnKey";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../actionTypes/userActionTypes";

import { Loader } from "../layout/Loader/Loader";
import { MetaData } from "../layout/MetaData";

export const UpdatePassword = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myform = { oldPassword, newPassword, confirmPassword };

    dispatch(updatePassword(myform));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <Icon as={VpnKey} />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <Icon as={LockOpen} />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <Icon as={Lock} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
