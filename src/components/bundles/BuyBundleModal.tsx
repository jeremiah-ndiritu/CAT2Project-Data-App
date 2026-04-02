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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-surface rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Confirm Bundle Purchase</h2>
            <button
              onClick={hideModal}
              className="text-3xl leading-none hover:text-white/70"
            >
              ×
            </button>
          </div>
        </div>

        {/* Bundle Summary */}
        <div className="p-6 border-b">
          <div className="bg-gray-50 rounded-2xl p-5">
            <div className="text-sm text-gray-500">Selected Bundle</div>
            <div className="font-semibold text-xl mt-1">{bundle.name}</div>

            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-4xl font-bold text-green-600">
                KES {bundle.price.toLocaleString()}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Data</span>
                <div className="font-medium">{dataInGb} GB</div>
              </div>
              <div>
                <span className="text-gray-500">Validity</span>
                <div className="font-medium">{bundle.validityDays} days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number to Receive Bundle
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="0712345678"
            maxLength={10}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-lg placeholder-gray-400"
          />
          <p className="text-xs text-gray-500 mt-2">
            Enter the Kenyan phone number that should receive the data bundle
          </p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={hideModal}
            className="flex-1 py-3.5 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
            disabled={isProcessing}
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmPurchase}
            disabled={isProcessing || !phoneNumber.trim()}
            className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-2xl transition-colors flex items-center justify-center"
          >
            {isProcessing ? "Processing..." : `Pay KES ${bundle.price}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyBundleModal;
