// src/App.tsx
import { useState } from "react";
import BundleCard from "./components/bundles/BundleCard";
import type { Bundle } from "./types/bundles";
import Header from "./components/sections/Header";

const initialBundles: Bundle[] = [
  {
    id: 1,
    provider: "Safaricom",
    name: "All Networks 2GB",
    description: "2GB valid for all networks",
    dataMB: 2048,
    price: 150,
    validityDays: 30,
    category: "monthly",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    provider: "Safaricom",
    name: "Daily 500MB",
    description: "500MB for calls & SMS",
    dataMB: 500,
    price: 50,
    validityDays: 1,
    category: "daily",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    provider: "Airtel",
    name: "Weekly 1GB",
    description: "1GB valid for 7 days",
    dataMB: 1024,
    price: 99,
    validityDays: 7,
    category: "weekly",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    provider: "Telkom",
    name: "Night Owl 3GB",
    description: "Unlimited browsing from 12AM - 6AM",
    dataMB: 3072,
    price: 120,
    validityDays: 1,
    category: "night",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    provider: "Safaricom",
    name: "Monthly 5GB",
    description: "5GB for heavy users",
    dataMB: 5120,
    price: 499,
    validityDays: 30,
    category: "monthly",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    provider: "Airtel",
    name: "Daily Unlimited",
    description: "Unlimited data for 24 hours",
    dataMB: 10240,
    price: 199,
    validityDays: 1,
    category: "unlimited",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    provider: "Telkom",
    name: "Weekly 2GB",
    description: "2GB across all networks",
    dataMB: 2048,
    price: 150,
    validityDays: 7,
    category: "weekly",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    provider: "Safaricom",
    name: "Bazuu 1GB",
    description: "1GB social media bundle",
    dataMB: 1024,
    price: 75,
    validityDays: 7,
    category: "weekly",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 9,
    provider: "Other",
    name: "Monthly 10GB",
    description: "High speed 10GB package",
    dataMB: 10240,
    price: 899,
    validityDays: 30,
    category: "monthly",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 10,
    provider: "Airtel",
    name: "Daily 300MB",
    description: "300MB for light users",
    dataMB: 300,
    price: 30,
    validityDays: 1,
    category: "daily",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

function App() {
  const [bundles] = useState<Bundle[]>(initialBundles);
  const [selectedProvider, setSelectedProvider] = useState<string>("All");

  const providers = ["All", "Safaricom", "Airtel", "Telkom", "Other"];

  const filteredBundles =
    selectedProvider === "All"
      ? bundles
      : bundles.filter((b) => b.provider === selectedProvider);

  return (
    <div className="min-h-screen pt-14 bg-bg text-text">
      {/* Header */}
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Title & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-semibold text-text-heading tracking-tight mb-2">
              Available Data Bundles
            </h2>
            <p className="text-text text-lg">
              Browse and manage mobile data bundles
            </p>
          </div>

          {/* Provider Filter */}
          <div className="flex flex-wrap gap-2">
            {providers.map((provider) => (
              <button
                key={provider}
                onClick={() => setSelectedProvider(provider)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  selectedProvider === provider
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-surface hover:bg-surface border border-border hover:border-primary-light"
                }`}
              >
                {provider}
              </button>
            ))}
          </div>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>

        {filteredBundles.length === 0 && (
          <div className="text-center py-20 text-text">
            No bundles found for this provider.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border py-8 text-center text-sm text-text bg-surface">
        <p>BundleHub • Data Bundles Management App • Class Project</p>
      </footer>
    </div>
  );
}

export default App;
