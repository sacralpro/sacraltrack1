// app/stores/useCartStore.ts
import { create } from 'zustand';

interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  userId: string | null;
  cartItems: CartItem[];
  setUserId: (userId: string | null) => void;
  setCartItems: (cartItems: CartItem[]) => void;
}

const useCartStore = create<CartState>((set) => ({
  userId: null,
  cartItems: [],
  setUserId: (userId) => {
    console.log('Setting userId:', userId);
    set({ userId });
    console.log('Stored userId:', useCartStore.getState().userId); // Добавлено логирование
  },
  setCartItems: (cartItems) => {
    console.log('Setting cartItems:', cartItems);
    set({ cartItems });
    console.log('Stored cartItems:', useCartStore.getState().cartItems); // Добавлено логирование
  },
}));

export default useCartStore;
