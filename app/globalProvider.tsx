import { ReactNode } from 'react';
import { CartProvider } from '@/app/context/CartContext'; // Update the import statement

interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  return <CartProvider>{children}</CartProvider>;
}