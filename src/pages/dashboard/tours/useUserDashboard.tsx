import {driver} from "driver.js"
import "driver.js/dist/driver.css";

export const startDashboardTour = (force = false) => {
  const tourSeen = localStorage.getItem("dashboardTourSeen");
  if (tourSeen && !force) return;
  const driverObj = driver({
    showProgress: true,
    showButtons: ["next", "previous"],
    animate: true,

    steps: [
      {
        element: ".nav-menu",
        popover: {
          title: "Navigation Menu",
          description:
            "Use this menu to switch between dashboard sections and access settings easily.",
          side: "right",
          align: "start",
        },
      },
      {
        element: ".wallet-status-card",
        popover: {
          title: "Wallet Status",
          description:
            "Shows whether your wallet is active or blocked, giving you an instant status overview.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: ".wallet-balance-card",
        popover: {
          title: "Wallet Balance",
          description:
            "Quick glance at your current wallet balance, updated in real time.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: ".wallet-id-card",
        popover: {
          title: "Wallet ID",
          description:
            "Your unique wallet identifier along with your registered email for easy reference.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: ".wallet-owner-card",
        popover: {
          title: "Wallet Owner Info",
          description:
            "Displays your name and contact information linked to the wallet.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: ".transaction-chart-card",
        popover: {
          title: "Transaction Chart",
          description:
            "Visualize transaction trends over time for better insight into your wallet activity.",
          side: "left",
          align: "start",
        },
      },
      {
        element: ".transaction-table",
        popover: {
          title: "Transactions Table",
          description:
            "Easily find, search, and filter all your transactions in one place.",
          side: "top",
          align: "start",
        },
      },
      {
        element: ".theme-toggle-btn",
        popover: {
          title: "Tour Done!",
          description: "Have fun!!",
          side: "left",
          align: "start",
        },
      },
    ],
  });

  driverObj.drive();
  localStorage.setItem("dashboardTourSeen", "true");
};