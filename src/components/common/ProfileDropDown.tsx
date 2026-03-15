// import { useState } from "react";
// import { useNavigate } from "react-router";
// import toast from "react-hot-toast";
// import { useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth";

// const ProfileDropdown = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const { data: userData } = useUserInfoQuery(undefined);
//   const [logout] = useLogoutMutation();

//   const user = userData?.data?.user;

//   const isLoggedIn = !!localStorage.getItem("accessToken") || user?.email;

//   const handleLogout = async () => {
//     try {
//       await logout({}).unwrap();
//       localStorage.removeItem("accessToken");
//       toast.success("Logged out successfully!");
//       navigate("/");
//     } catch {
//       toast.error("Logout failed!");
//     }
//   };
//   // DEFAULT avatar
//   const avatar =
//     user?.profileImg ||
//     "https://i.ibb.co.com/zWjwgLsH/db40c047-22e9-48cc-9f0b-3832ff87e92e.jpg";

//   if (!isLoggedIn) {
//     return (
//       <button
//         onClick={() => navigate("/login")}
//         className="px-2 py-1 md:px-4 md:py-2 bg-orange-500 rounded-xl"
//       >
//         Login
//       </button>
//     );
//   }

//   return (
//     <div className="relative">
//       {/* Circle Avatar */}
//       <img
//         src={avatar}
//         onClick={() => setOpen(!open)}
//         alt="profile"
//         className="w-10 h-10 rounded-full object-cover cursor-pointer border"
//       />

//       {open && (
//         <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md border p-3 z-50">
//           {/* Name & Email */}
//           <div className="mb-3">
//             <p className="font-semibold text-gray-900">{user?.name}</p>
//             <p className="text-sm text-gray-500">{user?.email}</p>
//           </div>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="w-full py-2 text-center px-3 rounded bg-red-100 text-red-600 hover:bg-red-200 font-medium"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileDropdown;


import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import { useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth";
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: userData } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();

  const user = userData?.data?.user;
  const isLoggedIn = !!localStorage.getItem("accessToken") || user?.email;

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ হওয়ার লজিক
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully!");
      navigate("/");
      setOpen(false);
    } catch {
      toast.error("Logout failed!");
    }
  };

  const getDashboardLink = () => {
    switch (user?.role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "AGENT":
        return "/agent/dashboard";
      case "USER":
        return "/user/dashboard";
      default:
        return "/dashboard";
    }
  };

  const avatar =
    user?.profileImg ||
    "https://i.ibb.co.com/zWjwgLsH/db40c047-22e9-48cc-9f0b-3832ff87e92e.jpg";

  if (!isLoggedIn) {
    return (
      <button
        onClick={() => navigate("/login")}
        className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Circle Avatar */}
      <img
        src={avatar}
        onClick={() => setOpen(!open)}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-orange-100 hover:border-orange-500 transition-all shadow-sm"
      />

      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white shadow-2xl rounded-xl border border-gray-100 p-2 z-100 animate-in fade-in zoom-in duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-50 mb-1">
            <p className="font-bold text-gray-800 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full uppercase">
              {user?.role}
            </span>
          </div>

          <div className="space-y-1">
            {/* Dashboard Link - Role Based */}
            <Link
              to={getDashboardLink()}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors group"
            >
              <LayoutDashboard className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
              <span>Dashboard</span>
            </Link>

            {/* Profile Link */}
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors group"
            >
              <UserIcon className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
              <span>My Profile</span>
            </Link>

            <hr className="my-1 border-gray-50" />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
            >
              <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-600" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;