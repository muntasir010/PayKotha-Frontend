import { role } from "@/constants/role";
import type { NavigateFunction } from "react-router";

interface User {
  role: string;
}

export const redirectToDashboard = (navigate: NavigateFunction, user?: User) => {
  if (!user) return navigate("/login");

  switch (user.role) {
    case role.ADMIN:
      navigate("/admin");
      break;
    case role.AGENT:
      navigate("/agent");
      break;
    case role.USER:
      navigate("/user");
      break;
    default:
      navigate("/login");
  }
};
