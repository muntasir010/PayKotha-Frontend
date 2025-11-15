/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllTransactionsQuery } from "@/redux/features/admin/adminApi";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";

const ViewTransactions = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  // 🔍 Filters state
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, isError } = useGetAllTransactionsQuery({
    page,
    limit,
    search,
    type: type === "all" ? "" : type,
    status: status === "all" ? "" : status,
    minAmount,
    maxAmount,
    startDate,
    endDate,
  });


  const transactions = data?.data?.transactions || [];
  const pagination = data?.data?.pagination;

  // Skeleton rows
  const skeletonRows = Array.from({ length: limit }).map((_, i) => (
    <TableRow key={i} className="animate-pulse">
      {Array.from({ length: 7 }).map((__, j) => (
        <TableCell key={j}>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
        </TableCell>
      ))}
    </TableRow>
  ));

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load transactions
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 w-full overflow-x-auto md:overflow-visible">
      <div className="flex justify-center text-2xl mb-4 font-bold items-center">
              <DecryptedText
                className="text-2xl mx-auto mb-4 text-center font-bold"
                text="All Transactions"
                animateOn="view"
                speed={150}
                revealDirection="center"
              />
            </div>

      {/* 🔎 Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-3 mb-6">
        <Input
          placeholder="Search by user/email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select onValueChange={setType} value={type}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="cash_in">Cash In</SelectItem>
            <SelectItem value="cash_out">Cash Out</SelectItem>
            <SelectItem value="send_money">Send Money</SelectItem>
            <SelectItem value="deposit">Deposit</SelectItem>
            <SelectItem value="withdraw">Withdraw</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setStatus} value={status}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />

        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* Reset filters */}
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setType("");
            setStatus("");
            setMinAmount("");
            setMaxAmount("");
            setStartDate("");
            setEndDate("");
            setPage(1);
          }}
        >
          Reset
        </Button>
      </div>

      {/* Transactions Table */}
      <Table>
        <TableCaption>A list of all transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Initiated By</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? skeletonRows
            : transactions.map((tx: any) => {
                const statusColor =
                  tx.status === "completed"
                    ? "text-green-600"
                    : tx.status === "pending"
                    ? "text-yellow-400"
                    : "text-red-600";

                const amountColor = [
                  "cash_out",
                  "send_money",
                  "withdraw",
                ].includes(tx.type)
                  ? "text-red-600"
                  : "text-green-600";

                return (
                  <TableRow key={tx._id}>
                    <TableCell className="font-medium">
                      {tx.type.replace("_", " ").toUpperCase()}
                    </TableCell>

                    <TableCell className={statusColor}>{tx.status}</TableCell>

                    {/* ✅ initiatedBy is a user object */}
                    <TableCell>
                      {tx.initiatedBy?.name || tx.initiatedBy?.email || "-"}
                    </TableCell>

                    {/* ✅ fromWallet.userId is a user object */}
                    <TableCell>
                      {tx.fromWallet?.userId?.name ||
                        tx.fromWallet?.userId?.email ||
                        "-"}
                    </TableCell>

                    {/* ✅ toWallet.userId is a user object */}
                    <TableCell>
                      {tx.toWallet?.userId?.name ||
                        tx.toWallet?.userId?.email ||
                        "-"}
                    </TableCell>

                    <TableCell
                      className={`text-right font-medium ${amountColor}`}
                    >
                      {tx.amount.toLocaleString()} ৳
                    </TableCell>

                    <TableCell>
                      {new Date(tx.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination && !isLoading && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="px-2">
            {page} / {pagination.pages}
          </span>
          <Button
            variant="outline"
            disabled={page === pagination.pages}
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, pagination.pages))
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViewTransactions;