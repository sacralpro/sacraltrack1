"use client";

import { useState, useEffect } from 'react';
import useGetRoyaltyPayments from '@/app/hooks/useGetRoyaltyPayments';
import useGetRoyaltyBalanceForWithdraw from '@/app/hooks/useGetRoyaltyBalanceForWithdraw';
import useGetRoyaltyBalanceAfterWithdraw from '@/app/hooks/useGetRoyaltyBalanceAfterWithdraw';
import useUpdateRoyaltyBalanceAfterWithdraw from '@/app/hooks/useUpdateRoyaltyBalanceAfterWithdraw';
import TopNav from '@/app/layouts/includes/TopNav';
import ClientOnly from '@/app/components/ClientOnly';
import RoyaltyPaymentCard from '@/app/components/royalty/RoyaltyPaymentCard';
import { RoyaltyPayment } from '@/app/types';
import useRoyaltyWithdrawStatus from '@/app/hooks/useRoyaltyWithdrawStatus';
import useCheckPaymentStatus from '@/app/hooks/useCheckPaymentStatus';
import { useUser } from "@/app/context/user";

const ManagerPage: React.FC = () => {
  
const { royaltyPayments, loading, setRoyaltyPayments } = useGetRoyaltyPayments();
  
  //const [royaltyPayments, setRoyaltyPayments] = useState<RoyaltyPayment[]>([]);
  const { getRoyaltyBalance } = useGetRoyaltyBalanceForWithdraw();
  const { getRoyaltyBalanceAfterWithdraw } = useGetRoyaltyBalanceAfterWithdraw();
  const { updateRoyaltyBalanceAfterWithdraw } = useUpdateRoyaltyBalanceAfterWithdraw();
  const { paidPayments, rejectedPayments, updateRoyaltyWithdrawStatus, getRoyaltyWithdrawStatus } = useRoyaltyWithdrawStatus();
  const { hasAnyPaidPayment } = useCheckPaymentStatus();
  const [paymentStatusMap, setPaymentStatusMap] = useState<{ [key: string]: boolean }>({});
  const userContext = useUser();   

  //const [loading, setLoading] = useState(true);



  useEffect(() => {
    const updatePaymentStatusMap = () => {
      const map: { [key: string]: boolean } = {};
      paidPayments.forEach((id) => (map[id] = true));
      rejectedPayments.forEach((id) => (map[id] = false));
      setPaymentStatusMap(map);
    };
    updatePaymentStatusMap();
  }, [paidPayments, rejectedPayments]);

  const handleMarkAsPaid = async (paymentId: string, amount: number, userId: string) => {
    try {
      const status = await getRoyaltyWithdrawStatus(paymentId);
      if (status === 'paid') {
        console.log(`Платеж ${paymentId} уже помечен как оплаченный.`);
        setPaymentStatusMap((prev) => ({ ...prev, [paymentId]: true }));
        return;
      }

      const hasAlreadyPaidPayments = await hasAnyPaidPayment(userId);
      const currentBalance = hasAlreadyPaidPayments
        ? await getRoyaltyBalanceAfterWithdraw(userId)
        : await getRoyaltyBalance();
      console.log('Текущий баланс роялти:', currentBalance);

      const newBalance = currentBalance - amount;
      console.log('Новый баланс роялти:', newBalance);

      await updateRoyaltyBalanceAfterWithdraw(userId, Number(newBalance));
      console.log('Баланс успешно обновлен');

      await updateRoyaltyWithdrawStatus(paymentId, 'paid');
      console.log('Отмечено как оплаченное:', paymentId);

      setPaymentStatusMap((prev) => ({ ...prev, [paymentId]: true }));
    setRoyaltyPayments((prev: RoyaltyPayment[]) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: 'paid' } : p))
    );
    console.log('UI-компонент обновлен');
    } catch (error) {
      console.error('Ошибка при пометке платежа как оплаченного:', error);
    }
    };
    
    const handleReject = async (paymentId: string) => {
      try {
        await updateRoyaltyWithdrawStatus(paymentId, 'rejected');
        setPaymentStatusMap((prev) => ({ ...prev, [paymentId]: false }));
        console.log('Rejected payment:', paymentId);
      } catch (error) {
        console.error('Error rejecting payment:', error);
      }
    };
    

return (
  <ClientOnly>
                <TopNav params={{ id: userContext?.user?.id as string }} />
                <div className="flex justify-center items-start h-screen pt-20">
      <div className="bg-[#1A2338] rounded-2xl p-8 w-full max-w-[800px] flex flex-col gap-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Royalty Payments</h2>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          royaltyPayments && royaltyPayments.length > 0 ? (
            royaltyPayments.map((payment) => (
              <RoyaltyPaymentCard
                key={payment.id}
                payment={payment}
                onMarkAsPaid={(paymentId) => handleMarkAsPaid(paymentId, parseFloat(payment.amount), payment.user_id)}
                onReject={handleReject}
                isPaymentMarkedAsPaid={rejectedPayments.includes(payment.id) || paidPayments.includes(payment.id)}
              />
            ))
          ) : (
            <p className="text-white">No royalty payments found.</p>
          )
        )}
      </div>
    </div>
  </ClientOnly>
);
};

export default ManagerPage;

