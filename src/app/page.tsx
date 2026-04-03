'use client';
import { useAppStore } from '@/lib/store';
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

export default function Home() {
  const { currentUser, currentScreen } = useAppStore();

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
