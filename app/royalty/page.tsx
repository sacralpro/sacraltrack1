"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsCheckCircle } from "react-icons/bs";
import useCreateRoyaltyPayment from "@/app/hooks/useCreateRoyaltyPayment";
import RoyaltyBalanceCard from "@/app/components/royalty/RoyaltyBalanceCard";
import SoldTracksCard from "@/app/components/royalty/SoldTracksCard";
import TermsOfUseCard from "@/app/components/TermsOfUseCard";
import ClientOnly from "@/app/components/ClientOnly";
import CardForm from "../components/CardForm";
import TopNav from "@/app/layouts/includes/TopNav";
import { useUser } from "@/app/context/user";



export default function RoyaltyPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card");
    const [amount, setAmount] = useState<number>(0);
    const { createRoyaltyPayment } = useCreateRoyaltyPayment();
    const userContext = useUser();



  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value >= 0 ? value : 0); // Устанавливаем значение 0, если введено отрицательное число
  };
    

  return (
    <ClientOnly>

    <TopNav params={{ id: userContext?.user?.id as string }} />



        <div className="flex justify-left items-center h-screen px-5">
            <div className="bg-[#1A2338] md:mt-[380px] mt-[710px] rounded-2xl p-8 w-full max-w-[800px] flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 text-white">Withdraw Royalty</h2>
                <div className="mb-4">
                    <label className="block text-white font-medium mb-2">Payment Method</label>
                    <div className="flex items-center gap-4">
                    <button
                        className={`px-4 py-2 rounded-lg ${
                        paymentMethod === "card" ? "bg-[#20DDBB] text-white" : "bg-[#272B43] text-[#838383]"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                    >
                        Card
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${
                        paymentMethod === "crypto" ? "bg-[#20DDBB] text-white" : "bg-[#272B43] text-[#838383]"
                        }`}
                        //onClick={() => setPaymentMethod("crypto")}
                    >
                        Crypto
                    </button>
                    </div>
                </div>
                <div className="mb-4">
              <div className="mb-4 max-w-[500px] ">
                <label className="block text-white font-medium mb-2">Amount</label>
                <input
                    type="number"
                    value={amount}
                    
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className="bg-[#272B43] text-white rounded-lg px-4 py-3 w-full focus:outline-none"
                    placeholder="Enter amount"
                /> 
            </div>
               
                </div>
               
                <CardForm amount={amount} onSubmit={function (cardDetails: { cardNumber: string; cardExpiry: string; cardCVC: string; firstName: string; lastName: string; }, amount: number): void {
                          throw new Error("Function not implemented.");
                      } } />
                 

                <div className="flex-1 absolute top-[100px] right-5 w-[320px] md:max-w-[390px]">
                <RoyaltyBalanceCard />

                <div className="h-5"></div>

                {/* Sold Tracks Card<SoldTracksCard /> */}

                <div className="h-5"></div>

                <TermsOfUseCard />
                </div>
            </div>
            </div>
            </div>

</ClientOnly>
);
}
