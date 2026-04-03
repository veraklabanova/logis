'use client';
import { useAppStore } from '@/lib/store';
import { Home, Search, List, AlertTriangle, Truck, Camera, Scale, FileText } from 'lucide-react';
import { transferRequests, notifications } from '@/lib/data';

export default function BottomNav() {
  const { currentUser, currentScreen, navigate } = useAppStore();
  if (!currentUser) return null;

  const role = currentUser.role;
  const pendingArbitrages = transferRequests.filter(t => t.status === 'DISPUTED').length;

  const tabs: { icon: React.ReactNode; label: string; screen: string; badge?: number }[] = [];

  if (role === 'vedouci' || role === 'prodavac') {
    tabs.push(
      { icon: <Home size={20} />, label: 'Dashboard', screen: 'dashboard' },
      { icon: <Search size={20} />, label: 'Vyhledávání', screen: 'search' },
      { icon: <List size={20} />, label: 'Rezervace', screen: 'my-reservations' },
      { icon: <AlertTriangle size={20} />, label: 'Vady', screen: 'damages' },
    );
  } else if (role === 'ridic') {
    tabs.push(
      { icon: <Truck size={20} />, label: 'Manifest', screen: 'manifest' },
      { icon: <Camera size={20} />, label: 'Skenování', screen: 'scan' },
    );
  } else if (role === 'majitel') {
    tabs.push(
      { icon: <Home size={20} />, label: 'Dashboard', screen: 'dashboard' },
      { icon: <Search size={20} />, label: 'Vyhledávání', screen: 'search' },
      { icon: <Scale size={20} />, label: 'Arbitráže', screen: 'arbitrage-detail', badge: pendingArbitrages },
      { icon: <FileText size={20} />, label: 'Audit log', screen: 'audit-log' },
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 pb-safe z-50 max-w-md mx-auto">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.screen;
          return (
            <button
              key={tab.screen}
              onClick={() => navigate(tab.screen as never)}
              className={`flex flex-col items-center py-2 px-3 relative ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {tab.icon}
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-0.5 right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
