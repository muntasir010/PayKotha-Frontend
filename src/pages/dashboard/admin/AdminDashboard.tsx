/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  useGetAllUsersQuery,
  useGetAllWalletsQuery,
  useGetAllTransactionsQuery,
} from "@/redux/features/admin/adminApi";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Loader2 } from "lucide-react";
import ViewUsers from "./ViewUsers";
import ViewWallets from "./ViewWallets";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";
import { role } from "@/constants/role";

const AdminDashboard = () => {
  const [page] = useState(1);
  const limit = 100;

  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({
    page,
    limit,
  });
  const { data: walletsData, isLoading: walletsLoading } =
    useGetAllWalletsQuery({ page, limit });
  const { data: txData, isLoading: txLoading } = useGetAllTransactionsQuery({
    page,
    limit,
  });

  const isLoading = usersLoading || walletsLoading || txLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const users = usersData?.data?.users || [];
  const wallets = walletsData?.data?.wallets || [];
  const transactions = txData?.data?.transactions || [];
  // const addMoney=
  const totalUsers = users.length + 1;
  const totalAgents = users.filter(
    (u: { role: string }) => u.role === role.AGENT
  ).length;
  const totalWallets = wallets.length + 1;
  const totalBlockedWallets = wallets.filter(
    (w: { isBlocked: any }) => w.isBlocked
  ).length;

  // Transactions for charts
  const txByType = transactions.reduce((acc: any, tx: any) => {
    acc[tx.type] = (acc[tx.type] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const txChartData = Object.keys(txByType).map((key) => ({
    type: key.replace("_", " ").toUpperCase(),
    amount: txByType[key],
  }));

  const pieColors = ["#10B981", "#FBBF24", "#EF4444", "#3B82F6"];

  // Line chart data by date
  const lineChartData = transactions.reduce((acc: any[], tx: any) => {
    const date = new Date(tx.createdAt).toLocaleDateString("en-US");
    let entry = acc.find((e) => e.date === date);
    if (!entry) {
      entry = { date, send_money: 0, add_money: 0, withdraw: 0 };
      acc.push(entry);
    }
    if (tx.type === "send_money") entry.send_money += tx.amount;
    if (tx.type === "add_money") entry.add_money += tx.amount;
    if (tx.type === "withdraw") entry.withdraw += tx.amount;
    return acc;
  }, []);

  return (
   <div className="p-0 grid grid-cols-1 gap-4 md:p-6 md:grid-cols-3 lg:grid-cols-6 md:gap-6">
  {/* Welcome */}
  <Card className="col-span-1 md:col-span-2 relative w-full h-32 md:h-48 overflow-hidden p-0">
    <div className="absolute inset-0 flex items-center justify-center text-center px-4">
      <DecryptedText
        className="mx-auto font-bold text-xl"
        text="Welcome to Pay_Kotha"
        animateOn="view"
        speed={150}
        revealDirection="center"
      />
    </div>
  </Card>

  {/* Stats Cards */}
  <Card className="col-span-1 md:col-span-2">
    <CardHeader>
      <CardTitle>Total Users</CardTitle>
    </CardHeader>
    <CardContent>
      <h2 className="text-3xl mb-2 text-primary font-bold">{totalUsers}</h2>
      <h2>Agents: {totalAgents}</h2>
      <h2>Users: {totalUsers - totalAgents}</h2>
    </CardContent>
  </Card>

  <Card className="col-span-1 md:col-span-2">
    <CardHeader>
      <CardTitle>Total Wallets</CardTitle>
    </CardHeader>
    <CardContent>
      <h2 className="text-3xl mb-2 text-primary font-bold">
        {totalWallets}
      </h2>
      <h2>Active: {totalWallets - totalBlockedWallets}</h2>
      <h2>Blocked: {totalBlockedWallets}</h2>
    </CardContent>
  </Card>

  {/* Key Metrics */}
  <Card className="col-span-1 md:col-span-3">
    <CardHeader>
      <CardTitle>Key Metrics</CardTitle>
      <CardDescription>Today's summary</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-1 gap-2">
      <div className="flex justify-between items-center rounded">
        <span>Total Transactions</span>
        <span className="font-bold text-primary">
          {transactions.length + 1}
        </span>
      </div>

      <div className="flex justify-between items-center rounded">
        <span>Total Add Money</span>
        <span className="font-bold text-primary">
          ৳{" "}
          {transactions
            .filter((t: { type: string; }) => t.type === "add_money")
            .reduce((a: any, b: { amount: any; }) => a + b.amount, 0)}
        </span>
      </div>

      <div className="flex justify-between items-center rounded">
        <span>Total Withdraw</span>
        <span className="font-bold text-primary">
          ৳{" "}
          {transactions
            .filter((t: { type: string; }) => t.type === "withdraw")
            .reduce((a: any, b: { amount: any; }) => a + b.amount, 0)}
        </span>
      </div>
    </CardContent>
  </Card>

  {/* Recent Activity */}
  <Card className="col-span-1 md:col-span-3 row-span-2">
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
      <CardDescription>Latest user and agent actions</CardDescription>
    </CardHeader>

    <CardContent className="overflow-y-auto space-y-2">
      {[
        { time: "12:32 PM", text: "User Bob added ৳500" },
        { time: "11:10 AM", text: "Agent Alice approved" },
        { time: "10:05 AM", text: "Wallet for Charlie blocked" },
        ...transactions
          .slice(-12)
          .reverse()
          .map((tx: { createdAt: string | number | Date; userId: { name: any; }; type: string; amount: any; }) => ({
            time: new Date(tx.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            text: `${tx.userId?.name || "User"} ${tx.type.replace(
              "_",
              " "
            )} ৳${tx.amount}`,
          })),
      ].map((item, index) => (
        <div
          key={index}
          className="rounded hover:text-primary flex justify-between"
        >
          <span className="text-muted-foreground">{item.time}</span>
          <span className="font-medium">{item.text}</span>
        </div>
      ))}
    </CardContent>
  </Card>

  {/* Transaction Breakdown Pie Chart */}
  <Card className="col-span-1 md:col-span-3">
    <CardHeader>
      <CardTitle>Transaction Breakdown</CardTitle>
      <CardDescription>Total transaction amounts by type</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={txChartData}
            dataKey="amount"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {txChartData.map((_entry, index) => (
              <Cell key={index} fill={pieColors[index % pieColors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>

  {/* Area Chart */}
  <Card className="col-span-1 md:col-span-6">
    <CardHeader>
      <CardTitle>Transaction Trend</CardTitle>
      <CardDescription>Daily transaction amounts by type</CardDescription>
    </CardHeader>

    <CardContent>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={lineChartData}
          margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="send_money"
            stackId="1"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="add_money"
            stackId="1"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="withdraw"
            stackId="1"
            stroke="#EF4444"
            fill="#EF4444"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>

  {/* Recent Users */}
  <Card className="col-span-1 md:col-span-6">
    <CardHeader>
      <CardTitle>Recent Users</CardTitle>
    </CardHeader>
    <CardContent className="overflow-x-auto">
      <ViewUsers />
    </CardContent>
  </Card>

  {/* Recent Wallets */}
  <Card className="col-span-1 md:col-span-6">
    <CardHeader>
      <CardTitle>Recent Wallets</CardTitle>
    </CardHeader>
    <CardContent className="overflow-x-auto">
      <ViewWallets />
    </CardContent>
  </Card>
</div>

  );
};

export default AdminDashboard;
