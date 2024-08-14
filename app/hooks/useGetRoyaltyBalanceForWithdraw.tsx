import { database, Query } from "@/libs/AppWriteClient";
import { useUser } from "@/app/context/user";

const useGetRoyaltyBalanceForWithdraw = () => {
  const user = useUser();

  const getRoyaltyBalance = async () => {
    try {
      if (!user?.id) {
        console.error("Не удалось получить баланс роялти, так как user.id не определен.");
        return 0;
      }

      const response = await database.listDocuments(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTY),
        [
          Query.equal("user_id", user.id),
        ]
      );

      if (response.documents.length > 0) {
        const royaltyBalance = parseFloat(response.documents[0].royalty_balance);
        return royaltyBalance;
      } else {
        return 0;
      }
    } catch (error) {
      console.error("Ошибка при получении баланса роялти:", error);
      return 0;
    }
  };

  return { getRoyaltyBalance };
};

export default useGetRoyaltyBalanceForWithdraw;
