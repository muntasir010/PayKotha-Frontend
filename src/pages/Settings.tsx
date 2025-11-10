import { useNavigate } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import { startDashboardTour } from "./dashboard/tours/useUserDashboard";
import { role } from "@/constants/role";

const Settings = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading } = useUserInfoQuery(undefined);

  const handleRestartTour = () => {
    if (!userData) return;

    const userType = userData.data.user.role; // adjust this based on your backend: "user" or "agent"

    // Navigate to the correct dashboard first
    if (userType === role.USER) navigate("/user");
    else if (userType === role.AGENT) navigate("/agent");

    // Force start the tour
    startDashboardTour(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleRestartTour}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Restart Dashboard Tour
        </button>
      </div>
    </div>
  );
};

export default Settings;