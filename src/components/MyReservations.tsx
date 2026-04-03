'use client';
import { useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import {
  reservations, getProduct, getStatusLabel, getStatusColor,
} from '@/lib/data';
import { ArrowLeft, Search, Clock } from 'lucide-react';
import { ReservationStatus } from '@/lib/types';

type FilterType = 'all' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED';

const filterChips: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Vsechny' },
  { value: 'ACTIVE', label: 'Aktivni' },
  { value: 'EXPIRED', label: 'Expirovane' },
  { value: 'CANCELLED', label: 'Zrusene' },
];

export default function MyReservations() {
  const { currentUser, navigate, selectReservation } = useAppStore();
  const [filter, setFilter] = useState<FilterType>('all');

  const myReservations = useMemo(() => {
    const storeId = currentUser?.storeId;
    if (!storeId) return [];
    let filtered = reservations.filter(r => r.storeId === storeId);
    if (filter !== 'all') {
      filtered = filtered.filter(r => r.status === filter);
    }
    return filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [currentUser, filter]);

  const activeCount = reservations.filter(
    r => r.storeId === currentUser?.storeId && r.status === 'ACTIVE'
  ).length;

  const getExpirationText = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diffMs = expires.getTime() - now.getTime();
    if (diffMs <= 0) return 'Expirovano';
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const handleTap = (resId: string) => {
    selectReservation(resId);
    navigate('reservation-detail');
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
            Moje rezervace
            {activeCount > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                {activeCount} aktivni
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {filterChips.map(chip => (
          <button
            key={chip.value}
            onClick={() => setFilter(chip.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition ${
              filter === chip.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Reservation list */}
      {myReservations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm mb-4">Zadne rezervace</p>
          <button
            onClick={() => navigate('search')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl"
          >
            <Search size={14} className="inline mr-1" />
            Hledat produkt
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {myReservations.map(res => {
            const product = getProduct(res.productId);
            return (
              <button
                key={res.id}
                onClick={() => handleTap(res.id)}
                className="w-full text-left bg-white rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product?.name ?? '—'}
                    </p>
                    <p className="text-xs text-gray-500">{product?.sku ?? '—'}</p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-2 ${getStatusColor(
                      res.status
                    )}`}
                  >
                    {getStatusLabel(res.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                  <span>
                    {res.quantity} ks | {res.customerName} | {res.customerPhone}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  {res.status === 'ACTIVE' && (
                    <div className="flex items-center gap-1 text-xs text-orange-600">
                      <Clock size={12} />
                      <span>{getExpirationText(res.expiresAt)}</span>
                    </div>
                  )}
                  <span className="text-[10px] text-gray-400">
                    Prodlouzeni: {res.extensions}/3
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
