import { create } from 'zustand';

// Определение интерфейса для элементов корзины
interface CartItemDetails {
  product: string;
  user: string;
  name: string;
  price: number;
  image: string;
  audio: string;
  quantity: number;
  documentId: string;
  audio_url: string; // Добавление свойства audio_url в интерфейс
  mp3_url: string;
  image_url: string;

}

// Описание состояния для детали корзины
interface CartDetailsState {
  cartItemIds: string[];
  setCartItemIds: (ids: string[]) => void;
  cartItemsDetails: CartItemDetails[];
  setCartItemsDetails: (details: CartItemDetails[]) => void;
}

// Создание хранилища Zustand для деталей корзины
const useCartStoreDetails = create<CartDetailsState>((set) => ({
  cartItemIds: [],
  setCartItemIds: (ids) => {
    console.log('Setting cart item IDs:', ids);
    set({ cartItemIds: ids });
  },
  cartItemsDetails: [],
  setCartItemsDetails: (details) => {
    console.log('Setting cart item details:', details);
    set({ cartItemsDetails: details });
  },
}));

export default useCartStoreDetails;
