import { database } from "@/libs/AppWriteClient";
import { Query } from "@/libs/AppWriteClient";

const useGetUserById = async (userId: string) => {
    try {
        const doc = await database.getDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE), 
            userId
        );
        
        const user = {
            id: doc?.$id, 
            user_id: doc?.user_id,
            name: doc?.name,
            image: doc?.image,
            // Другие поля пользователя, которые вам нужны
        };
        
        return user;
    } catch (error) {
        throw error;
    }
}

export default useGetUserById;