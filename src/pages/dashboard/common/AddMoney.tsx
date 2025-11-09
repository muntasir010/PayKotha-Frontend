import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useState } from "react";

const AddMoney = () => {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const [addMoney, { isLoading, isError, isSuccess }] =
    useAddMoneyMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addMoney({ amount, description }).unwrap();
      setAmount(0);
      setDescription("");
    } catch (err) {
      console.error("Add money failed:", err);
    }
  };

  return (
    <div className="mx-auto shadow-md rounded-2xl p-6 mt-10">
      <div className="flex justify-center text-2xl mb-4 font-bold items-center">
        <DecryptedText
          className="text-2xl mx-auto mb-4 text-center font-bold"
          text="Add Money"
          animateOn="view"
          speed={150}
          revealDirection="center"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="Amount">Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Description */}
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="Description">Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
          />
        </div>

        {/* Submit */}
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Add Money"}
        </Button>
      </form>

      {/* Feedback Messages */}
      <div className="mt-4 text-center">

        {isSuccess && (
          <p className="text-green-600 font-medium">
            ✅ Money added successfully!
          </p>
        )}

        {isError && (
          <p className="text-red-600 font-medium">
             "❌ Failed to add money. Try again!"
          </p>
        )}
      </div>
    </div>
  );
};

export default AddMoney;
