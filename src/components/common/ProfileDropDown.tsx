import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: userData } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();

  const user = userData?.data?.user;

  const isLoggedIn = !!localStorage.getItem("accessToken") || user?.email;

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully!");
      navigate("/");
    } catch {
      toast.error("Logout failed!");
    }
  };
  // DEFAULT avatar
  const avatar =
    user?.profileImg ||
    "https://i.ibb.co.com/zWjwgLsH/db40c047-22e9-48cc-9f0b-3832ff87e92e.jpg";

  if (!isLoggedIn) {
    return (
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 bg-orange-500 rounded-xl"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Circle Avatar */}
      <img
        src={avatar}
        onClick={() => setOpen(!open)}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover cursor-pointer border"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md border p-3 z-50">
          {/* Name & Email */}
          <div className="mb-3">
            <p className="font-semibold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full py-2 text-center px-3 rounded bg-red-100 text-red-600 hover:bg-red-200 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
