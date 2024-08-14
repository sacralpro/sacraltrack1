import { database, Query } from "@/libs/AppWriteClient";
import { useUser } from "@/app/context/user";

const useGetRoyaltyBalanceAfterWithdraw = () => {
  const  user = useUser();

  const getRoyaltyBalanceAfterWithdraw = async (userId: string) => {
    try {
      if (!userId) {
        console.error("Не удалось получить баланс роялти после выплаты, так как userId не определен.");
        return 0;
      }

      const response = await database.listDocuments(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTY),
        [
          Query.equal("user_id", userId),
        ]
      );

      if (response.documents.length > 0) {
        const royaltyBalance = parseFloat(response.documents[0].balance_after_withdraw);
        return royaltyBalance;
      } else {
        return 0;
      }
    } catch (error) {
      console.error("Ошибка при получении баланса роялти после выплаты:", error);
      return 0;
    }
  };

  return { getRoyaltyBalanceAfterWithdraw };
};

export default useGetRoyaltyBalanceAfterWithdraw;
