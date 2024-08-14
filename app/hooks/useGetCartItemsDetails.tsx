import { useCallback, useEffect, useState } from 'react';
import useGetPostById from './useGetPostById';
import useCartStoreDetails from '@/app/stores/cartStoreDetails';



const useGetCartItemsDetails = () => {
  const { cartItemsDetails, setCartItemsDetails } = useCartStoreDetails((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const getCartItemsDetails = useCallback(async () => {
    if (!Array.isArray(cartItemsDetails) || cartItemsDetails.length === 0) {
      console.log('Нет элементов корзины для получения деталей.');
      return;
    }

    setIsLoading(true);

    try {
const promises = cartItemsDetails.map((itemId) => useGetPostById(itemId.toString()));
      const detailedCartItems = await Promise.all(promises);

      // Фильтруем массив, чтобы убрать null-значения
      const filteredCartItemDetails = detailedCartItems.filter((item) => item);

      // Создаем новый объект, где ключами являются ID элементов, а значениями - сами элементы
      const updatedCartItemDetails = Object.fromEntries(
        cartItemsDetails.map((item, index) => [item, filteredCartItemDetails[index]])
      );

      console.log('Обновленные детали элементов корзины:', updatedCartItemDetails);
      setCartItemsDetails(updatedCartItemDetails);
    } catch (error) {
      console.error('Ошибка при получении деталей элементов корзины:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cartItemsDetails, setCartItemsDetails]);

  useEffect(() => {
    getCartItemsDetails();
  }, [getCartItemsDetails]);

  return { isLoading };
};

export default useGetCartItemsDetails;
