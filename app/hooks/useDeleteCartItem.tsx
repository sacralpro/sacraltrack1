import { database, ID, Query } from "@/libs/AppWriteClient";

const useDeleteCartItem = async (id: string) => {
  try {
    // Delete the document from the database
    await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_CARTSESSION),
      id
    );

    // Return a success message or any additional data if needed
    return { success: true };
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

export default useDeleteCartItem;