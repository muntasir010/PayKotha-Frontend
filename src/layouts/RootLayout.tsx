import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/Navbar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <div className="max-w-7xl mb-4 mx-auto">
        <NavBar />
        <Outlet />
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
      <Footer/>
    </>
  );
};

export default RootLayout;