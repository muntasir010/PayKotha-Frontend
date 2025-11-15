import { Navigate } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import { role } from "@/constants/role";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const user = data?.data?.user;

  if (isLoading) return null;

  if (user) {
    if (user.role === role.ADMIN) return <Navigate to="/admin" replace />;
    if (user.role === role.AGENT) return <Navigate to="/agent" replace />;
    if (user.role === role.USER) return <Navigate to="/user" replace />;
  }

  return <>{children}</>;
};
