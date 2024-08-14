import { database, Query } from "@/libs/AppWriteClient";

const useCheckPaymentStatus = () => {
  const getPaymentStatusList = async (userId: string) => {
    try {
      const response = await database.listDocuments(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTYWITHDRAW),
        [
          Query.equal("user_id", userId)
        ]
      );

      console.log('Список платежей:', response.documents);
      return response.documents;
    } catch (error) {
      console.error("Ошибка при получении списка платежей:", error);
      return [];
    }
  };

  const hasAnyPaidPayment = async (userId: string) => {
    const paymentStatusList = await getPaymentStatusList(userId);
    const hasPaidPayment = paymentStatusList.some((payment) => payment.paid === 'paid');
    console.log(`Пользователь ${userId} имеет оплаченные платежи: ${hasPaidPayment}`);
    return hasPaidPayment;
  };

  return { hasAnyPaidPayment };
};

export default useCheckPaymentStatus;
