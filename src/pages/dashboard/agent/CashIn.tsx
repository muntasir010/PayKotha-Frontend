/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";
import { useCashInMutation } from "@/redux/features/wallet/wallet.api";

const CashIn = () => {
  const [amount, setAmount] = useState<number>(0);
  const [recipientName, setRecipientName] = useState<string>("");
  const [recipientId, setRecipientId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchError, setSearchError] = useState<string>("");

  const [cashIn, { isLoading, isError, isSuccess }] = useCashInMutation();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!recipientName.trim()) {
        setSuggestions([]);
        setRecipientId("");
        return;
      }

      try {
        const res = await axiosInstance.get(
          `/users/search?name=${recipientName}`
        );
        const users = res.data?.data?.users || [];
        setSuggestions(users);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [recipientName]);

  const handleSelectRecipient = (id: string, name: string) => {
    setRecipientId(id); // IMPORTANT: user.id
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
      await cashIn({ userId: recipientId, amount, description }).unwrap();
      setAmount(0);
      setRecipientName("");
      setRecipientId("");
      setDescription("");
      setSuggestions([]);
    } catch (err) {
      console.error("Cash In failed:", err);
    }
  };

  return (
    <div className="mx-auto shadow-md rounded-2xl p-6 mt-10 max-w-md">
      <div className="flex justify-center text-2xl mb-4 font-bold items-center">
        <DecryptedText
          text="Cash In"
          animateOn="view"
          speed={150}
          revealDirection="center"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative grid w-full max-w-sm items-center gap-3">
          <Label>Recipient Name</Label>
          <Input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Type recipient name"
            required
          />

          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 z-10 mt-1 w-full max-h-48 overflow-auto rounded-md border bg-white shadow-md">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  className="cursor-pointer px-2 py-1.5 text-sm hover:bg-gray-200"
                  onClick={() => handleSelectRecipient(user.id, user.name)}
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

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            required
            min={1}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
          />
        </div>

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Cash In"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        {isSuccess && (
          <p className="text-green-600 font-medium">Cash In successful!</p>
        )}
        {isError && (
          <p className="text-red-600 font-medium">Failed To Cash In</p>
        )}
      </div>
    </div>
  );
};

export default CashIn;

