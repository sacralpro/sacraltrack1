import { database, ID, Query } from "@/libs/AppWriteClient";
import { useCallback } from "react";
import useCartStoreDetails from "@/app/stores/cartStoreDetails";

interface CartItem {
  product: string;
  user: string;
  name: string;
  price: number;
  image: string;
  audio: string;
  quantity: number;
  documentId: string;
  audio_url: "", // Добавить соответствующее поле и заполнить его данными
    mp3_url: "",   // Добавить соответствующее поле и заполнить его данными
    image_url: "", // Добавить соответствующее поле и заполнить его данными
}

interface Cart {
  cartItems: CartItem[];
  cartSession: string;
  cart_total: string;
}

const useRestoreCartSession = () => {
  const { setCartItemIds, setCartItemsDetails } = useCartStoreDetails((state) => state);

  const restoreCartSession = useCallback(async (userId: string, setCart: (cart: Cart | null) => void) => {
    if (!userId) {
      console.error("Ошибка в useRestoreCartSession: userId не предоставлен или является пустой строкой");
      return;
    }
  
    try {
      console.log(`Попытка восстановить сессию корзины для пользователя с ID: ${userId}`);
  
      const response = await database.listDocuments(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_CARTSESSION),
        [Query.equal("user_id", userId)]
      );
  
      console.log("Ответ из базы данных:", response);
  
      if (response.documents.length > 0) {
        const latestCartSession = response.documents[0];
        const existingCartItems: CartItem[] = latestCartSession.cart_items;
        const cartItemIds = existingCartItems.map((item) => item.product);
        const cartItemDetails = existingCartItems;
  
        setCartItemIds(cartItemIds);
        setCartItemsDetails(cartItemDetails);
  
        setCart({
          cartItems: existingCartItems,
          cartSession: latestCartSession.$id,
          cart_total: latestCartSession.cart_total,
        });
  
        console.log("Сессия корзины восстановлена из базы данных:", latestCartSession);
        console.log("Восстановленные элементы корзины:", existingCartItems);
      } else {
        console.log(`Для пользователя с ID: ${userId} в базе данных не найдена сессия корзины.`);
        setCart(null);
        setCartItemIds([]);
        setCartItemsDetails([]);
      }
    } catch (error) {
      console.error("Ошибка в useRestoreCartSession:", error);
    }
  }, [setCartItemIds, setCartItemsDetails]);
  

  return { restoreCartSession };
};

export default useRestoreCartSession;
