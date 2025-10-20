"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart, updateCartItem } from "@/app/store/cartSlice";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const userId = useSelector((state) => state.auth?.user?.id) || null;
  const items = useSelector((state) => state.cart.items) || [];

  const [loading, setLoading] = useState(true);

  // Load cart when page mounts
  useEffect(() => {
    const loadCart = async () => {
      try {
        await dispatch(fetchCart(userId));
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [dispatch, userId]);

  const handleRemove = (id) => {
    dispatch(removeFromCart({ userId, productId: id }));
  };

  const handleQuantityChange = (id, qty) => {
    if (qty > 0) {
      dispatch(updateCartItem({ userId, productId: id, quantity: qty }));
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading your cart...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id || item.package_id} // Use id from DB
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.name || "Service"}</h2>
              <p className="text-gray-600">
                Qty:{" "}
                <input
                  type="number"
                  min="1"
                  value={item.quantity || 1}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.id || item.package_id,
                      parseInt(e.target.value)
                    )
                  }
                  className="w-16 px-2 py-1 border rounded ml-2"
                />
              </p>
            </div>

            <button
              onClick={() =>
                handleRemove(item.id || item.package_id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => router.push("/packages")}
          className="bg-gray-200 px-6 py-3 rounded hover:bg-gray-300"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => alert("Proceeding to checkout...")}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
