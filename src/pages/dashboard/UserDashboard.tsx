/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useGetWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import TransactionHistoryTable from "./common/TransactionHistory";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
} from "recharts";
import { useGetTransactionHistoryQuery } from "@/redux/features/transaction/transaction.api";
import { Loader2 } from "lucide-react";
import { startDashboardTour } from "./tours/useUserDashboard";
import { useEffect } from "react";

const chartConfig = {
  send_money: { label: "Send Money", color: "var(--chart-1)" },
  add_money: { label: "Add Money", color: "var(--chart-2)" },
  withdraw: { label: "Withdraw", color: "var(--chart-3)" },
} satisfies ChartConfig;

const UserDashboard = () => {
  useEffect(() => {
    startDashboardTour();
  }, []);

  const { data: walletData, isLoading: walletLoading } =
    useGetWalletQuery(undefined);
  const { data: userData, isLoading: userLoading } =
    useUserInfoQuery(undefined);
  const { data: txData } = useGetTransactionHistoryQuery({
    page: 1,
    limit: 20,
  });

  if (walletLoading || userLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // --- Safe Helper for Rendering ---
  const renderSafe = (value: any): string => {
    if (!value) return "N/A";
    if (typeof value === "object") {
      return value.name || value.id || value._id || "User Object";
    }
    return String(value);
  };

  const transactions = txData?.data?.transactions || [];

  // Area Chart Data Logic
  const chartData = transactions.reduce((acc: any[], tx: any) => {
    const date = new Date(tx.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    let entry = acc.find((item) => item.date === date);
    if (!entry) {
      entry = { date, send_money: 0, add_money: 0, withdraw: 0 };
      acc.push(entry);
    }
    if (tx.type === "send_money") entry.send_money += tx.amount;
    if (tx.type === "add_money") entry.add_money += tx.amount;
    if (tx.type === "withdraw") entry.withdraw += tx.amount;
    return acc;
  }, []);

  // Radar Chart Data Logic
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const radarData = months.map((month) => {
    const monthlyTxs = transactions.filter(
      (tx: any) =>
        new Date(tx.createdAt).toLocaleString("en-US", { month: "short" }) ===
        month,
    );
    const sum = (t: string) =>
      monthlyTxs
        .filter((tx: any) => tx.type === t)
        .reduce((s: any, tx: any) => s + tx.amount, 0);
    return {
      month,
      send_money: sum("send_money"),
      add_money: sum("add_money"),
      withdraw: sum("withdraw"),
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 p-0 md:p-6">
      {/* --- Row 1: Welcome, Status, Balance --- */}
      <Card className="md:col-span-1 lg:col-span-4">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold">
            Welcome Back, {renderSafe(userData?.data?.user?.name)}
          </h3>
          <p className="text-sm text-muted-foreground uppercase">
            Role: {renderSafe(userData?.data?.user?.role)}
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-1 lg:col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Wallet Status</CardTitle>
        </CardHeader>
        <CardContent>
          <h3
            className={`text-sm flex justify-center font-bold px-3 py-1 rounded-full w-fit ${
              walletData?.data?.wallet?.isBlocked
                ? "text-red-600 bg-red-100"
                : "text-green-600 bg-green-100"
            }`}
          >
            {walletData?.data?.wallet?.isBlocked ? "Blocked" : "Active"}
          </h3>
        </CardContent>
      </Card>

      <Card className="md:col-span-1 lg:col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-orange-600">
            ৳ {Number(walletData?.data?.balance || 0).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* --- Row 2: ID & Owner --- */}
      <Card className="md:col-span-1 lg:col-span-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Wallet Identity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-md font-mono font-bold">
            ID:{" "}
            {renderSafe(
              walletData?.data?.id
            )}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Email: {renderSafe(userData?.data?.user?.email)}
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-1 lg:col-span-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Owner Details</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-md font-semibold">
            {renderSafe(userData?.data?.user?.name)}
          </h3>
          <p className="text-xs text-muted-foreground">
            Phone: {renderSafe(userData?.data?.user?.phone)}
          </p>
        </CardContent>
      </Card>

      {/* --- Row 3: Table --- */}
      <Card className="md:col-span-2 lg:col-span-9">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionHistoryTable />
        </CardContent>
      </Card>

      {/* --- Row 4: Charts --- */}
      <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
                <CartesianGrid vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="date" hide />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" />}
                  cursor={false}
                />
                <Area
                  type="monotone"
                  dataKey="send_money"
                  stroke="var(--color-send_money)"
                  fill="var(--color-send_money)"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="add_money"
                  stroke="var(--color-add_money)"
                  fill="var(--color-add_money)"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent className="pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-45"
            >
              <RadarChart data={radarData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />

    
                <PolarGrid opacity={0.3} stroke="#9ca3af" />
                <PolarAngleAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "#4b5563" }}
                />

               
                <Radar
                  dataKey="send_money"
                  stroke="var(--color-send_money)"
                  fill="var(--color-send_money)"
                  fillOpacity={0.6}
                />
                <Radar
                  dataKey="add_money"
                  stroke="var(--color-add_money)"
                  fill="var(--color-add_money)"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
