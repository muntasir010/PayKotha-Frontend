import AIChatBot from "@/components/AiChatBot";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/Navbar";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router";

const RootLayout = () => {
   const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";
  return (
    <>
      <div className="mb-4 mx-auto">
        <NavBar />
        <div className="pt-16">
          <Outlet />
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-stone-900",
          style: {
            border: "1px solid #262626",
            color: "#d4d4d4",
            background: "#171717",
          },
        }}
      />
        {!isAuthPage && <Footer />}
      <AIChatBot/>
    </>
  );
};

export default RootLayout;