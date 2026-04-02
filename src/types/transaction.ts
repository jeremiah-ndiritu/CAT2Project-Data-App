import type { Provider } from "./bundles";

export type Transaction = {
  id: string;
  userId: string;
  bundleId: number | undefined;
  date: string;
  price: number;
  phoneNumber: string
  description: string;
  // Added props
  timestamp:string
  provider?: Provider;
  bundleName?: string;
  dataMB?: number;
  validityDays?: number;
  status?: "success" | "failed" | "pending";
  paymentMethod?: "M-Pesa" | "Card" | "Wallet";
  transactionRef?: string;
};
