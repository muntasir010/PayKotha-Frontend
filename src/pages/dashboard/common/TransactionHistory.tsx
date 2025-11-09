/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGetTransactionHistoryQuery } from "@/redux/features/transaction/transaction.api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";

const TransactionHistoryTable = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const [typeFilter, setTypeFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { data, isLoading, isError, refetch } = useGetTransactionHistoryQuery({
    page,
    limit,
    type: typeFilter || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const location = useLocation();

  useEffect(() => {
    setPage(1);
  }, [typeFilter, startDate, endDate]);

  const transactions = data?.data?.transactions || [];
  const pagination = data?.data?.pagination;

  const totalAmount = transactions.reduce(
    (sum: number, tx: any) => sum + tx.amount,
    0
  );

  // Skeleton rows
  const skeletonRows = Array.from({ length: limit }).map((_, i) => (
    <TableRow key={i} className="animate-pulse">
      {Array.from({ length: 6 }).map((__, j) => (
        <TableCell key={j}>
          <div className="h-6 bg-gray-500 rounded w-full"></div>
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
    <div
      className={`${
        location.pathname === "/user" ? "mx-auto" : "max-w-5xl mx-auto mt-10"
      }`}
    >
      {location.pathname !== "/user" && (
        <div className="flex justify-center text-2xl mb-4 font-bold items-center">
          <DecryptedText
            className="text-2xl mx-auto mb-4 text-center font-bold"
            text="Transaction History"
            animateOn="view"
            speed={150}
            revealDirection="center"
          />
        </div>
      )}

      {/* Filter UI */}
      <div className="flex gap-2 mb-4 justify-center">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border bg-secondary px-2 py-1 rounded"
        >
          <option value="">All Types</option>
          <option value="add_money">Add Money</option>
          <option value="send_money">Send Money</option>
          <option value="withdraw">Withdraw</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <Button onClick={() => refetch()}>Apply</Button>
      </div>

      {/* Table */}
      <Table>
        <TableCaption>A list of your recent transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? skeletonRows
            : transactions.map((tx: any) => (
                <TableRow key={tx._id}>
                  <TableCell className="font-medium">
                    {tx.type.replace("_", " ").toUpperCase()}
                  </TableCell>
                  <TableCell>{tx.status}</TableCell>
                  <TableCell>{tx.fromWallet?.userId || "-"}</TableCell>
                  <TableCell>{tx.toWallet?.userId || "-"}</TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      tx.type === "send_money" || tx.type === "withdraw"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {tx.amount.toLocaleString()} ৳
                  </TableCell>
                  <TableCell>
                    {new Date(tx.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
        {!isLoading && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right font-bold">
                {totalAmount.toLocaleString()} ৳
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>

      {/* Pagination */}
      {pagination && (
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

export default TransactionHistoryTable;