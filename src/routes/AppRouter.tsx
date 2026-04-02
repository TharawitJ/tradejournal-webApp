import { lazy, Suspense } from "react";
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import LoginScreen from "../pages/guest/login_screen";
const RegisterScreen = lazy(() => import("../pages/guest/register_screen"));
const ResetPassword2 = lazy(() => import("../pages/guest/reset_password"));
const AccountRecovery = lazy(() => import("../pages/guest/account_recovery"));
const JournalPage = lazy(() => import("../pages/user/Journal_page"));
const ProfilePage = lazy(() => import("../pages/user/profile"));
import AssetChartStockView from "../pages/user/asset_chart_stock_view";
const FullPerformanceDashboard = lazy(
  () => import("../pages/user/full_performance_dashboard"),
);
const UpdatedSummaryDashboard = lazy(
  () => import("../pages/user/updated_summary_dashboard"),
);
import UserLayout from "../layouts/UserRouterLayout";
import useUserStore from "../stores/userStore"

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
      { path: "profile", Component: ProfilePage },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

function AppRouter() {

  const user = useUserStore(state => state.user)
  // const token = useUserStore(state => state.token)
  const finalRouter = user ? userRouter : guestRouter
  return (
    <Suspense
      fallback={<span className="loading loading-dots loading-xl"></span>}
    >
      {<RouterProvider router={finalRouter}></RouterProvider>}
    </Suspense>
  );
}

export default AppRouter;
