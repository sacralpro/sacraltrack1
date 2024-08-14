import { database, Query } from "@/libs/AppWriteClient"
import useGetProfileByUserId from "./useGetProfileByUserId";

const useGetAllPosts = async () => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST), 
            [ Query.orderDesc("$id") ]
        );
        const documents = response.documents;

        const objPromises = documents.map(async doc => {
            let profile = await useGetProfileByUserId(doc?.user_id)

            return {
                id: doc?.$id,
                user_id: doc?.user_id,
                audio_url: doc?.audio_url, 
                mp3_url: doc?.mp3_url,
                image_url: doc?.image_url,
                trackname: doc?.trackname,
                text: doc?.text,
                created_at: doc?.created_at,
                price: doc?.price,
                genre: doc?.genre,
                profile: {
                    user_id: profile?.user_id,
                    name: profile?.name,
                    image: profile?.image,
                }
            }
        })

        const result = await Promise.all(objPromises)
        return result
    } catch (error) {
        throw error
    }
}

export default useGetAllPosts