import { database } from "@/libs/AppWriteClient";
import { useEffect, useState } from 'react';
import { RoyaltyPayment } from "@/app/types";

const useGetRoyaltyPayments = () => {
  const [royaltyPayments, setRoyaltyPayments] = useState<RoyaltyPayment[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchRoyaltyPayments = async () => {
      try {
        const response = await database.listDocuments(
          String(process.env.NEXT_PUBLIC_DATABASE_ID),
          String(process.env.NEXT_PUBLIC_COLLECTION_ID_ROYALTYWITHDRAW),
          []
        );

        const payments = response.documents.map((doc) => ({
          id: doc.$id,
          user_id: doc.user_id,
          user_name: doc.user_name, // Assuming 'user_name' is a field in the payment document
          amount: doc.amount ? doc.amount.toString() : '0', // Handle undefined or null values
          card: doc.card,
          card_name: doc.card_name,
          card_date: doc.card_date,
          date: new Date(doc.date * 1000).toLocaleString(), // Convert timestamp to date string
        }));

        setRoyaltyPayments(payments);
      } catch (error) {
        console.error('Error fetching royalty payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoyaltyPayments();
  }, []);

  return { royaltyPayments, loading, setRoyaltyPayments };
};

export default useGetRoyaltyPayments;
