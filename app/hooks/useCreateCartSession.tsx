import { database, storage, ID, Query } from "@/libs/AppWriteClient";

const useCreateCartSession = async (
  userId: string, 
  cartItems: Array<string> = [],
) => {
  try {
    // Check if a cart session already exists for the user
    const existingSession = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_CARTSESSION),
      [
        Query.equal('user_id', userId)
      ]
    );

    if (existingSession.documents.length > 0) {
      const cartSessionId = existingSession.documents[0].$id;

      // Filter out duplicate items before adding to the cart session
      const updatedCartItems = cartItems.filter(item => (
        !existingSession.documents[0].cart_items.includes(item)
      ));

      // Add only unique items to the existing cart items
      const finalCartItems = [...existingSession.documents[0].cart_items, ...updatedCartItems];

      await database.updateDocument(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_CARTSESSION),
        cartSessionId,
        {
          cart_items: finalCartItems,
        }
      );
    } else {
      // Create a new cart session if one does not exist for the user
      const cartTotal = ""; // Your logic to calculate the total cart value here
      const cartDate = new Date().toISOString();

      await database.createDocument(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_CARTSESSION),
        ID.unique(),
        {
          user_id: userId,
          cart_items: cartItems, 
          cart_total: cartTotal,
          cart_date: cartDate,
        }
      );
    }
  } catch (error) {
    throw error;
  }
};

export default useCreateCartSession;