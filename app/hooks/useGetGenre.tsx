// app/hooks/useGetGenre.tsx

import { database, ID } from "@/libs/AppWriteClient";

const useGetGenre = async (genre: string) => {
    try {
        // Query the database to fetch posts based on the selected genre
        // You would replace the placeholders with your actual collection IDs and database IDs
        const posts = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
            [
                `genre=${genre}`
            ]
        );

        // Process the fetched posts as needed
        // For example, you can extract relevant information from each post

        return posts; // Return the fetched posts
    } catch (error) {
        throw error;
    }
}

export default useGetGenre;