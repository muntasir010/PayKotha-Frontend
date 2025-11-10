import App from "@/App";
import RootLayout from "@/layouts/RootLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Registration";
import type { TRole } from "@/types";
import { createBrowserRouter } from "react-router";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import DashboardLayout from "@/layouts/DashboardLayouts";
import { role } from "@/constants/role";
import UserDashboard from "@/pages/dashboard/UserDashboard";
import { generateRoutes } from "@/utils/generateRoutes";
import { agentSidebarItems } from "./agentSidebarItems";
import { adminSidebarItems } from "./adminSidebarItems";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import About from "@/pages/about/About";
import Pricing from "@/pages/pricing/Pricing";
import Features from "@/pages/features/Features";
import Faq from "@/pages/faq/Faq";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "/about",
        Component: About
      },
      {
        path: "/pricing",
        Component: Pricing
      },
      {
        path: "/features",
        Component: Features
      },
      {
        path: "/faq",
        Component: Faq
      },
      {
        path: "/signup",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    path: "/admin",
    children: [
      { index: true, element: <AdminDashboard /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.USER as TRole),
    path: "/user",
    children: [
      { index: true, element: <UserDashboard /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.AGENT as TRole),
    path: "/agent",
    children: [
      { index: true, element: <UserDashboard /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },
]);

export default router;
