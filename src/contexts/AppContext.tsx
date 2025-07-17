
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Child, CartItem } from '@/types';

interface AppContextType {
  selectedChild: Child | null;
  setSelectedChild: (child: Child | null) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: string, format: 'ebook' | 'hardcover') => void;
  updateCartQuantity: (bookId: string, format: 'ebook' | 'hardcover', quantity: number) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedChild = localStorage.getItem('memo-child');
    const savedCart = localStorage.getItem('memo-cart');
    
    if (savedChild) {
      setSelectedChild(JSON.parse(savedChild));
    }
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save child to localStorage whenever it changes
  useEffect(() => {
    if (selectedChild) {
      localStorage.setItem('memo-child', JSON.stringify(selectedChild));
    } else {
      localStorage.removeItem('memo-child');
    }
  }, [selectedChild]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('memo-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.bookId === newItem.bookId && item.format === newItem.format
      );
      
      if (existingIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += newItem.quantity;
        return updatedCart;
      } else {
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (bookId: string, format: 'ebook' | 'hardcover') => {
    setCart(prevCart => prevCart.filter(
      item => !(item.bookId === bookId && item.format === format)
    ));
  };

  const updateCartQuantity = (bookId: string, format: 'ebook' | 'hardcover', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId, format);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.bookId === bookId && item.format === format
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <AppContext.Provider value={{
      selectedChild,
      setSelectedChild,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      getCartTotal,
      getCartItemCount
    }}>
      {children}
    </AppContext.Provider>
  );
};
