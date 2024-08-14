import { useState } from "react";
import { database, ID } from "@/libs/AppWriteClient";

interface RoyaltyPaymentData {
  user_id: string;
  amount: number;
  card_number: string;
  expiration_date: string;
  check_number: string;
  created_at: string;
}

const useCreateRoyaltyPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRoyaltyPayment = async (
    amount: number,
    cardNumber: string,
    expirationDate: string,
    userId: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Generate a unique check number
      const checkNumber = Math.random().toString(36).slice(2, 12);

      // Create the royalty payment document
      await database.createDocument(
        String(process.env.NEXT_PUBLIC_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTY_PAYMENT),
        ID.unique(),
        {
          user_id: userId,
          amount: amount,
          card_number: cardNumber,
          expiration_date: expirationDate,
          check_number: checkNumber,
          created_at: new Date().toISOString(),
        } as RoyaltyPaymentData
      );

      setLoading(false);
    } catch (error) {
      setError("An error occurred while creating the royalty payment.");
      setLoading(false);
      throw error;
    }
  };

  return { createRoyaltyPayment, loading, error };
};

export default useCreateRoyaltyPayment;
