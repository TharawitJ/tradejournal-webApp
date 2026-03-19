import React from "react";
import { Link } from "react-router";

function Header() {
  return (
    <div className="flex items-center gap-5">
      <div className="flex-1 flex gap-2 justify-center pt-1 *:w-20 max-md:*:w-16 max-md:justify-start">
        <Link
          to="/home"
          className="flex justify-center hover:outline-2 hover:outline-blue-900"
        >
          Home
        </Link>
        <Link
          to="/chart"
          className="flex justify-center hover:outline-2 hover:outline-blue-900"
        >
          Chart
        </Link>
        <Link
          to="/journal"
          className="flex justify-center hover:outline-2 hover:outline-blue-900"
        >
          Journal
        </Link>
        <Link
          to="/dashboard"
          className="flex justify-center hover:outline-2 hover:outline-blue-900"
        >
          Dashboard
        </Link>
      </div>
      <div>
        <img src="" alt="img" />
        Profile
      </div>
    </div>
  );
}

export default Header;
