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
  useApproveAgentMutation,
  useSuspendAgentMutation,
} from "@/redux/features/admin/adminApi";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";
import { role } from "@/constants/role";

const AgentsPage = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetAllUsersQuery({ page, limit });
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();

  // Filter only agents
  const agents = (data?.data?.users || []).filter((user: { role: string; }) => user.role === role.AGENT);
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
    return <p className="text-center mt-10 text-red-600">Failed to load agents</p>;

  const handleToggleApproval = async (agent: any) => {
    try {
      if (agent.isApproved) {
        await suspendAgent(agent._id).unwrap();
      } else {
        await approveAgent(agent._id).unwrap();
      }
    } catch (error) {
      console.error("Failed to update agent status:", error);
    }
  };

  return (
    <div className="mx-auto mt-10">
      <div className="flex justify-center text-2xl mb-4 font-bold items-center">
              <DecryptedText
                className="text-2xl mx-auto mb-4 text-center font-bold"
                text="Suspend / Approve Agents"
                animateOn="view"
                speed={150}
                revealDirection="center"
              />
            </div>

      <Table>
        <TableCaption>A list of all registered agents</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? skeletonRows
            : agents.map((agent: any) => (
                <TableRow key={agent._id}>
                  <TableCell>{agent.name || "-"}</TableCell>
                  <TableCell>{agent.email || "-"}</TableCell>
                  <TableCell>{agent.phone || "-"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        agent.isApproved
                          ? "text-green-500 bg-green-600/30"
                          : "text-primary bg-red-900/60"
                      }`}
                    >
                      {agent.isApproved ? "Approved" : "Suspended"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={agent.isApproved ? "destructive" : "secondary"}
                      onClick={() => handleToggleApproval(agent)}
                    >
                      {agent.isApproved ? "Suspend" : "Approve"}
                    </Button>
                  </TableCell>
                  <TableCell>{new Date(agent.createdAt).toLocaleString()}</TableCell>
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
          <span className="px-2">{page} / {pagination.pages}</span>
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

export default AgentsPage;