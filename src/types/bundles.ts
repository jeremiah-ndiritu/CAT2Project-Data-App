// src/types/bundle.ts
export type Provider = 'Safaricom' | 'Airtel' | 'Telkom' | 'Other';

export type BundleCategory = 'daily' | 'weekly' | 'monthly' | 'unlimited' | 'night';

export interface Bundle {
  id?: number;                    // Auto-incremented by  / IndexedDB
  provider: Provider;
  name: string;                   // e.g. "All Networks 2GB"
  description?: string;
  dataMB: number;                 // Always store in MB → easy sorting/filtering
  price: number;                  // in KES
  validityDays: number;
  category: BundleCategory;
  isActive: boolean;              // admin can disable a bundle
  createdAt?: string;             // ISO string
}

// src/types/purchase.ts
export interface Purchase {
  id?: number;
  bundleId: number;               // foreign key to Bundle.id
  purchasedAt: string;            // ISO string (new Date().toISOString())
  expiresAt: string;              // calculated at purchase time
  status: 'active' | 'expired' | 'cancelled';
}