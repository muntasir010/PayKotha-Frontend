/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCashOutMutation } from "@/redux/features/wallet/wallet.api";
import axiosInstance from "@/lib/axios";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";

const CashOut = () => {
  const [amount, setAmount] = useState<number>(0);
  const [recipientName, setRecipientName] = useState<string>("");
  const [recipientId, setRecipientId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchError, setSearchError] = useState<string>("");

  const [cashOut, { isLoading, isError, isSuccess }] = useCashOutMutation();

  // ✅ Search users by name (agent route)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!recipientName.trim()) {
        setSuggestions([]);
        setRecipientId("");
        return;
      }

      try {
        const res = await axiosInstance.get(
          `/users/search?name=${recipientName}`,
          { withCredentials: true }
        );
        const users = res.data?.data?.users || res.data?.data || [];
        setSuggestions(users);
      } catch (err) {
        console.error("Failed to fetch user suggestions:", err);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(debounce);
  }, [recipientName]);

  const handleSelectRecipient = (id: string, name: string) => {
    setRecipientId(id);
    setRecipientName(name);
    setSuggestions([]);
    setSearchError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!recipientId) {
      setSearchError("Please select a valid user from the list");
      return;
    } 
    try {
      await cashOut({ userId: recipientId, amount, description }).unwrap();
      setAmount(0);
      setRecipientName("");
      setRecipientId("");
      setDescription("");
      setSuggestions([]);
    } catch (err) {
      console.error("Cash out failed:", err);
    }
  };

  return (
    <div className="mx-auto shadow-md rounded-2xl p-6 mt-10 max-w-md">
      <div className="flex justify-center text-2xl mb-4 font-bold items-center">
        <DecryptedText
          text="Cash Out"
          animateOn="view"
          speed={150}
          revealDirection="center"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ Recipient Search */}
        <div className="relative grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="RecipientName">Recipient Name</Label>
          <Input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Type recipient name"
            required
          />

          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 z-10 mt-1 w-full max-h-48 overflow-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 slide-in-from-top-1">
              {suggestions.map((user) => (
                <li
                  key={user.id || user._id}
                  className="cursor-pointer px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                  onClick={() => handleSelectRecipient(user.id || user._id, user.name)}
                >
                  {user.name}
                </li>
              ))}
            </ul>
          )}

          {recipientName && !recipientId && suggestions.length === 0 && (
            <p className="text-gray-500 mt-1">No User Found</p>
          )}
          {searchError && <p className="text-red-600">{searchError}</p>}
        </div>

        {/* ✅ Amount */}
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="Amount">Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            required
            min={1}
          />
        </div>

        {/* ✅ Description */}
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="Description">Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
          />
        </div>

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Cash Out"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        {isSuccess && (
          <p className="text-green-600 font-medium">Cash Out successful!</p>
        )}
        {isError && (
          <p className="text-red-600 font-medium">Failed to Cash Out</p>
        )}
      </div>
    </div>
  );
};

export default CashOut;

