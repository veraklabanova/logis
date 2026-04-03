'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { getProduct, getStoreName, calculateATP } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';
import { TransferReason } from '@/lib/types';

const reasonOptions: { value: TransferReason; label: string }[] = [
  { value: 'customer_waiting', label: 'Zákazník čeká' },
  { value: 'restock', label: 'Doplnění skladu' },
  { value: 'other', label: 'Jiné' },
];

export default function TransferForm() {
  const { currentUser, selectedProductId, selectedStoreId, navigate } = useAppStore();
  const product = selectedProductId ? getProduct(selectedProductId) : null;
  const sourceStoreId = selectedStoreId ?? '';
  const targetStoreId = currentUser?.storeId ?? '';
  const sourceAtp = product ? calculateATP(product.id, sourceStoreId) : 0;

  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState<TransferReason>('customer_waiting');
  const [note, setNote] = useState('');

  const isValid = quantity > 0 && quantity <= sourceAtp;

  const handleSubmit = () => {
    if (!isValid) return;
    alert(
      `Požadavek odeslán!\n\nProdukt: ${product?.name}\nZ: ${getStoreName(sourceStoreId)}\nDo: ${getStoreName(targetStoreId)}\nMnožství: ${quantity}\nDůvod: ${reasonOptions.find(r => r.value === reason)?.label}`
    );
    navigate('dashboard');
  };

  if (!product || !currentUser) {
    return (
      <div className="pt-16 pb-24 px-4 max-w-md mx-auto text-center py-12">
        <p className="text-gray-400 text-sm">Produkt nenalezen</p>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-24 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('search')} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-base font-semibold text-gray-900">Nový požadavek na přesun</h1>
        </div>
      </div>

      {/* Read-only info */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 mb-4 space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Produkt</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">SKU</span>
          <span className="text-gray-800 font-mono text-xs">{product.sku}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Zdrojová prodejna</span>
          <span className="text-gray-800 font-medium">{getStoreName(sourceStoreId)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">ATP na zdroji</span>
          <span className="text-gray-800 font-semibold">{sourceAtp} ks</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Cílová prodejna</span>
          <span className="text-blue-700 font-medium">{getStoreName(targetStoreId)}</span>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Quantity */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Množství (max {sourceAtp})
          </label>
          <input
            type="number"
            min={1}
            max={sourceAtp}
            value={quantity}
            onChange={e =>
              setQuantity(Math.min(sourceAtp, Math.max(1, Number(e.target.value))))
            }
            className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Důvod přesunu
          </label>
          <select
            value={reason}
            onChange={e => setReason(e.target.value as TransferReason)}
            className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {reasonOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Note */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Poznámka
          </label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Nepovinné..."
            rows={2}
            className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5">
          <p className="text-xs text-blue-800">
            Požadavek bude odeslán vedoucímu zdrojové prodejny ke schválení.
            Přesuny potvrzené do 14:00 jsou zařazeny na dnešní manifest řidiče.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 space-y-2">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-3 text-sm font-semibold rounded-xl transition ${
            isValid
              ? 'bg-orange-500 text-white active:bg-orange-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Odeslat požadavek
        </button>
        <button
          onClick={() => navigate('search')}
          className="w-full py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
        >
          Zrušit
        </button>
      </div>
    </div>
  );
}
