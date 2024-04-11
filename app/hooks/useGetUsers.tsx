import { database, Query } from "@/libs/AppWriteClient"

const useGetUsers = async (userId) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE), 
            [
                Query.equal('user_id', userId),
                Query.orderDesc("$id")
            ]
        );
        const documents = response.documents;
        const result = documents.map(doc => {
            return { 
                id: doc?.$id, 
                user_id: doc?.user_id,
                name: doc?.name,
                image: doc?.image,
                // Другие поля пользователя, которые вам нужны
            }
        })
        
        return result
    } catch (error) {
        throw error
    }
}

export default useGetUsers