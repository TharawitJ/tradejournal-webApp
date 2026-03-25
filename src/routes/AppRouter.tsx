import { lazy, Suspense } from "react";
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import LoginScreen from "../pages/guest/login_screen";
const RegisterScreen = lazy(() => import("../pages/guest/register_screen"));
const ResetPassword2 = lazy(() => import("../pages/guest/reset_password"));
const AccountRecovery = lazy(() => import("../pages/guest/account_recovery"));
const JournalPage = lazy(() => import("../pages/user/Journal_page"));
const AssetChartStockView = lazy(
  () => import("../pages/user/asset_chart_stock_view"),
);
const FullPerformanceDashboard = lazy(
  () => import("../pages/user/full_performance_dashboard"),
);
const UpdatedSummaryDashboard = lazy(
  () => import("../pages/user/updated_summary_dashboard"),
);
import UserLayout from "../layouts/UserRouterLayout";

// const testRouter = createBrowserRouter([
//   { path: "/", Component: LoginScreen },
//   { path: "1", Component: RegisterScreen },
//   { path: "/2", Component: ResetPassword2 },
//   { path: "/3", Component: AssetChartStockView },
//   { path: "/4", Component: AccountRecovery },
//   { path: "/5", Component: FullPerformanceDashboard },
//   { path: "/6", Component: UpdatedSummaryDashboard },
// ]);

const guestRouter = createBrowserRouter([
  { path: "/", Component: LoginScreen },
  { path: "/account_recovery", Component: AccountRecovery },
  { path: "/reset_password", Component: ResetPassword2 },
  { path: "/register", Component: RegisterScreen },
  { path: "*", element: <Navigate to="/" /> },
]);
// No guest available
const userRouter = createBrowserRouter([
  {
    path: "/",
    Component: UserLayout,
    children: [
      { index: true, Component: UpdatedSummaryDashboard },
      { path: "chart", Component: AssetChartStockView },
      { path: "dashboard", Component: FullPerformanceDashboard },
      { path: "journal", Component: JournalPage },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

function AppRouter() {
  // set state user
  // const finalRouter = user ? userRouter : guestRouter
  return (
    <Suspense
      fallback={<span className="loading loading-dots loading-xl"></span>}
    >
      {<RouterProvider router={userRouter}></RouterProvider>}
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
