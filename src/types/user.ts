export interface UserBundle {
  id: string;
  bundleId: string;
  phoneNumber: string;
  purchasedAt: string;
  expiresAt: string;
  status: "active" | "expired";
}
