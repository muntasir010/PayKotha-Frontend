 
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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

  const { data: walletData, isLoading } = useGetWalletQuery(undefined);
  const { data: userData, isLoading: userLoading } = useUserInfoQuery(undefined);

  const { data: txData } = useGetTransactionHistoryQuery({
    page: 1,
    limit: 20,
  });

  if (isLoading || userLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const transactions = txData?.data?.transactions || [];

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

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const radarData = months.map((month) => {
    const monthlyTxs = transactions.filter(
      (tx: { createdAt: string | number | Date }) =>
        new Date(tx.createdAt).toLocaleString("en-US", { month: "short" }) === month
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

      {/* --- Row 1 on Tablet: 3 items --- */}
      <Card className="md:col-span-1 lg:col-span-2">
        <CardContent>
          <h3 className="text-lg font-semibold">
            Welcome Back {userData?.data?.user?.name}
          </h3>
        </CardContent>
      </Card>

      <Card className="md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Wallet Status</CardTitle>
        </CardHeader>
        <CardContent>
          <h3
            className={`text-lg flex justify-center font-semibold px-2 py-1 rounded-md w-fit ${
              walletData?.data?.wallet?.isBlocked
                ? "text-primary bg-red-900/60"
                : "text-green-600 bg-green-600/30"
            }`}
          >
            {walletData?.data?.wallet?.isBlocked ? "Blocked" : "Active"}
          </h3>
        </CardContent>
      </Card>

      <Card className="md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">৳ {walletData?.data?.balance}</p>
        </CardContent>
      </Card>

      {/* --- Row 2: 2 items on tablet --- */}
      <Card className="md:col-span-1 lg:col-span-3">
        <CardHeader>
          <CardTitle>Wallet ID</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">{walletData?.data?.wallet?.id}</p>
          <p className="text-sm text-muted-foreground">
            Email: {userData?.data?.user?.email}
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-1 lg:col-span-3">
        <CardHeader>
          <CardTitle>Wallet Owner</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold">
            {userData?.data?.user?.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {userData?.data?.user?.phone}
          </p>
        </CardContent>
      </Card>

      {/* --- Row 3: Transaction Table Full Width on Tablet --- */}
      <Card className="md:col-span-2 lg:col-span-9">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionHistoryTable />
        </CardContent>
      </Card>

      {/* --- Row 4: Charts 2 columns on tablet --- */}
      <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-4">

        <Card>
          <CardHeader>
            <CardTitle>Transaction Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} cursor={false} />

                <Area
                  type="monotone"
                  dataKey="send_money"
                  stroke="var(--color-send_money)"
                  fill="var(--color-send_money)"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="add_money"
                  stroke="var(--color-add_money)"
                  fill="var(--color-add_money)"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="withdraw"
                  stroke="var(--color-withdraw)"
                  fill="var(--color-withdraw)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="items-center pb-4">
            <CardTitle>Radar Chart - Grid</CardTitle>
            <CardDescription>Showing transaction trends</CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RadarChart data={radarData}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <PolarGrid className="opacity-20" />
                <PolarAngleAxis dataKey="month" />
                <Radar dataKey="send_money" fill="var(--color-send_money)" fillOpacity={0.5} />
                <Radar dataKey="add_money" fill="var(--color-add_money)" fillOpacity={0.5} />
                <Radar dataKey="withdraw" fill="var(--color-withdraw)" fillOpacity={0.5} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};


export default UserDashboard;