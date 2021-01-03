import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { FaUserCircle } from "react-icons/fa";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  // const [showMenu, setShowMenu] = useState(false);

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div className="dropdown">
        <FaUserCircle />
        <div className="profile-dropdown">
          <ul className="profile-dropdown">
            <li>
              <NavLink
                className="a__dropdown__link"
                exact
                to={`/profile/${user.id}`}
              >
                {user.username}
              </NavLink>
            </li>
            <li>{user.email}</li>
            <li>
              <button className="button__nav" onClick={logout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* <button >

      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )} */}
    </>
  );
}

export default ProfileButton;
