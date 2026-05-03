import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  priceDisplay: string;
  quantity: number;
  type: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  deliveryAddress: {
    fullName: string;
    phone: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    pinCode: string;
  };
  createdAt: string;
  estimatedDelivery: string;
}

interface OrderHistoryContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'estimatedDelivery' | 'status'>) => string;
  getOrder: (id: string) => Order | undefined;
  cancelOrder: (id: string) => void;
  clearHistory: () => void;
}

const OrderHistoryContext = createContext<OrderHistoryContextType>({
  orders: [],
  addOrder: () => '',
  getOrder: () => undefined,
  cancelOrder: () => {},
  clearHistory: () => {},
});

export function OrderHistoryProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('nearMyMed-orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('nearMyMed-orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'createdAt' | 'estimatedDelivery' | 'status'>) => {
    const id = `NMM-${Date.now().toString(36).toUpperCase()}`;
    const now = new Date();
    const delivery = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 hours from now
    const newOrder: Order = {
      ...orderData,
      id,
      status: 'confirmed',
      createdAt: now.toISOString(),
      estimatedDelivery: delivery.toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    return id;
  }, []);

  const getOrder = useCallback((id: string) => {
    return orders.find(o => o.id === id);
  }, [orders]);

  const cancelOrder = useCallback((id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'cancelled' as const } : o));
  }, []);

  const clearHistory = useCallback(() => setOrders([]), []);

  return (
    <OrderHistoryContext.Provider value={{ orders, addOrder, getOrder, cancelOrder, clearHistory }}>
      {children}
    </OrderHistoryContext.Provider>
  );
}

export function useOrderHistory() {
  return useContext(OrderHistoryContext);
}
