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
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "@/redux/features/admin/adminApi";
import { useLocation } from "react-router";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";
import { role } from "@/constants/role";

const ViewBlockedUsers = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const location = useLocation();

  const { data, isLoading, isError } = useGetAllUsersQuery({ page, limit });
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const users = (data?.data?.users || []).filter(
    (user: any) => user.role === role.USER
  );
  const pagination = data?.data?.pagination;

  // Skeleton rows
  const skeletonRows = Array.from({ length: limit }).map((_, i) => (
    <TableRow key={i} className="animate-pulse">
      {Array.from({ length: 5 }).map((__, j) => (
        <TableCell key={j}>
          <div className="h-6 bg-gray-500 rounded w-full"></div>
        </TableCell>
      ))}
    </TableRow>
  ));

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load users
      </p>
    );

  const handleToggleBlock = async (user: any) => {
    try {
      if (user.isActive === "ACTIVE") {
        await blockUser(user._id).unwrap();
      } else {
        await unblockUser(user._id).unwrap();
      }
    } catch (err) {
      console.error("Failed to toggle user block status:", err);
    }
  };

  return (
    <div
      className={`${
        location.pathname === "/admin" ? "mx-auto" : "mx-auto mt-10"
      } w-full overflow-x-auto md:overflow-visible`}
    >
      {location.pathname !== "/admin" && (
        <div className="flex justify-center text-2xl mb-4 font-bold items-center">
          <DecryptedText
            className="text-2xl mx-auto mb-4 text-center font-bold"
            text="Block / Unblock Users"
            animateOn="view"
            speed={150}
            revealDirection="center"
          />
        </div>
      )}

      <Table>
        <TableCaption>A list of all registered users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? skeletonRows
            : users.map((user: any) => {
                let statusColor = "";
                let statusText = "";

                if (user.isActive === "ACTIVE") {
                  statusText = "Active";
                  statusColor =
                    "text-green-500 bg-green-600/30";
                } else {
                  statusText = "Blocked";
                  statusColor =
                    "text-red-500 bg-red-600/30";
                }

                return (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">
                      {user.role}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColor}`}
                      >
                        {statusText}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={
                          user.isActive === "ACTIVE"
                            ? "destructive"
                            : "default"
                        }
                        onClick={() => handleToggleBlock(user)}
                      >
                        {user.isActive === "ACTIVE"
                          ? "Block"
                          : "Unblock"}
                      </Button>
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

export default ViewBlockedUsers;
