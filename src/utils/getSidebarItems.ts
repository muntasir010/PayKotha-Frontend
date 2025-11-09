import { role } from "@/constants/role";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.USER:
      return [...userSidebarItems];
    default:
      return [];
  }
};