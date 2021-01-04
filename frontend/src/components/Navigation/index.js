import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignUpFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <div id="div__nav-bar">
      <div id="div__logo">
        <h2 className="h2__logo">
          <NavLink exact to="/">
            GreenGrab
          </NavLink>
        </h2>
      </div>
      <SearchBar />
      <div className="div__nav-links">
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink exact to="/offer-item">
              Offer Item
            </NavLink>
            {isLoaded && sessionLinks}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
