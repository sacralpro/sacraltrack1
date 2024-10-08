import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useWithdrawRoyalty from "@/app/hooks/useWithdrawRoyalty";
import { useUser } from "@/app/context/user";
import useGetRoyaltyBalanceAfterWithdraw from "@/app/hooks/useGetRoyaltyBalanceAfterWithdraw";
import { useGetRoyaltyBalance } from "@/app/hooks/useGetRoyaltyBalance";
import { MouseEvent } from 'react';

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
  const [totalWithdrawnAmount, setTotalWithdrawnAmount] = useState<number>(0);

  const [isFirstWithdrawal, setIsFirstWithdrawal] = useState<boolean>(true);
  useEffect(() => {
    const savedWithdrawnAmount = localStorage.getItem('withdrawnAmount');
    if (savedWithdrawnAmount) {
      setTotalWithdrawnAmount(Number(savedWithdrawnAmount));
    } else {
      setTotalWithdrawnAmount(0);
    }
  
    const checkFirstWithdrawal = async () => {
      if (user && user.id !== null) {
        try {
          const balanceAfterWithdraw = await getRoyaltyBalanceAfterWithdraw(user.id);
          console.log('Balance after withdrawal:', balanceAfterWithdraw);
          console.log('Current royalty balance:', royaltyBalance);
  
          setRoyaltyBalanceAfterWithdraw(balanceAfterWithdraw);
          setIsFirstWithdrawal(balanceAfterWithdraw === royaltyBalance);
        } catch (error) {
          console.error('Error checking first withdrawal:', error);        }
      }
    };
    checkFirstWithdrawal();
  }, [user, getRoyaltyBalanceAfterWithdraw, royaltyBalance]);
  
  const handleSubmission = async (event: MouseEvent<HTMLButtonElement>) => {

  if (amount < 10) {
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
    } 

    event.preventDefault();
  
    if (cardNumber.trim() === '' || cardExpiry.trim() === '' || firstName.trim() === '' || lastName.trim() === '') {
      toast.error('Please fill in all card details.');
      return;
    }
  
    if (user && user.id !== null) {
      try {
        
        let maxWithdrawAmount: number;

          if (isFirstWithdrawal) {
            maxWithdrawAmount = royaltyBalance - totalWithdrawnAmount;
          } else {
            const newRoyaltyBalanceAfterWithdraw = royaltyBalance - totalWithdrawnAmount;
            maxWithdrawAmount = newRoyaltyBalanceAfterWithdraw >= 0 ? newRoyaltyBalanceAfterWithdraw : 0;
          }


        // Логирование для проверки значений
        console.log('Запрашиваемая сумма для вывода:', amount);
        console.log('Максимальная сумма для вывода:', maxWithdrawAmount);
        console.log('Сумма предыдущих выводов:', totalWithdrawnAmount);
        console.log('royaltyBalance:', royaltyBalance);
        console.log('royaltyBalanceAfterWithdraw:', royaltyBalanceAfterWithdraw);
  
        if (amount > maxWithdrawAmount || amount <= 0) {
          toast.error('Cannot withdraw an amount exceeding the available balance.');
          return;
        }
  
        // Обновляем royaltyBalanceAfterWithdraw после успешного вывода
        let newRoyaltyBalanceAfterWithdraw = royaltyBalanceAfterWithdraw || 0; // Используем значение 0, если royaltyBalanceAfterWithdraw равно NaN
        let newTotalWithdrawnAmount = totalWithdrawnAmount;
  
        if (amount <= maxWithdrawAmount) {
          newRoyaltyBalanceAfterWithdraw = newRoyaltyBalanceAfterWithdraw - amount;
          newTotalWithdrawnAmount = totalWithdrawnAmount + amount;
        }
  
        await withdrawRoyalty(user.id, cardNumber, `${firstName} ${lastName}`, cardExpiry, amount);
  
        toast.success('Thank you, your withdrawal request has been submitted. You will receive the payment within a week.', {
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
  
        setRoyaltyBalanceAfterWithdraw(newRoyaltyBalanceAfterWithdraw);
        setTotalWithdrawnAmount(newTotalWithdrawnAmount);
        localStorage.setItem('withdrawnAmount', String(newTotalWithdrawnAmount));
  
        setCardNumber('');
        setCardExpiry('');
        setCardCVC('');
        setFirstName('');
        setLastName('');
         
        //setAmount(0);

        } catch (error) {
          console.error('Error submitting data:', error);
          toast.error('An error occurred while submitting your request. Please try again.');
        }
        } else {
          toast.error('Unable to retrieve the user ID. Please try again later.');
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
              placeholder="Sasha"
            />
          </div>
          <div className="flex-1 bg-[#272B43] rounded-lg p-4 flex flex-col gap-2">
            <div className="text-[#838383] text-sm">Last Name</div>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              className="bg-transparent text-white text-xl font-bold focus:outline-none"
              placeholder="Wins"
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
  
