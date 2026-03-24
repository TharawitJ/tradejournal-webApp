import React from "react";
import { NavLink } from "react-router";

function Header() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="ml-auto px-5">
        <img src="" alt="img" />
        Profile
      </div>
      <div className="flex-1 flex gap-2 justify-center pt-1 *:w-20 max-md:*:w-16 max-md:justify-start">
        <NavLink
          to="/home"
          className="flex justify-center hover:outline-2 hover:outline-blue-900"
        >
          Home
        </NavLink>
        <NavLink
          to="/chart"
          className="flex justify-center hover:outline-2 hover:outline-blue-900"
        >
          Chart
        </NavLink>
        <NavLink
          to="/journal"
          className="flex justify-center hover:outline-2 hover:outline-blue-900"
        >
          Journal
        </NavLink>
        <NavLink
          to="/dashboard"
          className="flex justify-center hover:outline-2 hover:outline-blue-900"
        >
          Dashboard
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
