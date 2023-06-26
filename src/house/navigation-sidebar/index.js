import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMagnifyingGlass,
  faRectangleAd,
  faUser,
  faRightToBracket,
  faRegistered,
  faLeftLong
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router";
import { logoutThunk } from "../services/auth-thunks";

const NavigationSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [ignore, house, active] = pathname.split("/");
  const links = [
    { name: "home", icon: faHome },
    { name: "search", icon: faMagnifyingGlass },
    { name: "advertisement", icon: faRectangleAd },
    { name: "profile", icon: faUser },
  ];
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="list-group mb-2 mt-2">
        {links.map(({ name, icon }) => (
          <Link
            to={`/house/${name}`}
            className={`list-group-item text-capitalize ${
              active === name ? "active" : ""
            } d-flex align-items-center`}
          >
            <FontAwesomeIcon icon={icon} />{" "}
            <span className="d-none d-lg-none d-xl-block ms-2">{name}</span>
          </Link>
        ))}
        {!currentUser && (
          <Link
            className={`list-group-item text-capitalize ${
              active === "login" ? "active" : ""
            } d-flex align-items-center`}
            to="/house/login"
          >
            <FontAwesomeIcon icon={faRightToBracket} />{" "}
            <span className="d-none d-lg-none d-xl-block ms-2">Login</span>
          </Link>
        )}

        {!currentUser && (
          <Link
            className={`list-group-item text-capitalize ${
              active === "register" ? "active" : ""
            } d-flex align-items-center`}
            to="/house/register"
          >
            <FontAwesomeIcon icon={faRegistered} />{" "}
            <span className="d-none d-lg-none d-xl-block ms-2">Register</span>
          </Link>
        )}
        {currentUser && (
          <Link
            className="list-group-item d-flex align-items-center"
            onClick={async () => {
              await dispatch(logoutThunk());
              navigate("/house/login");
            }}
          >
            <FontAwesomeIcon icon={faLeftLong} />{" "}
            <span className="d-none d-lg-none d-xl-block ms-2">Logout</span>
          </Link>
        )}
      </div>
    </>
  );
};
export default NavigationSidebar;
