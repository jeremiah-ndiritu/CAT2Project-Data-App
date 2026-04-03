import { useState } from "react";
import toast from "react-hot-toast";
import { useModal } from "../../hooks/useModal";
import { useSession } from "../../hooks/useSession";
import type { Bundle } from "../../types/bundles";
import { useIndexedDB } from "../../hooks/useIndexDB";
import type { Transaction } from "../../types/transaction";

const BuyBundleModal = ({ bundle }: { bundle: Bundle }) => {
  const { hideModal } = useModal();
  const { user } = useSession();
  const {add} = useIndexedDB()

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPurchase = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a phone number");
      return;
    }

    if (!user?.id) {
      toast.error("Please log in to make a purchase");
      return;
    }

    setIsProcessing(true);

    try {
      // Create a transaction record
      const transaction: Transaction = {
        id: `tx_${Date.now()}`,
        userId: user.id,
        bundleId: bundle.id,
        phoneNumber: phoneNumber.trim(),
        price: bundle.price,
        date: new Date().toLocaleDateString(),

        status: "success" as const,
        timestamp: new Date().toISOString(),
        description: `${bundle.name} - ${bundle.dataMB}MB`,
      };

      await add('transactions', transaction)

      

      toast.success(`✅ ${bundle.name} purchased successfully!`);

      // Reset and close
      setPhoneNumber("");
      hideModal();
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Failed to complete purchase. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const dataInGb = (bundle.dataMB / 1000).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-4 py-3 text-white flex justify-between items-center">
          <h2 className="text-lg font-semibold">Confirm Purchase</h2>
          <button onClick={hideModal} className="text-xl">
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Bundle Summary */}
          <div className="p-4 border-b">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs text-gray-500">Bundle</div>
              <div className="font-medium text-base">{bundle.name}</div>

              <div className="mt-2 text-2xl font-bold text-green-600">
                KES {bundle.price.toLocaleString()}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Data</span>
                  <div>{dataInGb} GB</div>
                </div>
                <div>
                  <span className="text-gray-500">Validity</span>
                  <div>{bundle.validityDays} days</div>
                </div>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4">
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="0712345678"
              maxLength={10}
              className="w-full mt-2 px-3 py-2 border rounded-xl focus:outline-none focus:border-primary text-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 flex gap-2 border-t">
          <button
            onClick={hideModal}
            className="flex-1 py-2 border rounded-xl text-sm"
            disabled={isProcessing}
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmPurchase}
            disabled={isProcessing || !phoneNumber.trim()}
            className="flex-1 py-2 bg-primary text-white rounded-xl text-sm"
          >
            {isProcessing ? "..." : `Pay KES ${bundle.price}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyBundleModal;
