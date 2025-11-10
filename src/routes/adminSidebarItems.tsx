import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import ViewBlockedUsers from "@/pages/dashboard/admin/BlockedUsers";
import ViewBlockedWallets from "@/pages/dashboard/admin/BlockedWallets";
import AgentsPage from "@/pages/dashboard/admin/ViewAgents";
import ViewTransactions from "@/pages/dashboard/admin/ViewTransactions";
import ViewUsers from "@/pages/dashboard/admin/ViewUsers";
import ViewWallets from "@/pages/dashboard/admin/ViewWallets";
import ProfileUpdate from "@/pages/dashboard/common/UpdateProfile";
import type { ISidebarItem } from "@/types";


export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin",
        component: AdminDashboard,
      },
      {
        title: "Profile",
        url: "/admin/profile",
        component: ProfileUpdate,
      },
      {
        title: "View Users",
        url: "/admin/view-users",
        component: ViewUsers,
      },
      {
        title: "View Wallets",
        url: "/admin/view-wallets",
        component: ViewWallets,
      },
      {
        title: "View transactions",
        url: "/admin/view-transactions",
        component: ViewTransactions,
      },
      {
        title: "Blocked Wallets",
        url: "/admin/blocked-wallets",
        component: ViewBlockedWallets,
      },
      {
        title: "Blocked Users",
        url: "/admin/blocked-users",
        component: ViewBlockedUsers,
      },
      {
        title: "Suspended Agents",
        url: "/admin/suspended-agents",
        component: AgentsPage,
      },
    ],
  },
];