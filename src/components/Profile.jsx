/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import MyImage from "./../lazyLoadImage/MyImage";
import { FaUserAlt } from "react-icons/fa";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
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
              <MyImage
                alt="Tailwind CSS Navbar component"
                src={
                  user.photoURL ? (
                    user.photoURL
                  ) : (
                    <FaUserAlt className="text-green" />
                  )
                }
              />
            </div>{" "}
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
              <a>Profile</a>
            </li>
            <li>
              <a>Order</a>
            </li>
            <li>
              <a>Setting</a>
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
