import { useUserInfoQuery } from "@/redux/features/auth/auth";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    console.log("user chan from withAuth", data?.data?.user)

    if (!isLoading && !data?.data?.user?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.user?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};