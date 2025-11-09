
import AddMoney from "@/pages/dashboard/common/AddMoney";
import ProfileUpdate from "@/pages/dashboard/common/UpdateProfile";
import SendMoney from "@/pages/dashboard/common/SendMoney";
import TransactionHistory from "@/pages/dashboard/common/TransactionHistory";
import WalletDetails from "@/pages/dashboard/common/WalletDetails";
import WithdrawMoney from "@/pages/dashboard/common/WithdrawMoney";
import UserDashboard from "@/pages/dashboard/UserDashboard";
import Settings from "@/pages/Settings";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {     
        title: "Home",
        url: "/user",
        component: UserDashboard
      },
      {
        title: "Profile",
        url: "/user/profile",
        component: ProfileUpdate,
      },
      {
        title: "Wallet Details",
        url: "/user/wallet-details",
        component: WalletDetails
      },
      {
        title: "Add Money",
        url: "/user/add-money",
        component: AddMoney
      },
      {
        title: "Withdraw Money",
        url: "/user/withdraw-money",
        component: WithdrawMoney
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney
      },
      {
        title: "Transaction History",
        url: "/user/transaction-history",
        component: TransactionHistory
      },
      {
        title: "Settings",
        url: "/user/settings",
        component: Settings
      },
    ],
  },
];
