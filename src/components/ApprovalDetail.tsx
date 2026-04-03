'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  transferRequests, getProduct, getStoreName, getUserName,
  calculateATP,
} from '@/lib/data';
import { ArrowLeft, Check, X } from 'lucide-react';
import { DisputeReason } from '@/lib/types';

const disputeReasons: { value: DisputeReason; label: string }[] = [
  { value: 'last_piece', label: 'Posledni kus' },
  { value: 'reserved_local', label: 'Rezervovano pro mistniho' },
  { value: 'damaged', label: 'Zbozi poskozene' },
  { value: 'other', label: 'Jine' },
];

export default function ApprovalDetail() {
  const { currentUser, selectedTransferId, navigate } = useAppStore();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<DisputeReason>('last_piece');

  const transfer = transferRequests.find(t => t.id === selectedTransferId);
  const product = transfer ? getProduct(transfer.productId) : null;
  const myStoreAtp = transfer && currentUser
    ? calculateATP(transfer.productId, currentUser.storeId)
    : 0;

  if (!transfer || !product || !currentUser) {
    return (
      <div className="pt-16 pb-24 px-4 max-w-md mx-auto text-center py-12">
        <p className="text-gray-400 text-sm">Pozadavek nenalezen</p>
      </div>
    );
  }

  const handleApprove = () => {
    alert('Sken EAN potvrzen — presun schvalen!\n\nProdukt: ' + product.name);
    navigate('dashboard');
  };

  const handleReject = () => {
    setShowRejectModal(false);
    alert(
      `Pozadavek zamitnut.\nDuvod: ${disputeReasons.find(r => r.value === selectedReason)?.label}\n\nSpor eskalovan na majitele.`
    );
    navigate('dashboard');
  };

  return (
    <div className="pt-16 pb-24 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('dashboard')} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-semibold text-gray-900">Schvaleni presunu</h1>
      </div>

      {/* Transfer info */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Pozadavek</span>
          <span className="text-gray-800 font-mono text-xs">{transfer.id}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Produkt</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">SKU</span>
          <span className="text-gray-800 font-mono text-xs">{product.sku}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Mnozstvi</span>
          <span className="text-gray-800 font-semibold">{transfer.quantity} ks</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Zadajici prodejna</span>
          <span className="text-gray-800">{getStoreName(transfer.targetStoreId)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Zadal</span>
          <span className="text-gray-800">{getUserName(transfer.createdBy)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Duvod</span>
          <span className="text-gray-800">
            {transfer.reason === 'customer_waiting'
              ? 'Zakaznik ceka'
              : transfer.reason === 'restock'
              ? 'Doplneni skladu'
              : 'Jine'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">ATP na moji prodejne</span>
          <span className="text-gray-800 font-semibold">{myStoreAtp} ks</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-3 mt-6">
        <button
          onClick={handleApprove}
          className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 text-white text-base font-semibold rounded-xl active:bg-green-700 transition"
        >
          <Check size={20} />
          Schvalit
        </button>
        <button
          onClick={() => setShowRejectModal(true)}
          className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 text-white text-base font-semibold rounded-xl active:bg-red-700 transition"
        >
          <X size={20} />
          Zamitnout
        </button>
      </div>

      {/* Reject reason modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="bg-white rounded-t-2xl w-full max-w-md p-4 pb-8">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Duvod zamitnuti
            </h3>
            <div className="space-y-2 mb-4">
              {disputeReasons.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedReason(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                    selectedReason === opt.value
                      ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                      : 'border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <button
                onClick={handleReject}
                className="w-full py-3 bg-red-600 text-white text-sm font-semibold rounded-xl"
              >
                Potvrdit zamitnuti
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="w-full py-3 text-sm text-gray-600 bg-gray-100 rounded-xl"
              >
                Zpet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
