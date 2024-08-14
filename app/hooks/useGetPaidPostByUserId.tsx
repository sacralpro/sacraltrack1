
import { database, Query } from "@/libs/AppWriteClient";

export type PaidPostData = {
  user_id: string;
  id: string;
  cart_items: string[];
};
const useGetPaidPostByUserId = async (userId: string): Promise<PaidPostData[]> => {
  try {
    // Запрашиваем все документы из коллекции 'CartPaid', отфильтрованные по user_id
    const response = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_CARTPAID),
      [
        Query.equal('user_id', userId),
        Query.orderDesc("$id")
      ]
    );

    // Преобразуем полученные документы в ожидаемый формат PaidPostData
    const result: PaidPostData[] = response.documents.map((doc) => {
      return {
        user_id: doc.user_id as string,
        id: doc.$id as string,
        cart_items: doc.cart_items as string[]
      };
    });

    return result;
  } catch (error) {
    console.error("Failed to fetch paid posts by user id:", error);
    throw new Error("Failed to fetch paid posts by user id");
  }
};

export default useGetPaidPostByUserId;



