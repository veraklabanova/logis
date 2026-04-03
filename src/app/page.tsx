'use client';
import { useEffect } from 'react';
import { useAppStore, Screen } from '@/lib/store';
import { users } from '@/lib/data';
import LoginScreen from '@/components/LoginScreen';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import DashboardVedouci from '@/components/DashboardVedouci';
import DashboardRidic from '@/components/DashboardRidic';
import DashboardMajitel from '@/components/DashboardMajitel';
import SearchScreen from '@/components/SearchScreen';
import ReservationForm from '@/components/ReservationForm';
import TransferForm from '@/components/TransferForm';
import ApprovalDetail from '@/components/ApprovalDetail';
import ArbitrageDetail from '@/components/ArbitrageDetail';
import ScanScreen from '@/components/ScanScreen';
import MyReservations from '@/components/MyReservations';
import ReservationDetail from '@/components/ReservationDetail';
import DamagesScreen from '@/components/DamagesScreen';
import NotificationsScreen from '@/components/NotificationsScreen';
import AuditLogScreen from '@/components/AuditLogScreen';

// Map preview screen IDs to role + app screen
const PREVIEW_SCREEN_MAP: Record<string, { role: string; screen: Screen }> = {
  'login': { role: '', screen: 'login' },
  'dashboard-vedouci': { role: 'vedouci', screen: 'dashboard' },
  'dashboard-prodavac': { role: 'prodavac', screen: 'dashboard' },
  'dashboard-ridic': { role: 'ridic', screen: 'dashboard' },
  'dashboard-majitel': { role: 'majitel', screen: 'dashboard' },
  'search': { role: 'vedouci', screen: 'search' },
  'reservations': { role: 'vedouci', screen: 'my-reservations' },
  'damages': { role: 'vedouci', screen: 'damages' },
  'manifest': { role: 'ridic', screen: 'manifest' },
  'scan': { role: 'ridic', screen: 'scan' },
  'arbitrage': { role: 'majitel', screen: 'arbitrage-detail' },
  'audit': { role: 'majitel', screen: 'audit-log' },
  'notifications': { role: 'vedouci', screen: 'notifications' },
};

export default function Home() {
  const { currentUser, currentScreen, login, logout, navigate } = useAppStore();

  // Listen for postMessage from preview page
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'logis-navigate') {
        const screenId = event.data.screen as string;
        const mapping = PREVIEW_SCREEN_MAP[screenId];
        if (!mapping) return;

        if (screenId === 'login') {
          logout();
          return;
        }

        // Find a user with the right role and log them in
        const targetUser = users.find(u => u.role === mapping.role);
        if (targetUser) {
          login(targetUser);
          // Small delay to ensure login state is set before navigating
          setTimeout(() => navigate(mapping.screen), 50);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [login, logout, navigate]);

  if (!currentUser || currentScreen === 'login') {
    return <LoginScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        if (currentUser.role === 'ridic') return <DashboardRidic />;
        if (currentUser.role === 'majitel') return <DashboardMajitel />;
        return <DashboardVedouci />;
      case 'search':
      case 'search-results':
        return <SearchScreen />;
      case 'reservation-form':
        return <ReservationForm />;
      case 'transfer-form':
        return <TransferForm />;
      case 'approval-detail':
        return <ApprovalDetail />;
      case 'arbitrage-detail':
        return <ArbitrageDetail />;
      case 'manifest':
        return <DashboardRidic />;
      case 'scan':
        return <ScanScreen />;
      case 'my-reservations':
        return <MyReservations />;
      case 'reservation-detail':
        return <ReservationDetail />;
      case 'damages':
        return <DamagesScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'audit-log':
        return <AuditLogScreen />;
      default:
        return <DashboardVedouci />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen max-w-md mx-auto">
      <Header />
      <main className="pt-16 pb-20 px-4">
        {renderScreen()}
      </main>
      <BottomNav />
    </div>
  );
}
