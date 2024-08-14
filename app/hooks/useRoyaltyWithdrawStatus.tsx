import { useState, useEffect } from "react";
import { database, Query } from "@/libs/AppWriteClient";

const useRoyaltyWithdrawStatus = () => {
  const [paidPayments, setPaidPayments] = useState<string[]>([]);
  const [rejectedPayments, setRejectedPayments] = useState<string[]>([]);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        // Получаем идентификаторы документов с оплаченными платежами
        const paidPaymentsFromDB = await getRoyaltyWithdrawDocumentIds();

        // Проверяем статус каждого платежа
        const rejectedPaymentsFromDB: string[] = [];
        for (const id of paidPaymentsFromDB) {
          const status = await getRoyaltyWithdrawStatus(id);
          if (status !== 'paid') {
            rejectedPaymentsFromDB.push(id);
          }
        }

        // Обновляем состояние
        setPaidPayments(paidPaymentsFromDB);
        setRejectedPayments(rejectedPaymentsFromDB);
      } catch (error) {
        console.error("Ошибка при получении списка документов:", error);
      }
    };

    fetchPaymentStatus();
  }, []);

  // Функция для получения идентификаторов документов с оплаченными платежами
  const getRoyaltyWithdrawDocumentIds = async () => {
    try {
      const response = await database.listDocuments(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTYWITHDRAW),
        [
          Query.equal("paid", "paid"),
        ]
      );
      return response.documents.map((doc) => doc.$id);
    } catch (error: any) { // Явно указываем тип ошибки как 'any'
      if (error.code === 404) {
        console.error("Коллекция не найдена:", error);
      }
      return [];
    }
  };

  // Функция для получения статуса платежа
  const getRoyaltyWithdrawStatus = async (paymentId: string) => {
    try {
      const response = await database.getDocument(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTYWITHDRAW),
        paymentId
      );
      return response.paid as string;
    } catch (error) {
      console.error("Ошибка при получении статуса роялти:", error);
      return "unpaid";
    }
  };

  // Функция для обновления статуса платежа
  const updateRoyaltyWithdrawStatus = async (paymentId: string, status: string) => {
    try {
      await database.updateDocument(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTYWITHDRAW),
        paymentId,
        {
          paid: status,
        }
      );

      // Обновляем состояние в зависимости от нового статуса
      if (status === 'paid') {
        setPaidPayments((prev) => [...prev, paymentId]);
        setRejectedPayments((prev) => prev.filter((id) => id !== paymentId));
      } else {
        setRejectedPayments((prev) => [...prev, paymentId]);
        setPaidPayments((prev) => prev.filter((id) => id !== paymentId));
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса роялти:", error);
      throw error;
    }
  };

// Возвращаем объект с необходимыми функциями и состояниями
return {
    paidPayments,
    rejectedPayments,
    updateRoyaltyWithdrawStatus,
    getRoyaltyWithdrawStatus,
    getRoyaltyWithdrawDocumentIds 
  };
  };
  
  export default useRoyaltyWithdrawStatus;
  