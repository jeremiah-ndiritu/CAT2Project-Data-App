export type User = {
  id: string;
  username: string;
  password: string;
  balance: number;
};

export type Transaction = {
  id: string;
  userId: string;
  bundleId: number | undefined ;
  date: string;
  price: number;
};
