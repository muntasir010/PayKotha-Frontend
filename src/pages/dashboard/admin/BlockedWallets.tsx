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
import {
  useGetAllWalletsQuery,
  useBlockWalletMutation,
  useUnblockWalletMutation,
} from "@/redux/features/admin/adminApi";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";

const WalletsPage = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetAllWalletsQuery({ page, limit });
  const [blockWallet] = useBlockWalletMutation();
  const [unblockWallet] = useUnblockWalletMutation();

  const wallets = data?.data?.wallets || [];
  const pagination = data?.data?.pagination;

  // Skeleton rows
  const skeletonRows = Array.from({ length: limit }).map((_, i) => (
    <TableRow key={i} className="animate-pulse">
      {Array.from({ length: 6 }).map((__, j) => (
        <TableCell key={j}>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
        </TableCell>
      ))}
    </TableRow>
  ));

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">Failed to load wallets</p>
    );

  const handleToggleBlock = async (wallet: any) => {
    try {
      if (wallet.isBlocked) {
        console.log(wallet.isBlocked);
        await unblockWallet(wallet._id).unwrap();
      } else {
        await blockWallet(wallet._id).unwrap();
      }
    } catch (error) {
      console.error("Failed to update wallet status:", error);
    }
  };

  return (
    <div className="mx-auto mt-10">
      <div className="flex justify-center text-2xl mb-4 font-bold items-center">
              <DecryptedText
                className="text-2xl mx-auto mb-4 text-center font-bold"
                text="Block / Unblock Wallets"
                animateOn="view"
                speed={150}
                revealDirection="center"
              />
            </div>

      <Table>
        <TableCaption>A list of all wallets with action buttons</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Created At</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? skeletonRows
            : wallets.map((wallet: any) => (
                <TableRow key={wallet._id}>
                  <TableCell>
                    {wallet?.createdAt
                      ? new Date(wallet.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "-"}
                  </TableCell>

                  <TableCell>{wallet.userId?.name || "-"}</TableCell>
                  <TableCell>{wallet.userId?.email || "-"}</TableCell>
                  <TableCell>{wallet.userId?.phone || "-"}</TableCell>
                  <TableCell className="text-right font-medium">
                    {wallet.balance.toLocaleString()} ৳
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        wallet.isBlocked
                          ? "text-primary bg-red-900/60"
                          : "text-green-500 bg-green-600/30"
                      }`}
                    >
                      {wallet.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={wallet.isBlocked ? "secondary" : "destructive"}
                      onClick={() => handleToggleBlock(wallet)}
                    >
                      {wallet.isBlocked ? "Unblock" : "Block"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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

export default WalletsPage;