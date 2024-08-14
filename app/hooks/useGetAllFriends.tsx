import { database, Query } from "@/libs/AppWriteClient";

const useGetAllFriends = async () => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_FRIENDS),
            []
        );
        const documents = response.documents;
        const friends = documents.map(doc => ({
            id: doc?.$id,
            user_id: doc?.user_id,
            name: doc?.name,
            image: doc?.image
        }));
        return friends;
    } catch (error) {
        throw error;
    }
}

export default useGetAllFriends;
