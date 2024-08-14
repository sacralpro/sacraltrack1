"use client";
import Cart from "@/app/components/cart/Cart";
import React from "react";
import { useContext } from "react";
import CartContext from "@/app/context/CartContext";

const CartPage = () => {
  const { post } = useContext(CartContext);

  return <Cart post={post} />;
};

export default CartPage;