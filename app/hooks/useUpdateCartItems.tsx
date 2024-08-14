import { database, ID, Query } from "@/libs/AppWriteClient";

interface CartItem {
  product: string;
  user: string;
  name: string;
  price: number;
  image: string;
  audio: string;
  quantity: number;
  documentId: string;
}

const useUpdateCartItems = async (cart_items: string[], newCartItem: CartItem): Promise<void> => {
  try {
    // Логируем входные параметры
    console.log("Входные параметры cart_items:", cart_items);
    console.log("Новый элемент корзины:", newCartItem);

    // Получаем существующую сессию корзины из базы данных
    const response = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_DATABASE_ID), 
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_CARTSESSION), 
      [ 
          Query.equal('cart_items', cart_items) 
      ]
    );

    // Логируем ответ от базы данных
    console.log("Ответ от базы данных:", response);

    // Проверяем, есть ли в ответе какие-либо документы
    if (response.documents.length > 0) {
      const cartSessionId = response.documents[0].$id;

      // Логируем текущие элементы корзины перед обновлением
      console.log("Текущие элементы корзины:", response.documents[0].cart_items);

      // Обновляем существующую сессию корзины новым элементом
      await database.updateDocument(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_CARTSESSION),
        cartSessionId,
        {
          cart_items: [...response.documents[0].cart_items, newCartItem],
        }
      );

      // Логируем обновленные элементы корзины после добавления нового элемента
      console.log("Обновленные элементы корзины:", [...response.documents[0].cart_items, newCartItem]);
      console.log("Корзина успешно обновлена");
    } else {
      console.error("Нет документов в ответе");
      // Обрабатываем случай, когда не найдены документы
      throw new Error("Не удалось найти документы для обновления");
    }
  } catch (error) {
    console.error("Ошибка при обновлении элементов корзины в базе данных:", error);
    throw error;
  }
};

export default useUpdateCartItems;
