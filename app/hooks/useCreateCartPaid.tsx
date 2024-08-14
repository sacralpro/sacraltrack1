import { useState, useCallback } from "react";
import { database, ID } from "@/libs/AppWriteClient"; // Импортируйте правильные типы из AppWriteClient
import useCartStore from "@/app/stores/useCartStore";

type CreateCartPaidHook = {
  isLoading: boolean;
  error: Error | null;
  createCartPaid: (userId: string, cartItems: any[]) => Promise<any | undefined>;

};
// app/hooks/useCreateCartPaid.ts
const useCreateCartPaid = (): CreateCartPaidHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createCartPaid = useCallback(
    async (userId: string, cartItems: any[]) => {
      try {
        setIsLoading(true);
        setError(null);

        const currentDate = new Date().toISOString();

        // Serialize the cartItems array to a JSON string
        const cart_itemsJson = JSON.stringify(cartItems.map((item) => item.product));

        // Create a document in the Appwrite database
        const document = await database.createDocument(
          String(process.env.NEXT_PUBLIC_DATABASE_ID),
          String(process.env.NEXT_PUBLIC_COLLECTION_ID_CARTPAID),
          ID.unique(),
          {
            user_id: userId,
            cart_items: cart_itemsJson,
            paid_at: currentDate,
          }
        );

        console.log("Successfully saved purchase information in AppWrite/CartPaid with document ID:", document.$id);
      } catch (err) {
        setError(err as Error);
        console.error("Error creating CartPaid document:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, error, createCartPaid };
};


export default useCreateCartPaid;
