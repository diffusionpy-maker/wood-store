import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
};

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => set({ cart: [...get().cart, item] }),
      removeFromCart: (id) => set({
        cart: (() => {
          const cart = get().cart;
          const idx = cart.findIndex((item) => item.id === id);
          if (idx === -1) return cart;
          return [...cart.slice(0, idx), ...cart.slice(idx + 1)];
        })()
      }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-store", // localStorage key
    }
  )
);
