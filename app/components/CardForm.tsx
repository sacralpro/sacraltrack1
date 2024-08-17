import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useWithdrawRoyalty from "@/app/hooks/useWithdrawRoyalty";
import { useUser } from "@/app/context/user";
import useGetRoyaltyBalanceAfterWithdraw from "@/app/hooks/useGetRoyaltyBalanceAfterWithdraw";
import { useGetRoyaltyBalance } from "@/app/hooks/useGetRoyaltyBalance";

interface CardFormProps {
  onSubmit: (cardDetails: { cardNumber: string, cardExpiry: string, cardCVC: string, firstName: string, lastName: string }, 
    amount: number) => void;
  amount: number;
}

const CardForm: React.FC<CardFormProps> = ({ onSubmit, amount }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const user = useUser();
  
  const { withdrawRoyalty } = useWithdrawRoyalty();
  const { royaltyBalance } = useGetRoyaltyBalance();
  const { getRoyaltyBalanceAfterWithdraw } = useGetRoyaltyBalanceAfterWithdraw();
  const [royaltyBalanceAfterWithdraw, setRoyaltyBalanceAfterWithdraw] = useState<number>(0);

  const handleSubmission = async () => {
   {/* if (amount < 10) {
      toast.error('Withdrawal is available from $10', {
        duration: 10000,
        style: {
          background: '#1A2338',
          color: '#20DDBB',
          padding: '16px 24px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
      return;
    } */}

    if (cardNumber.trim() === '' || cardExpiry.trim() === '' || firstName.trim() === '' || lastName.trim() === '') {
      toast.error('Please fill in all card details.');
    } else if (user && user.id !== null) {
      try {
        const balanceAfterWithdraw = await getRoyaltyBalanceAfterWithdraw(user.id);
        setRoyaltyBalanceAfterWithdraw(balanceAfterWithdraw);
  
        if (isNaN(balanceAfterWithdraw) || balanceAfterWithdraw === 0) {
          if (amount > royaltyBalance) {
            toast.error('Cannot withdraw an amount greater than the current royalty balance.');
          } else {
            await withdrawRoyalty(user.id, cardNumber, firstName + " " + lastName, cardExpiry, amount);
            toast.success('Thank you, your withdrawal request has been submitted. You will receive your payment within a week.', {
              duration: 20000,
              style: {
                background: '#1A2338',
                color: '#20DDBB',
                padding: '16px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
              },
            });
            // Clear form fields
            setCardNumber('');
            setCardExpiry('');
            setCardCVC('');
            setFirstName('');
            setLastName('');
          }
        } else if (amount > balanceAfterWithdraw) {
          toast.error('Cannot withdraw an amount greater than the balance after withdrawal.');
        } else {
          await withdrawRoyalty(user.id, cardNumber, firstName + " " + lastName, cardExpiry, amount);
          toast.success('Thank you, your withdrawal request has been submitted. You will receive your payment within a week.', {
            duration: 20000,
            style: {
              background: '#1A2338',
              color: '#20DDBB',
              padding: '16px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          });
          // Clear form fields
          setCardNumber('');
          setCardExpiry('');
          setCardCVC('');
          setFirstName('');
          setLastName('');
        }
      } catch (error) {
        console.error('Error submitting data:', error);
        toast.error('An error occurred while submitting data. Please try again.');
      }
    } else {
      toast.error('Unable to retrieve user ID. Please try again later.');
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formattedValue);
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(\d{2})/, '$1/$2').trim();
    setCardExpiry(formattedValue);
  };

  const handleCardCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardCVC(value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  return (
    <div className="bg-[#1A2338] rounded-2xl w-full max-w-[500px] flex flex-col gap-6">
      <div className="relative">
        <div
          className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#20DDBB] to-[#1A2338] rounded-2xl transition-all duration-500 ${
            cardNumber.length > 0 || cardExpiry.length > 0 || cardCVC.length > 0
              ? 'opacity-100'
              : 'opacity-0'
          }`}
        />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-white text-2xl font-bold">Credit Card</div>
          </div>

          <div className="flex-1 bg-[#272B43] rounded-lg p-4 flex flex-col gap-2">
            <div className="text-[#838383] text-sm">First Name</div>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              className="bg-transparent text-white text-xl font-bold focus:outline-none"
              placeholder="John"
            />
          </div>
          <div className="flex-1 bg-[#272B43] rounded-lg p-4 flex flex-col gap-2">
            <div className="text-[#838383] text-sm">Last Name</div>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              className="bg-transparent text-white text-xl font-bold focus:outline-none"
              placeholder="Doe"
            />
          </div>
          <div className="bg-[#272B43] rounded-lg p-4 flex flex-col gap-2">
            <div className="text-[#838383] text-sm">Card Number</div>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="bg-transparent text-white text-xl font-bold focus:outline-none"
              maxLength={19}
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1 bg-[#272B43] rounded-lg p-4 flex flex-col gap-2">
              <div className="text-[#838383] text-sm">Expiry Date</div>
              <input
                type="text"
                value={cardExpiry}
                onChange={handleCardExpiryChange}
                className="bg-transparent text-white text-xl font-bold focus:outline-none"
                maxLength={5}
                placeholder="MM/YY"
              />
            </div>
            <div className="flex-1 bg-[#272B43] rounded-lg p-4  flex-col gap-2 hidden">
              {/* CVC Input Field */}
              {/* <div className="text-[#838383] text-sm">CVC</div>
              <input
                type="text"
                value={cardCVC}
                onChange={handleCardCVCChange}
                className="bg-transparent text-white text-xl font-bold focus:outline-none"
                maxLength={3}
                placeholder="123"
              /> */}
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-[#20DDBB] text-white rounded-lg py-3 font-bold hover:bg-[#1AA89C] transition-colors duration-300"
        onClick={handleSubmission}
        >
          Request Withdrawal
        </button>
        <div className="mt-4 text-center">
          <a href="http://t.me/sashaplayra" className="text-[#20DDBB] hover:underline" target="_blank" rel="noopener noreferrer">
            Need help? Ask our manager.
          </a>
        </div>
      </div>
    );
  };
  
  export default CardForm;
  
