import { useState, useEffect } from "react";
import { database, Query } from "@/libs/AppWriteClient";
import { useUser } from "@/app/context/user";
import useGetPostsByUser from "./useGetPostsByUserId";
import useUpdateRoyaltyBalance from "./useUpdateRoyaltyBalance";

export const useGetRoyaltyBalance = () => {
  const [royaltyBalance, setRoyaltyBalance] = useState(0);
  const [soldTracks, setSoldTracks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const { updateRoyaltyBalance } = useUpdateRoyaltyBalance();

  useEffect(() => {
    const fetchRoyaltyBalance = async (userPosts: any[], cartItems: string[]) => {
      try {
        setLoading(true);
        setError(null);

        console.log("CartItems:", cartItems);
        console.log("PostIds:", userPosts.map((post: any) => post.id));

        let totalRoyalty = 0;
        userPosts.forEach((post: any) => {
          const countInCart = cartItems.filter(item => item === post.id).length;
          if (countInCart > 0) {
            totalRoyalty += countInCart;
            console.log(`Найдено ${countInCart} совпадений для поста с ID: ${post.id}`);
          }
        });

        {/*// Делим результат на 2 (поскольку почему cartItems отображются дважды в списке чтобы не искать сейчас эту причину я просто поделим на 2, а вообше нужно это пофиксить) 
        totalRoyalty /= 2; */}

        setRoyaltyBalance(totalRoyalty);
        console.log("Общий баланс роялти:", totalRoyalty);

        setSoldTracks(cartItems.length);
        console.log("Количество проданных треков:", cartItems.length);

        // Обновляем баланс роялти в базе данных
        await updateRoyaltyBalance(totalRoyalty);

      } catch (error) {
        console.error("Ошибка при получении баланса роялти:", error);
        setError("Произошла ошибка во время получения баланса роялти.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPostsAndRoyaltyBalance = async () => {
      try {
        if (user?.id) {
          const fetchedUserPosts = await useGetPostsByUser(user.id);
          setPosts(fetchedUserPosts);

          const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_CARTPAID),
            [Query.limit(100000000), Query.offset(0)]
          );
          const allDocuments = response.documents;

          const cartItems = allDocuments.reduce((accumulatedItems: string[], doc: any) => {
            try {
              const parsedItems = JSON.parse(doc.cart_items);
              if (Array.isArray(parsedItems.cart_items)) {
                return accumulatedItems.concat(parsedItems.cart_items.map((item: string) => item.trim()));
              } else if (Array.isArray(parsedItems)) {
                return accumulatedItems.concat(parsedItems.map((item: string) => item.trim()));
              } else {
                console.error("Неправильный формат cart_items:", parsedItems);
                return accumulatedItems;
              }
            } catch (error) {
              console.error("Ошибка при парсинге cart_items:", error);
              return accumulatedItems;
            }
          }, []);

          fetchRoyaltyBalance(fetchedUserPosts, cartItems);
        }
      } catch (error) {
        console.error("Ошибка при получении постов и баланса роялти:", error);
        setError("Произошла ошибка при получении постов и баланса роялти.");
        setLoading(false);
        } //закрывающая фигурная скобка добавлена
        
        };
        
        if (user?.id) {
        fetchPostsAndRoyaltyBalance();
        }
        
        }, [user]);
        
        return { royaltyBalance, soldTracks, loading, error };
        };
        
