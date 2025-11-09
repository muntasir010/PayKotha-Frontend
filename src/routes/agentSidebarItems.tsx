import CashIn from "@/pages/dashboard/agent/CashIn";
import CashOut from "@/pages/dashboard/agent/CashOut";
import CommissionHistoryTable from "@/pages/dashboard/agent/CommissionHistory";
import AddMoney from "@/pages/dashboard/common/AddMoney";
import ProfileUpdate from "@/pages/dashboard/common/UpdateProfile";
import SendMoney from "@/pages/dashboard/common/SendMoney";
import TransactionHistory from "@/pages/dashboard/common/TransactionHistory";
import WalletDetails from "@/pages/dashboard/common/WalletDetails";
import WithdrawMoney from "@/pages/dashboard/common/WithdrawMoney";
import UserDashboard from "@/pages/dashboard/UserDashboard";
import Settings from "@/pages/Settings";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Home",
        url: "/agent",
        component: UserDashboard
      },
      {
        title: "Profile",
        url: "/agent/profile",
        component: ProfileUpdate,
      },
      {
        title: "Wallet Details",
        url: "/agent/wallet-details",
        component: WalletDetails
      },
      {
        title: "Add Money",
        url: "/agent/add-money",
        component: AddMoney
      },
      {
        title: "Withdraw Money",
        url: "/agent/withdraw-money",
        component: WithdrawMoney
      },
      {
        title: "Send Money",
        url: "/agent/send-money",
        component: SendMoney
      },
      {
        title: "Transaction History",
        url: "/agent/transaction-history",
        component: TransactionHistory
      },
      {
        title: "Settings",
        url: "/agent/settings",
        component: Settings
      }
    ],
  },
  {
    title: "Agent Only",
    items: [
      {
        title: "Cash In",
        url: "/agent/cash-in",
        component: CashIn
      },
      {
        title: "Cash Out",
        url: "/agent/cash-out",
        component: CashOut
      },
      {
        title: "Commission History",
        url: "/agent/commission-history",
        component: CommissionHistoryTable
      }
    ]
  }
];