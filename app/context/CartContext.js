"use client";

import { createContext, useState, useEffect, useContext, React } from "react";
import { useUser } from "@/app/context/user";
import useCreateCartSession from "@/app/hooks/useCreateCartSession";
import useUpdateCartItems from "../hooks/useUpdateCartItems";
import useDeleteCartItem from "../hooks/useDeleteCartItem";
import useRestoreCartSession from "../hooks/useRestoreCartSession";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState(null);
  const { user, logout } = useUser() || {};


  const contextUser = useUser() || {};

  // Восстановить состояние корзины из localStorage при загрузке компонента
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  

  // Обновление корзины при изменении пользователя
  {/*
  useEffect(() => {
    console.log("Updating cart state due to user change");
    setCartToState();
    restoreCartSession(); // Восстановить корзину при изменении пользователя
  }, [user]); // Update cart when user changes */}

  const setCartToState = () => {
    console.log("Setting cart state");
    if (user) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart(null);
      }
    } else {
      console.log("User is not logged in, removing cart from localStorage");
      setCart(null);
      localStorage.removeItem("cart");
    }
  };

  //Restore cart session
  {/*
  const restoreCartSession = async () => {
    if (user && contextUser.user) {
      try {
        console.log(`Restoring cart session for user with ID: ${contextUser.user.id}`);
        const restoredCart = await useRestoreCartSession(contextUser.user.id);
        if (restoredCart) {
          console.log("Cart session restored from database:", restoredCart);
          setCart(restoredCart); // Update the cart state
          localStorage.setItem("cart", JSON.stringify(restoredCart));
        }
      } catch (error) {
        console.error("Error restoring cart session:", error);
      }
    }
  };
  */}

  const addItemToCart = async ({
    product,
    user,
    name,
    price,
    image,
    audio,
    quantity = 1,
    documentId,
  }) => {
    if (!user || !contextUser.user) {
      console.log("User is not logged in, cannot add item to cart");
      return;
    }

    const item = {
      product,
      user,
      name,
      price,
      image,
      audio,
      quantity,
      documentId,
    };

    let newCartItems;

    if (cart && cart.cartItems) {
      console.log("Cart items already exist, checking if item is already in cart");
      const isItemExist = cart.cartItems.find((i) => i.product === item.product);

      if (isItemExist) {
        console.log("Item already in cart, updating quantity");
        newCartItems = cart.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        console.log("Item not in cart, adding new item");
        newCartItems = [...cart.cartItems, item];
      }
    } else {
      console.log("No cart items, creating new cart items array");
      newCartItems = [item];
    }

    if (cart && cart.cartSession) {
      // Обновить существующую сессию корзины
      console.log("Updating existing cart session");
      await useUpdateCartItems(cart.cartSession, newCartItems);
    } else {
      // Создать новую сессию корзины
      console.log("Creating new cart session");
      const cartItemsIds = newCartItems.map((i) => i.product);
      const documentId = await useCreateCartSession(contextUser?.user?.id, cartItemsIds);
      console.log("New cart session created with ID:", documentId);
      setCart({ cartItems: newCartItems, cartSession: documentId, cart_total: "0" });
    }
    
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
    calculateCartTotal(); // Рассчитать общую сумму корзины после добавления товара
    };
    
    //Delete
    const deleteItemFromCart = (id) => {
      const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);
  
      localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
      setCartToState();
    };
    
    
  
    const calculateCartTotal = () => {
      let total = 0;
    
      if (cart && cart.cartItems) {
        console.log("Calculating cart total");
        cart.cartItems.forEach((item) => {
          total += item.price * item.quantity;
        });
      }
    
      let cartTotal = String(total);
    
      if (cartTotal.length > 120) {
        console.log("Cart total exceeds 120 characters, truncating");
        cartTotal = cartTotal.slice(0, 120);
      }
    
      setCart((prevCart) => ({
        ...prevCart,
        cart_total: cartTotal,
      }));
    };
    
    const handleSuccessfulPayment = async () => {
      // Clear cart and cart session after successful payment
      console.log("Clearing cart and cart session after successful payment");
      setCart(null);
      localStorage.removeItem("cart");
      calculateCartTotal(); // Clear cart total after successful payment
    };

     // Add this code to clear the cart after logout
    useEffect(() => {
      if (!user) {
        console.log("Clearing cart from localStorage after logout");
        localStorage.removeItem("cart");
        setCart(null);
      } 
    }, [user]);
    
    return (
      <CartContext.Provider
        value={{ 
          cart,
          addItemToCart,
          deleteItemFromCart,
          handleSuccessfulPayment,
          calculateCartTotal, // Expose calculateCartTotal to child components
        }}
      >
        {children}
      </CartContext.Provider>
    );
    };
    
    export default CartContext;
    