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
import { useGetAllWalletsQuery } from "@/redux/features/admin/adminApi";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";

// const ViewWallets = () => {
//   const [page, setPage] = useState<number>(1);
//   const limit = 10;

//   const { data, isLoading, isError } = useGetAllWalletsQuery({ page, limit });

//   const wallets = data?.data?.wallets || [];
//   const pagination = data?.data?.pagination;

//   // Skeleton rows
//   const skeletonRows = Array.from({ length: limit }).map((_, i) => (
//     <TableRow key={i} className="animate-pulse">
//       {Array.from({ length: 5 }).map((__, j) => (
//         <TableCell key={j}>
//           <div className="h-6 bg-gray-500 rounded w-full"></div>
//         </TableCell>
//       ))}
//     </TableRow>
//   ));

//   if (isError)
//     return <p className="text-center mt-10 text-red-600">Failed to load wallets</p>;

//   return (
//     <div className={`${
//         location.pathname === "/admin" ? "mx-auto" : "mx-auto mt-10"
//       }`}>
      
//       {location.pathname !== "/admin" && (
//         <div className="flex justify-center text-2xl mb-4 font-bold items-center">
//                 <DecryptedText
//                   className="text-2xl mx-auto mb-4 text-center font-bold"
//                   text="All Wallets"
//                   animateOn="view"
//                   speed={150}
//                   revealDirection="center"
//                 />
//               </div>
//       )}

//       <Table>
//         <TableCaption>A list of all wallets</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>User Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Balance</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Created At</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {isLoading
//             ? skeletonRows
//             : wallets.map((wallet: any) => {
//                 const user = wallet.userId;
//                 const statusText = wallet.isBlocked ? "Blocked" : "Active";
//                 const statusColor = wallet.isBlocked
//                   ? "text-primary bg-red-900/60"
//                   : "text-green-500 bg-green-600/30";

//                 return (
//                   <TableRow key={wallet._id}>
//                     <TableCell>{user?.name || "-"}</TableCell>
//                     <TableCell>{user?.email || "-"}</TableCell>
//                     <TableCell className="capitalize">{user?.role || "-"}</TableCell>
//                     <TableCell className="font-medium text-right">
//                       {wallet.balance.toLocaleString()} ৳
//                     </TableCell>
//                     <TableCell>
//                       <span
//                         className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColor}`}
//                       >
//                         {statusText}
//                       </span>
//                     </TableCell>
//                     <TableCell>{new Date(wallet.createdAt).toLocaleString()}</TableCell>
//                   </TableRow>
//                 );
//               })}
//         </TableBody>
//       </Table>

//       {/* Pagination */}
//       {pagination && !isLoading && (
//         <div className="flex justify-center items-center gap-2 mt-6">
//           <Button
//             variant="outline"
//             disabled={page === 1}
//             onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//           >
//             Previous
//           </Button>
//           <span className="px-2">
//             {page} / {pagination.pages}
//           </span>
//           <Button
//             variant="outline"
//             disabled={page === pagination.pages}
//             onClick={() => setPage((prev) => Math.min(prev + 1, pagination.pages))}
//           >
//             Next
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };
const ViewWallets = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetAllWalletsQuery({ page, limit });

  const wallets = data?.data?.wallets || [];
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
    return <p className="text-center mt-10 text-red-600">Failed to load wallets</p>;

  return (
    <div
      className={`${
        location.pathname === "/admin" ? "mx-auto" : "mx-auto mt-10"
      } w-full`}
    >
      {/* Heading */}
      {location.pathname !== "/admin" && (
        <div className="flex justify-center text-2xl mb-4 font-bold items-center">
          <DecryptedText
            className="text-2xl mx-auto mb-4 text-center font-bold"
            text="All Wallets"
            animateOn="view"
            speed={150}
            revealDirection="center"
          />
        </div>
      )}

      
      <div className="overflow-x-auto rounded-lg border">
        <Table className="min-w-[800px] md:min-w-full">
          <TableCaption>A list of all wallets</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">User Name</TableHead>
              <TableHead className="whitespace-nowrap">Email</TableHead>
              <TableHead className="whitespace-nowrap">Role</TableHead>
              <TableHead className="whitespace-nowrap text-right">Balance</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="whitespace-nowrap">Created At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? skeletonRows
              : wallets.map((wallet: any) => {
                  const user = wallet.userId;
                  const statusText = wallet.isBlocked ? "Blocked" : "Active";
                  const statusColor = wallet.isBlocked
                    ? "text-primary bg-red-900/60"
                    : "text-green-500 bg-green-600/30";

                  return (
                    <TableRow key={wallet._id}>
                      <TableCell className="max-w-[120px] break-words">
                        {user?.name || "-"}
                      </TableCell>

                      <TableCell className="max-w-[150px] break-words">
                        {user?.email || "-"}
                      </TableCell>

                      <TableCell className="capitalize">{user?.role || "-"}</TableCell>

                      <TableCell className="font-medium text-right whitespace-nowrap">
                        {wallet.balance.toLocaleString()} ৳
                      </TableCell>

                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColor}`}
                        >
                          {statusText}
                        </span>
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        {new Date(wallet.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </div>

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
            onClick={() => setPage((prev) => Math.min(prev + 1, pagination.pages))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViewWallets;