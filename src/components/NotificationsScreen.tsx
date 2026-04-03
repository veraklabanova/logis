'use client';
import { useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { notifications } from '@/lib/data';
import { ArrowLeft, Truck, Gavel, Clock, Package, AlertTriangle, Bell } from 'lucide-react';

const typeIcons: Record<string, typeof Truck> = {
  transfer: Truck,
  arbitrage: Gavel,
  expiration: Clock,
  delivery: Package,
  damage: AlertTriangle,
};

export default function NotificationsScreen() {
  const { currentUser, navigate } = useAppStore();

  const myNotifications = useMemo(() => {
    if (!currentUser) return [];
    return notifications
      .filter(n => n.userId === currentUser.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [currentUser]);

  const unreadCount = myNotifications.filter(n => !n.read).length;

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffH = Math.floor(diffMs / (1000 * 60 * 60));
    const diffD = Math.floor(diffH / 24);

    if (diffH < 1) return 'Právě teď';
    if (diffH < 24) return `Před ${diffH}h`;
    if (diffD < 7) return `Před ${diffD}d`;
    return d.toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const handleTap = () => {
    alert('Navigace na detail v prototypu není dostupná');
  };

  return (
    <div className="pt-16 pb-24 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('dashboard')} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-semibold text-gray-900">
            Notifikace
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Notification list */}
      {myNotifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Žádné notifikace</p>
        </div>
      ) : (
        <div className="space-y-1">
          {myNotifications.map(notif => {
            const IconComponent = typeIcons[notif.type] ?? Bell;
            return (
              <button
                key={notif.id}
                onClick={handleTap}
                className={`w-full text-left flex items-start gap-3 px-3 py-3 rounded-xl transition ${
                  notif.read ? 'hover:bg-gray-50' : 'bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <IconComponent
                    size={18}
                    className={notif.read ? 'text-gray-400' : 'text-blue-600'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm truncate ${
                        notif.read
                          ? 'text-gray-700'
                          : 'text-gray-900 font-semibold'
                      }`}
                    >
                      {notif.title}
                    </p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                      <span className="text-[10px] text-gray-400">
                        {formatTime(notif.timestamp)}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                    {notif.message}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
