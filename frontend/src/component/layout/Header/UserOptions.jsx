import "./Header.css";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
} from "@chakra-ui/react";

import { ListAlt, Person, ExitToApp, Dashboard } from "@styled-icons/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userActions";

export const UserOptions = ({ user }) => {
  const disptach = useDispatch();

  const navigate = useNavigate();

  const alert = useAlert();

  const menuItems = [
    { name: "Orders", icon: <Icon as={ListAlt} />, func: orders },
    { name: "Profile", icon: <Icon as={Person} />, func: account },
    { name: "Logout", icon: <Icon as={ExitToApp} />, func: logoutUser },
  ];

  if (user.role === "admin") {
    menuItems.unshift({
      name: "Dashboard",
      icon: <Icon as={Dashboard} />,
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    disptach(logout());
    alert.success("Logout Successfully");
  }

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={
            <img
              alt="Profile"
              src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            />
          }
          variant="outline"
          borderRadius="full"
        ></MenuButton>
        <MenuList>
          {menuItems.map((el) => (
            <MenuItem icon={el.icon} key={el.name} onClick={el.func}>
              {el.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
