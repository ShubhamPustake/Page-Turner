import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Book } from "@prisma/client";

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (book: Book, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (book: Book, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.book.id === book.id);
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.book.id === book.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return { items: [...state.items, { book, quantity }] };
        });
      },
      
      removeItem: (bookId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.book.id !== bookId),
        }));
      },
      
      updateQuantity: (bookId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.book.id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.book.price * (1 - item.book.discount / 100);
          return total + price * item.quantity;
        }, 0);
      },
      
      getCartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "page-turner-cart",
    }
  )
);
