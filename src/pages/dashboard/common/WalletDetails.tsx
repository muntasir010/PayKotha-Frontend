import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";
import { useGetWalletQuery } from "@/redux/features/wallet/wallet.api";

const WalletDetails = () => {
  const { data, error, isLoading } = useGetWalletQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading wallet...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load wallet details.
      </div>
    );
  }

  const wallet = data?.data?.wallet;

  return (
    <div className="max-w-md mx-auto shadow-md rounded-2xl p-6 mt-10">
      <div className="flex justify-center text-2xl mb-4 font-bold items-center">
              <DecryptedText
              className="text-2xl mx-auto mb-4 text-center font-bold"
                text="Wallet Details"
                animateOn="view"
                speed={150}
                revealDirection="center"
              />
            </div>

      {wallet ? (
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Wallet ID:</span>
            <span>{wallet.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Balance:</span>
            <span className=" font-semibold">
              ৳ {wallet.balance}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span
              className={`${
                wallet.isBlocked ? "text-red-600" : "text-green-600"
              } font-semibold`}
            >
              {wallet.isBlocked ? "Blocked" : "Active"}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-center">No wallet found</p>
      )}

      
      <div className="mt-6 flex gap-4 justify-between">
        <Button className="px-4 btn py-2 rounded-lg shadow">
          Add Money
        </Button>
        <Button variant={'secondary'} className="px-4 py-2 rounded-lg shadow">
          Withdraw
        </Button>
        <Button variant={'outline'} className="px-4 py-2 rounded-lg shadow">
          Send Money
        </Button>
      </div>
    </div>
  );
};

export default WalletDetails;