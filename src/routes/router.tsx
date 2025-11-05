import App from "@/App";
import RootLayout from "@/layouts/RootLayout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
        {
            index: true,
            Component: App,
        }
    ]
  },
]);

export default router;