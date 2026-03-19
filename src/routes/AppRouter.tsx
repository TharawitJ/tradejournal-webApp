import { lazy, Suspense } from "react";
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Login from "../pages/Login";
const Home = lazy(() => import("../pages/Home"));
const Chart = lazy(() => import("../pages/Chart"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Journal = lazy(() => import("../pages/Journal"));
const Register = lazy(() => import("../pages/Register"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
import UserLayout from "../layouts/UserLayout";

const guestRouter = createBrowserRouter([
  { path: "/", Component: Login },
  { path: "*", element: <Navigate to="/" /> },
]);
// No guest available
const userRouter = createBrowserRouter([
  {
    path: "/",
    Component: UserLayout,
    children: [
      { index: true, Component: Home },
      { path: "chart", Component: Chart },
      { path: "dashboard", Component: Dashboard },
      { path: "journal", Component: Journal },
      { path: "reset_password", Component: ResetPassword },
      { path: "register", Component: Register },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

function AppRouter() {
  // set state user
  const user = {id:1}
    const finalRouter = user ? userRouter : guestRouter
  return (
    <Suspense
      fallback={<span className="loading loading-dots loading-xl"></span>}
    >
      {<RouterProvider key={user?.id} router={finalRouter}></RouterProvider>}
    </Suspense>
  );
}

export default AppRouter;

// root login
// Register
// Reset password
// login successful
// Chart :  index + chart add journal
// Journal : index + Journal : Edit
// Dashboard
