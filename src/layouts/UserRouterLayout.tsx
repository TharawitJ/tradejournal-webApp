import React from "react";
import { Outlet } from "react-router";
import Header from "../components/User/Header";
function UserLayout() {
  return (
    <>
      <div>
          <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserLayout;
