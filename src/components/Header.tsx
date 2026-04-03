'use client';
import { useAppStore } from '@/lib/store';
import { Bell, LogOut } from 'lucide-react';
import { stores, notifications, ERP_LAST_SYNC } from '@/lib/data';

export default function Header() {
  const { currentUser, navigate, logout } = useAppStore();
  if (!currentUser) return null;

  const store = stores.find(s => s.id === currentUser.storeId);
  const unreadCount = notifications.filter(n => n.userId === currentUser.id && !n.read).length;
  const syncTime = ERP_LAST_SYNC.split('T')[1]?.substring(0, 5) ?? '--:--';

  let title = store?.name ?? 'Logis';
  if (currentUser.role === 'majitel') title = 'Přehled sítě';
  if (currentUser.role === 'ridic') title = 'Manifest řidiče';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-50 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-gray-900 truncate">{title}</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[10px] text-gray-500">Sync: {syncTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('notifications')}
            className="relative p-1"
          >
            <Bell size={20} className="text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button onClick={logout} className="p-1">
            <LogOut size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
