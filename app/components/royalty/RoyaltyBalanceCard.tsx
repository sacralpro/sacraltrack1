import React, { useState, useEffect } from "react";
import { useGetRoyaltyBalance } from "@/app/hooks/useGetRoyaltyBalance";
import useGetRoyaltyBalanceAfterWithdraw from "@/app/hooks/useGetRoyaltyBalanceAfterWithdraw";
import { useUser } from "@/app/context/user";

export default function RoyaltyBalanceCard() {
  const  user  = useUser();
  const { royaltyBalance } = useGetRoyaltyBalance();
  const { getRoyaltyBalanceAfterWithdraw } = useGetRoyaltyBalanceAfterWithdraw();
  const [royaltyBalanceAfterWithdraw, setRoyaltyBalanceAfterWithdraw] = useState<number>(0);

  useEffect(() => {
    const fetchRoyaltyBalanceAfterWithdraw = async () => {
      if (user?.id) {
        const balance = await getRoyaltyBalanceAfterWithdraw(user.id);
        setRoyaltyBalanceAfterWithdraw(balance);
      }
    };
    fetchRoyaltyBalanceAfterWithdraw();
  }, [getRoyaltyBalanceAfterWithdraw, user?.id]);

  return (
    <div className="bg-[#272B43] rounded-2xl p-4">
      <h3 className="text-white font-bold mb-2">Royalty Balance</h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#838383] text-sm">Total Royalty</span>
        <span className="text-white text-2xl font-bold">${royaltyBalance.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[#838383] text-sm">Current Royalty</span>
        <span className="text-white text-2xl font-bold">${royaltyBalanceAfterWithdraw.toFixed(2)}</span>
      </div>
    </div>
  );
}
