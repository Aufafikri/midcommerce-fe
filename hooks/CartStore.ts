// stores/cartStore.ts
import {create} from "zustand";
import { ProductType } from "@/types/product";

interface CartItem extends ProductType {
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  addToCart: (product: ProductType) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cartItems.find((item) => item.id === product.id);

      if (existingProduct) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }),
  incrementQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decrementQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ cartItems: [] }),
}));
