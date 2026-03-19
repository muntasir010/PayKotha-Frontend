import AIChatBot from "@/components/AiChatBot";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/Navbar";
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
        {!isAuthPage && <Footer />}
      <AIChatBot/>
    </>
  );
};

export default RootLayout;