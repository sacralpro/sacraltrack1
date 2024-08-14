// RoyaltyPaymentCard.tsx
import React, { useState, useEffect } from 'react';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import { RoyaltyPayment } from '@/app/types';

interface RoyaltyPaymentCardProps {
  payment: RoyaltyPayment;
  onMarkAsPaid: (paymentId: string, amount: number, userId: string) => void;
  onReject: (paymentId: string) => void;
  isPaymentMarkedAsPaid: boolean;
  
}

const RoyaltyPaymentCard: React.FC<RoyaltyPaymentCardProps> = ({
  payment,
  onMarkAsPaid,
  onReject,
  isPaymentMarkedAsPaid,
}) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleMarkAsPaid = () => {
    onMarkAsPaid(payment.id, parseFloat(payment.amount), payment.user_id);
    setIsButtonDisabled(true);
  };

  const handleReject = () => {
    onReject(payment.id);
  };

  useEffect(() => {
    setIsButtonDisabled(isPaymentMarkedAsPaid);
  }, [isPaymentMarkedAsPaid]);

  return (
    <div className="bg-[#1A2338] rounded-2xl p-6 flex justify-between items-center">
      <div>
        <p className="text-[#838383] text-sm">Payment ID: {payment.id}</p>
        <p className="text-[#838383] text-sm">User: {payment.user_id}</p>
        <h3 className="text-white font-bold text-lg">{payment.user_name}</h3>
        <p className="text-[#838383] text-sm">Amount: ${payment.amount}</p>
        <p className="text-[#838383] text-sm">Card: {payment.card}</p>
        <p className="text-[#838383] text-sm">Card Name: {payment.card_name}</p>
        <p className="text-[#838383] text-sm">Expiry: {payment.card_date}</p>
        {/*<p className="text-[#838383] text-sm">Date: {payment.date}</p>*/}
      </div>
      <div className="flex gap-4">
        <button
          className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${
            isPaymentMarkedAsPaid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() =>     onMarkAsPaid(payment.id, parseFloat(payment.amount), payment.user_id)}
          disabled={isPaymentMarkedAsPaid}
        >
          <BsCheckCircle /> Marked as paid
        </button>
        <button
          className="bg-[#FF5C5C] text-white rounded-lg px-4 py-2 flex items-center gap-2"
          onClick={() => onReject(payment.id)}
        >
          <BsXCircle /> Reject
        </button>
      </div>
    </div>
  );
};

export default RoyaltyPaymentCard;

