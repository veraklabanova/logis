'use client';
import { useAppStore } from '@/lib/store';
import {
  transferRequests, getProduct, getStoreName, getUserName, users,
  calculateATP,
} from '@/lib/data';
import { ArrowLeft, Gavel, Ban } from 'lucide-react';

const disputeReasonLabels: Record<string, string> = {
  last_piece: 'Poslední kus',
  reserved_local: 'Rezervováno pro místního',
  damaged: 'Zboží poškozené',
  other: 'Jiné',
};

const reasonLabels: Record<string, string> = {
  customer_waiting: 'Zákazník čeká',
  restock: 'Doplnění skladu',
  other: 'Jiné',
};

export default function ArbitrageDetail() {
  const { selectedTransferId, navigate } = useAppStore();

  const transfer = transferRequests.find(t => t.id === selectedTransferId);
  const product = transfer ? getProduct(transfer.productId) : null;

  if (!transfer || !product) {
    return (
      <div className="pt-16 pb-24 px-4 max-w-md mx-auto text-center py-12">
        <p className="text-gray-400 text-sm">Spor nenalezen</p>
      </div>
    );
  }

  const sourceManager = users.find(
    u => u.storeId === transfer.sourceStoreId && u.role === 'vedouci'
  );
  const targetManager = users.find(
    u => u.storeId === transfer.targetStoreId && u.role === 'vedouci'
  );

  const sourceAtp = calculateATP(transfer.productId, transfer.sourceStoreId);
  const targetAtp = calculateATP(transfer.productId, transfer.targetStoreId);

  const createdDate = new Date(transfer.createdAt).toLocaleString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleForceTransfer = () => {
    alert('Přesun vynucen majitelem.\n\nProdukt: ' + product.name);
    navigate('dashboard');
  };

  const handleConfirmRejection = () => {
    alert('Zamítnutí potvrzeno majitelem.\n\nProdukt: ' + product.name);
    navigate('dashboard');
  };

  return (
    <div className="pt-16 pb-24 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('dashboard')} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-base font-semibold text-gray-900">Arbitráž sporu</h1>
          <p className="text-xs text-gray-500">{transfer.id}</p>
        </div>
      </div>

      {/* Transfer info */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Produkt</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">SKU</span>
          <span className="text-gray-800 font-mono text-xs">{product.sku}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Množství</span>
          <span className="text-gray-800 font-semibold">{transfer.quantity} ks</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Vytvořeno</span>
          <span className="text-gray-800">{createdDate}</span>
        </div>
      </div>

      {/* Stores comparison */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Source */}
        <div className="bg-orange-50 rounded-xl border border-orange-200 p-3">
          <p className="text-[10px] font-semibold text-orange-600 uppercase mb-1">Zdroj</p>
          <p className="text-sm font-medium text-gray-900">{getStoreName(transfer.sourceStoreId)}</p>
          <p className="text-xs text-gray-600">
            Vedoucí: {sourceManager?.name ?? '—'}
          </p>
          <p className="text-xs text-gray-600 mt-1">ATP: {sourceAtp} ks</p>
        </div>
        {/* Target */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-3">
          <p className="text-[10px] font-semibold text-blue-600 uppercase mb-1">Cíl</p>
          <p className="text-sm font-medium text-gray-900">{getStoreName(transfer.targetStoreId)}</p>
          <p className="text-xs text-gray-600">
            Vedoucí: {targetManager?.name ?? '—'}
          </p>
          <p className="text-xs text-gray-600 mt-1">ATP: {targetAtp} ks</p>
        </div>
      </div>

      {/* Dispute details */}
      <div className="bg-red-50 rounded-xl border border-red-200 p-4 mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-red-600">Původní důvod přesunu</span>
          <span className="text-gray-800">{reasonLabels[transfer.reason] ?? transfer.reason}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-red-600">Důvod zamítnutí</span>
          <span className="text-gray-800 font-medium">
            {transfer.disputeReason
              ? disputeReasonLabels[transfer.disputeReason]
              : '—'}
          </span>
        </div>
        {transfer.disputeText && (
          <div className="text-sm">
            <span className="text-red-600">Komentář: </span>
            <span className="text-gray-800">{transfer.disputeText}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-red-600">Zadal přesun</span>
          <span className="text-gray-800">{getUserName(transfer.createdBy)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-3 mt-6">
        <button
          onClick={handleForceTransfer}
          className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 text-white text-base font-semibold rounded-xl active:bg-green-700 transition"
        >
          <Gavel size={20} />
          Vynutit přesun
        </button>
        <button
          onClick={handleConfirmRejection}
          className="w-full flex items-center justify-center gap-2 py-4 bg-gray-500 text-white text-base font-semibold rounded-xl active:bg-gray-600 transition"
        >
          <Ban size={20} />
          Potvrdit zamítnutí
        </button>
      </div>
    </div>
  );
}
