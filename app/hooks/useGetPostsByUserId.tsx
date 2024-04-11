import { database, Query } from "@/libs/AppWriteClient"

const useGetPostsByUser = async (userId: string) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST), 
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
                audio_url: doc?.audio_url,
                trackname: doc?.trackname,
                image_url: doc?.image_url,
                text: doc?.text,
                created_at: doc?.created_at,
            }
        })
        
        return result
    } catch (error) {
        throw error
    }
}

export default useGetPostsByUser