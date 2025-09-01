// CartContext.jsx
import {
  createContext,
  removefevItem,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const FevContext = createContext(null);

export function FevProvider({ children }) {
  const [Fevitems, setFevitems] = useState(() => {
    const saved = localStorage.getItem("favorites"); 
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Fevitems)); 
  }, [Fevitems]);

  const addfevItem = (product) => {
    setFevitems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removefevItem = (id) =>
    setFevitems((prev) => prev.filter((p) => p.id !== id));

  const clearCart = () => setFevitems([]);

  const value = useMemo(
    () => ({ Fevitems, addfevItem, removefevItem, clearCart }),
    [Fevitems]
  );

  return <FevContext.Provider value={value}>{children}</FevContext.Provider>;
}

export const useFev = () => useContext(FevContext);
