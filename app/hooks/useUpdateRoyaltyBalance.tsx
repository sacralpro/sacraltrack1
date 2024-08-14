import { database, ID, Query } from "@/libs/AppWriteClient";
import { useUser } from "@/app/context/user";

const useUpdateRoyaltyBalance = () => {
  const user  = useUser();

  const updateRoyaltyBalance = async (royaltyBalance: number) => {
    try {
      if (!user?.id) {
        console.error("Не удалось обновить баланс роялти, так как user.id не определен.");
        return;
      }

      // Проверяем, существует ли уже документ для данного пользователя
      const response = await database.listDocuments(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTY),
        [
          Query.equal("user_id", user.id),
        ]
      );

      if (response.documents.length > 0) {
        // Обновляем существующий документ
        await database.updateDocument(
          String(process.env.NEXT_PUBLIC_DATABASE_ID),
          String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTY),
          response.documents[0].$id,
          {
            royalty_balance: royaltyBalance.toString().slice(0, 30),
          }
        );
      } else {
        // Создаем новый документ
        await database.createDocument(
          String(process.env.NEXT_PUBLIC_DATABASE_ID),
          String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTY),
          ID.unique(),
          {
            user_id: user.id,
            royalty_balance: royaltyBalance.toString().slice(0, 30),
          }
        );
      }
    } catch (error) {
      console.error("Ошибка при обновлении баланса роялти:", error);
      throw error;
    }
  };

  return { updateRoyaltyBalance };
};

export default useUpdateRoyaltyBalance;
