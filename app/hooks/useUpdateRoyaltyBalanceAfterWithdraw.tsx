import { database, Query, ID } from '@/libs/AppWriteClient';

const updateRoyaltyBalanceAfterWithdraw = async (userId: string, newBalance: number) => {
  try {
    const documents = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTY),
      [Query.equal('user_id', userId)]
    );

    // Логирование всех полученных документов для отладки
    console.log('Полученные документы из базы данных:', documents.documents);

    if (documents.documents.length > 0) {
      const documentId = documents.documents[0].$id;
      const updatedDocument = {
        balance_after_withdraw: newBalance.toFixed(2),
      };
      await database.updateDocument(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTY),
        documentId,
        updatedDocument
      );
      console.log('Баланс роялти успешно обновлен.');
    } else {
      throw new Error('Документ с запрошенным идентификатором пользователя не найден.');
    }
  } catch (error) {
    console.error('Ошибка при обновлении баланса:', error);
    throw error;
  }
};

const useUpdateRoyaltyBalanceAfterWithdraw = () => {
  return { updateRoyaltyBalanceAfterWithdraw };
};

export default useUpdateRoyaltyBalanceAfterWithdraw;
