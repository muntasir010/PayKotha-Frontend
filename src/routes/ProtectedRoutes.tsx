import { Navigate } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({ children, redirectTo = "/login" }: ProtectedRouteProps) => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const user = data?.data?.user;

  if (isLoading) return null;

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
