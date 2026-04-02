export type Bundle = {
  id: string;
  name: string;
  dataAmount: string;
  validity: string;
  price: number;
};

export type User = {
  id: string;
  username: string;
  password: string;
  balance: number;
};

export type Transaction = {
  id: string;
  userId: string;
  bundleId: string;
  date: string;
  price: number;
};
