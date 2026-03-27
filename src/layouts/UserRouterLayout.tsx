import React from "react";
import { Outlet } from "react-router";
import Header from "../components/user/Header";
function UserLayout() {
  return (
    <>
      <div className="bg-[#0e0e0e]">
          <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserLayout;
