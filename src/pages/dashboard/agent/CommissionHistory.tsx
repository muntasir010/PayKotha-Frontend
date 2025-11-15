/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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

const CommissionHistoryTable = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetTransactionHistoryQuery({
    page,
    limit,
  });
  const location = useLocation();

  const transactions = (data?.data?.transactions || []).filter(
    (tx: any) => tx.commission > 0
  );
  const pagination = data?.data?.pagination;
  const totalCommission = transactions.reduce(
    (sum: number, tx: any) => sum + tx.commission,
    0
  );

  // Skeleton rows
  const skeletonRows = Array.from({ length: limit }).map((_, i) => (
    <TableRow key={i} className="animate-pulse">
      {Array.from({ length: 7 }).map((__, j) => (
        <TableCell key={j}>
          <div className="h-6 bg-gray-500/30 rounded w-full"></div>
        </TableCell>
      ))}
    </TableRow>
  ));

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load commission history
      </p>
    );

  return (
    <div
      className={`${
        location.pathname === "/user" ? "mx-auto" : "max-w-5xl mx-auto mt-10"
      } w-full overflow-x-auto md:overflow-visible`}
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

      <Table>
        <TableCaption>A list of your earned commissions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Commission</TableHead>
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
                  <TableCell className="text-right font-medium text-blue-600">
                    {tx.commission.toLocaleString()} ৳
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
              <TableCell colSpan={5}>Total Commission</TableCell>
              <TableCell className="text-right font-bold text-blue-600">
                {totalCommission.toLocaleString()} ৳
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        )}
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

export default CommissionHistoryTable;