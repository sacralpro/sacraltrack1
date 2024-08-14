import { database, Query } from "@/libs/AppWriteClient";

const useAddFriend = async (currentUserId: string, friendUserId: string) => {
    try {
        // Проверяем, есть ли запись для текущего пользователя
        const currentUserRecord = await database.getDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_FRIENDS),
            currentUserId
        );

        if (!currentUserRecord) {
            // Если записи нет, создаем новую
            await database.createDocument(
                String(process.env.NEXT_PUBLIC_DATABASE_ID),
                String(process.env.NEXT_PUBLIC_COLLECTION_ID_FRIENDS),
                currentUserId,
                {
                    user_id: currentUserId,
                    user_friends: friendUserId
                }
            );
        } else {
            // Если запись есть, добавляем новый user_id в user_friends
            const currentFriends = currentUserRecord.user_friends.split(',');
            if (!currentFriends.includes(friendUserId)) {
                const updatedFriends = [...currentFriends, friendUserId].join(',');
                await database.updateDocument(
                    String(process.env.NEXT_PUBLIC_DATABASE_ID),
                    String(process.env.NEXT_PUBLIC_COLLECTION_ID_FRIENDS),
                    currentUserId,
                    {
                        user_friends: updatedFriends
                    }
                );
            }
        }
    } catch (error) {
        throw error;
    }
};

export default useAddFriend;
