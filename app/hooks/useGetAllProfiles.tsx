import { database, Query } from "@/libs/AppWriteClient"

const useGetAllProfiles = async () => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE), 
            [] 
        );
        const documents = response.documents;
        const profiles = documents.map(doc => ({
            id: doc?.$id,
            user_id: doc?.user_id,
            name: doc?.name,
            image: doc?.image,
            bio: doc?.bio
        }));
        return profiles;
    } catch (error) {
        throw error;
    }
}

export default useGetAllProfiles;