
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CardContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((p) => p.id !== id));
  const updateQty = (id, qty) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
    );
  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQty, clearCart, subtotal }),
    [items, subtotal]
  );

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

export const useCart = () => useContext(CardContext);
