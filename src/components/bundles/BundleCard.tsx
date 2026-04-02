// components/BundleCard.tsx
import React from "react";
import type { Bundle } from "../../types/bundles";
import { useModal } from "../../hooks/useModal";
import BuyBundleModal from "./BuyBundleModal";

interface BundleCardProps {
  bundle: Bundle;
}

const BundleCard: React.FC<BundleCardProps> = ({ bundle }) => {
  const dataInGb = (bundle.dataMB / 1000).toFixed(1);
  const { showModal } = useModal();
  const onBuy = async () => {
    showModal(<BuyBundleModal bundle={bundle} />);
  };
  return (
    <div className="bg-white rounded-2xl max-h-[80vh] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header with provider */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">{bundle.provider}</h3>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
            {bundle.category || "Data"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-semibold text-xl text-gray-800 mb-1">
          {bundle.name}
        </h4>

        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-4xl font-bold text-gray-900">{dataInGb}</span>
          <span className="text-2xl text-gray-500">GB</span>
        </div>

        <div className="space-y-3 text-sm text-gray-600 mb-8">
          <div className="flex justify-between">
            <span>Validity</span>
            <span className="font-medium text-gray-800">
              {bundle.validityDays} days
            </span>
          </div>
          <div className="flex justify-between">
            <span>Price</span>
            <span className="font-bold text-xl text-green-600">
              KES {bundle.price.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={onBuy}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          Buy Now
        </button>

        {bundle.description && (
          <p className="text-xs text-gray-500 text-center mt-4">
            {bundle.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default BundleCard;
