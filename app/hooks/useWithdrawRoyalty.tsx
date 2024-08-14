import { database, ID } from "@/libs/AppWriteClient";

const useWithdrawRoyalty = () => {
    const withdrawRoyalty = async (userId: string, cardNumber: string, cardName: string, cardExpiry: string, amount: number) => {
        try {
            await database.createDocument(
                String(process.env.NEXT_PUBLIC_DATABASE_ID), // Идентификатор базы данных
                String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTYWITHDRAW), // Идентификатор коллекции
                ID.unique(), // Уникальный идентификатор документа
                {
                    user_id: userId, // ID текущего пользователя
                    date: new Date().toISOString(), // Текущая дата и время
                    card: cardNumber, // Номер карты
                    card_name: cardName, // Имя на карте
                    card_date: cardExpiry, // Срок действия карты
                    amount: amount.toString() // Преобразуем значение amount в строку
                }
            );
        } catch (error) {
            throw error;
        }
    };

    return { withdrawRoyalty };
};

export default useWithdrawRoyalty;
