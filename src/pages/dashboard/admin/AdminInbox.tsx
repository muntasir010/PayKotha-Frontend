/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail } from "lucide-react";
import { format } from "date-fns";
import { useGetAllMessagesQuery } from "@/redux/features/contact/contactApi";

const AdminInbox = () => {
  const { data, isLoading } = useGetAllMessagesQuery(undefined);
  const messages = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-6 w-6" /> Admin Inbox ({messages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Sender Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.length > 0 ? (
                  messages.map((msg: any) => (
                    <tr key={msg._id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {msg.firstName} {msg.lastName}
                      </td>
                      <td className="px-6 py-4">{msg.email}</td>
                      <td className="px-6 py-4 font-semibold">{msg.subject}</td>
                      <td className="px-6 py-4 max-w-xs truncate">{msg.message}</td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {format(new Date(msg.createdAt), "PPP p")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-10">
                      No messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInbox;