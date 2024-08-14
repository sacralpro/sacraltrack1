
import { database, storage, ID } from "@/libs/AppWriteClient";

const useCreatePost = async (
    file: File,
    imageFile: File,
    userId: string,
    caption: string,
    trackname: string,
    mp3File: File, // Add mp3File parameter
    genre: string, // Add genre parameter
) => {
    
    // Generate unique IDs
    let audioId = Math.random().toString(36).slice(2, 22);
    let mp3Id = Math.random().toString(36).slice(2, 22);
    let imageId = Math.random().toString(36).slice(2, 22);

    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
            ID.unique(),
            {
                user_id: userId,
                text: caption,
                trackname: trackname,
                audio_url: audioId,
                mp3_url: mp3Id, // Store the MP3 file URL
                image_url: imageId,
                created_at: new Date().toISOString(),
                price: 2,
                genre: genre,
            }
        );

        await storage.createFile(String(process.env.NEXT_PUBLIC_BUCKET_ID), audioId, file);
        await storage.createFile(String(process.env.NEXT_PUBLIC_BUCKET_ID  ), mp3Id, mp3File); // Save the MP3 file
        await storage.createFile(String(process.env.NEXT_PUBLIC_BUCKET_ID), imageId, imageFile);
    } catch (error) {
        throw error;
    
    }
};

export default useCreatePost