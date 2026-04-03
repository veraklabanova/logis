'use client';
import { create } from 'zustand';
import { User } from './types';

type Screen =
  | 'login'
  | 'dashboard'
  | 'search'
  | 'search-results'
  | 'reservation-form'
  | 'transfer-form'
  | 'approval-detail'
  | 'arbitrage-detail'
  | 'manifest'
  | 'scan'
  | 'my-reservations'
  | 'reservation-detail'
  | 'damages'
  | 'notifications'
  | 'audit-log';

interface AppState {
  currentUser: User | null;
  currentScreen: Screen;
  selectedProductId: string | null;
  selectedStoreId: string | null;
  selectedTransferId: string | null;
  selectedReservationId: string | null;

  login: (user: User) => void;
  logout: () => void;
  navigate: (screen: Screen) => void;
  selectProduct: (productId: string, storeId?: string) => void;
  selectTransfer: (transferId: string) => void;
  selectReservation: (reservationId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  currentScreen: 'login',
  selectedProductId: null,
  selectedStoreId: null,
  selectedTransferId: null,
  selectedReservationId: null,

  login: (user) => set({ currentUser: user, currentScreen: 'dashboard' }),
  logout: () => set({ currentUser: null, currentScreen: 'login', selectedProductId: null, selectedStoreId: null, selectedTransferId: null, selectedReservationId: null }),
  navigate: (screen) => set({ currentScreen: screen }),
  selectProduct: (productId, storeId) => set({ selectedProductId: productId, selectedStoreId: storeId ?? null }),
  selectTransfer: (transferId) => set({ selectedTransferId: transferId }),
  selectReservation: (reservationId) => set({ selectedReservationId: reservationId }),
}));
