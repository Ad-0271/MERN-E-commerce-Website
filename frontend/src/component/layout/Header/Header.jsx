import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UserOptions } from "./UserOptions";
import "./Header.css";

export const Header = ({ user, isAuthenticated }) => {
  return (
    <>
      <Box
        display="flex"
        bg="#1c6dd0"
        justifyContent="space-between"
        height="10vmin"
      >
        <Breadcrumb separator=" " pl="1vmax" color="white">
          <BreadcrumbItem isCurrentPage pt={"3vmin"}>
            <BreadcrumbLink as={Link} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/products">
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/search">
              Search
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/login">
              Login
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/contact">
              Contact
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/about">
              About
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {isAuthenticated && (
          <Breadcrumb>
            <BreadcrumbItem pt="1.5vmin" pr="1vmax">
              <UserOptions user={user} />
            </BreadcrumbItem>
          </Breadcrumb>
        )}
      </Box>
    </>
  );
};
