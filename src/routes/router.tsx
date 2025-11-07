import App from "@/App";
import RootLayout from "@/layouts/RootLayout";
import Register from "@/pages/auth/Registation";
import { createBrowserRouter } from "react-router";

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
        path: "/signup",
        Component: Register,
      },
    ],
  },
]);

export default router;
