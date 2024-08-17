"use client";

import Link from "next/link";
import React from "react";
import CartContext from "@/app/context/CartContext";
import { useContext } from "react";
import createCheckoutSession from "@/app/components/cart/Cart";
import { PostMainCompTypes } from "@/app/types";


interface CartSideBarProps {
  //post: PostMainCompTypes | null;
  handlePayClick: (cartItems: any) => void;
}
export const CartSideBar: React.FC<CartSideBarProps> = ({ handlePayClick }) => {

  const { cart } = useContext(CartContext);

  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc: number, item: any) => acc + item.quantity * item.price,
    0
  );

  const taxAmount = (amountWithoutTax * 0.0).toFixed(2);

  const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2);



  return (
    <>
      <div
        id="RightSideBar"
        className={`
          z-20 bg-[#272B43] pt-[10px] h-auto mt-[100px] ml-[20px] overflow-hidden p-[20px] rounded-2xl justify-center
          flex flex-col items-center // Add this line for centering along the y-axis
          w-[300px] fixed md:right-0 pb-4 mr-[20px] 
        `}
      >
        <section className="py-5 sm:py-7 mt-[20px]">
          <div className="container w-auto md:w-300  mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-2">
           {/*   {cart?.cartItems?.length || 0} Item(s) in */}
              
              Cart
            </h2>
          </div>
        </section>

        <ul className="mb-5">
          {/* <li className="flex justify-between text-white  mb-1">
            <span>Amount before Tax:</span>
            <span>${amountWithoutTax}</span>
          </li> */}
          <li className="flex justify-between text-white  mb-1">
            <span>Total:</span>
            <span className="text-[40C998]">
              {cart?.cartItems?.reduce(
                (acc: number, item: any) => acc + item.quantity,
                0
              )}{" "}
              (Tracks)
            </span>
          </li>
          <li className="flex justify-between text-gray-600  mb-1">
            <span>TAX:</span>
            <span>${taxAmount}</span>
          </li>
          <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
            <span>Total price: </span>
            <span>${totalAmount}</span>
          </li>
        </ul>

        <a
          onClick={handlePayClick}
          className="px-4 py-3 mb-2 inline-block text-[14px] w-full text-center font-medium text-white bg-[#40C998]  rounded-2xl mt-5 hover:bg-[#25BCA1] cursor-pointer"
        >
          Pay
        </a>
      </div>
    </>
  );
}