/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import MyImage from "./../lazyLoadImage/MyImage";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAdmin from "./../hooks/useAdmin";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  // console.log(user.photoURL);
  // console.log(user);
  const handelLogout = () => {
    logOut()
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="drawer drawer-end z-30">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <MyImage
                  alt="Tailwind CSS Navbar component"
                  src={user.photoURL}
                />
              ) : (
                <FaUserAlt className="text-green" />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/update-profile">Profile</Link>
            </li>
            <li>
              <Link to="/">Order</Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/">Setting</Link>
            </li>
            <li>
              <a onClick={handelLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
