import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
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
    // <ul>
    //   <li>
    //     <NavLink exact to="/">
    //       Home
    //     </NavLink>
    //     {isLoaded && sessionLinks}
    //   </li>
    // </ul>
    <div id="div__nav-bar">
      <div id="div__logo">
        <h2>GreenGrab</h2>
      </div>
      <div id="div__search">
        <input class="input__search" type="text" placeholder="Search..." />
        <input class="input__location" type="text" placeholder="Location" />
      </div>
      <div id="div__nav-links">
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
