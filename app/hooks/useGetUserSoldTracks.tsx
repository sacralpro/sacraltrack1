import { useState, useEffect } from "react";
import { database } from "@/libs/AppWriteClient";

export const useGetUserSoldTracks = () => {
  const [royaltyBalance, setRoyaltyBalance] = useState(0);
  const [soldTracks, setSoldTracks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoyaltyBalance = async () => {
      try {
        setLoading(true);
        setError(null);

        const cardPaidDocs = await database.listDocuments(
          String(process.env.NEXT_PUBLIC_DATABASE_ID),
          String(process.env.NEXT_PUBLIC_COLLECTION_ID_CARD_PAID)
        );

        const userCardPaidDocs = cardPaidDocs.documents.filter((doc) => {
          if ("user_id" in doc) {
            return doc.user_id === "YOUR_LOGGED_IN_USER_ID";
          }
          return false;
        });

        const cartItems: string[] = [];
        userCardPaidDocs.forEach((doc) => {
          if ("cart_items" in doc) {
            cartItems.push(...doc.cart_items);
          }
        });

        const totalRoyalty = cartItems.length * 2;
        setRoyaltyBalance(totalRoyalty);

        setSoldTracks(cartItems.length);
      } catch (error) {
        setError("An error occurred while fetching the royalty balance.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoyaltyBalance();
  }, []);

  return { royaltyBalance, soldTracks, loading, error };
};
