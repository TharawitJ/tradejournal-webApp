import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
function UserLayout() {
  return (
    <>
      <div>
        <div className="p-5 bg-amber-200 text-center text-amber-900 border-b-2">
          <Header />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserLayout;
