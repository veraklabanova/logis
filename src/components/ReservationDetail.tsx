'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  reservations, getProduct, getStoreName, getStatusLabel, getStatusColor,
  getUserName,
} from '@/lib/data';
import { ArrowLeft, Clock, Phone, RefreshCw, Trash2 } from 'lucide-react';

export default function ReservationDetail() {
  const { selectedReservationId, navigate } = useAppStore();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const reservation = reservations.find(r => r.id === selectedReservationId);
  const product = reservation ? getProduct(reservation.productId) : null;

  if (!reservation || !product) {
    return (
      <div className="pt-16 pb-24 px-4 max-w-md mx-auto text-center py-12">
        <p className="text-gray-400 text-sm">Rezervace nenalezena</p>
      </div>
    );
  }

  const createdDate = new Date(reservation.createdAt).toLocaleString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const expiresDate = new Date(reservation.expiresAt).toLocaleString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getExpirationCountdown = () => {
    const now = new Date();
    const expires = new Date(reservation.expiresAt);
    const diffMs = expires.getTime() - now.getTime();
    if (diffMs <= 0) return 'Expirováno';
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `Zbývá ${hours}h ${mins}m`;
    return `Zbývá ${mins}m`;
  };

  const isActive = reservation.status === 'ACTIVE';
  const canExtend = isActive && reservation.extensions < 3;

  const handleExtend = () => {
    alert(
      `Rezervace prodloužena o 1 pracovní den.\nProdloužení: ${reservation.extensions + 1}/3`
    );
  };

  const handleCancel = () => {
    setShowCancelConfirm(false);
    alert('Rezervace zrušena.');
    navigate('my-reservations');
  };

  return (
    <div className="pt-16 pb-24 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('my-reservations')} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-semibold text-gray-900">Detail rezervace</h1>
          <p className="text-xs text-gray-500">{reservation.id}</p>
        </div>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(
            reservation.status
          )}`}
        >
          {getStatusLabel(reservation.status)}
        </span>
      </div>

      {/* Product info */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-3 space-y-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase">Produkt</h3>
        <p className="text-sm font-medium text-gray-900">{product.name}</p>
        <div className="flex flex-wrap gap-x-4 text-xs text-gray-500">
          <span>SKU: {product.sku}</span>
          <span>EAN: {product.ean}</span>
          {product.size && <span>Vel.: {product.size}</span>}
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-500">Množství</span>
          <span className="text-gray-800 font-semibold">{reservation.quantity} ks</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Prodejna</span>
          <span className="text-gray-800">{getStoreName(reservation.storeId)}</span>
        </div>
      </div>

      {/* Customer info */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-3 space-y-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase">Zákazník</h3>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Jméno</span>
          <span className="text-gray-800 font-medium">{reservation.customerName}</span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-500">Telefon</span>
          <a
            href={`tel:${reservation.customerPhone}`}
            className="flex items-center gap-1 text-blue-600 font-medium text-sm"
          >
            <Phone size={14} />
            {reservation.customerPhone}
          </a>
        </div>
        {reservation.note && (
          <div className="text-sm">
            <span className="text-gray-500">Poznámka: </span>
            <span className="text-gray-800">{reservation.note}</span>
          </div>
        )}
      </div>

      {/* Status & timing */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-3 space-y-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase">Časové údaje</h3>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Vytvořeno</span>
          <span className="text-gray-800">{createdDate}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Expiruje</span>
          <span className="text-gray-800">{expiresDate}</span>
        </div>
        {isActive && (
          <div className="flex items-center gap-1 text-sm text-orange-600 font-medium">
            <Clock size={14} />
            {getExpirationCountdown()}
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Prodloužení</span>
          <span className="text-gray-800">{reservation.extensions}/3</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Vytvořil</span>
          <span className="text-gray-800">{getUserName(reservation.createdBy)}</span>
        </div>
      </div>

      {/* Actions */}
      {isActive && (
        <div className="space-y-2 mt-4">
          {canExtend && (
            <button
              onClick={handleExtend}
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl active:bg-blue-700 transition"
            >
              <RefreshCw size={16} />
              Prodloužit o 1 den
            </button>
          )}
          {!canExtend && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2.5">
              <p className="text-xs text-yellow-800">
                Maximální počet prodloužení (3/3) vyčerpán.
              </p>
            </div>
          )}
          <button
            onClick={() => setShowCancelConfirm(true)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 text-sm font-semibold rounded-xl border border-red-200 active:bg-red-100 transition"
          >
            <Trash2 size={16} />
            Zrušit rezervaci
          </button>
        </div>
      )}

      {/* Cancel confirmation dialog */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="bg-white rounded-t-2xl w-full max-w-md p-4 pb-8">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Zrušit rezervaci?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Rezervace pro {reservation.customerName} bude trvale zrušena.
              Tuto akci nelze vzít zpět.
            </p>
            <div className="space-y-2">
              <button
                onClick={handleCancel}
                className="w-full py-3 bg-red-600 text-white text-sm font-semibold rounded-xl"
              >
                Ano, zrušit
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="w-full py-3 text-sm text-gray-600 bg-gray-100 rounded-xl"
              >
                Zpět
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
