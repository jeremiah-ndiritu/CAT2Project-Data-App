import type { Bundle } from "../../types";
import db from "../../services/db";
import toast from "react-hot-toast";
import { useModal } from "../../hooks/useModal";
import { useSession } from "../../hooks/useSession";


export const BuyBundleModal = ({ bundle }: { bundle: Bundle }) => {
  const { hideModal } = useModal();
  const { user, setUser } = useSession();

  const handleBuy = async () => {
    if (!user) return toast.error("Please log in first");

    if (user.balance < bundle.price) {
      toast.error("Insufficient balance");
      return;
    }

    const updatedUser = { ...user, balance: user.balance - bundle.price };
    await (await db).put("users", updatedUser);
    setUser(updatedUser);

    await (
      await db
    ).add("transactions", {
      id: crypto.randomUUID(),
      userId: user.id,
      bundleId: bundle.id,
      date: new Date().toISOString(),
      price: bundle.price,
    });

    toast.success("Bundle purchased!");
    hideModal();
  };

  return (
    <div>
      <h2 className="text-xl font-bold">{bundle.name}</h2>
      <p>
        {bundle.dataAmount} • {bundle.validity}
      </p>
      <p className="mt-2">Price: {bundle.price}</p>
      <div className="mt-4 flex gap-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleBuy}
        >
          Confirm
        </button>
        <button className="px-4 py-2 rounded border" onClick={hideModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};
