'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { getProduct, getStoreName, calculateATP } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const dow = result.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return result;
}

export default function ReservationForm() {
  const { currentUser, selectedProductId, navigate } = useAppStore();
  const product = selectedProductId ? getProduct(selectedProductId) : null;
  const storeId = currentUser?.storeId ?? '';
  const atp = product ? calculateATP(product.id, storeId) : 0;

  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [note, setNote] = useState('');

  const expirationDate = addBusinessDays(new Date(), 1);
  const expirationStr = expirationDate.toLocaleDateString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const isValid =
    customerName.trim().length > 0 &&
    customerPhone.trim().length > 0 &&
    quantity > 0 &&
    quantity <= atp;

  const handleSubmit = () => {
    if (!isValid) return;
    alert(
      `Rezervace vytvorena!\n\nProdukt: ${product?.name}\nZakaznik: ${customerName}\nMnozstvi: ${quantity}\nPlati do: ${expirationStr}`
    );
    navigate('my-reservations');
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
          <h1 className="text-base font-semibold text-gray-900">Nova rezervace</h1>
          <p className="text-xs text-gray-500">{product.name}</p>
        </div>
      </div>

      {/* Read-only info */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 mb-4 space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Prodejna</span>
          <span className="text-gray-800 font-medium">{getStoreName(storeId)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">EAN</span>
          <span className="text-gray-800 font-mono text-xs">{product.ean}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Dostupne (ATP)</span>
          <span className="text-gray-800 font-semibold">{atp} ks</span>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Quantity */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Mnozstvi
          </label>
          <input
            type="number"
            min={1}
            max={atp}
            value={quantity}
            onChange={e => setQuantity(Math.min(atp, Math.max(1, Number(e.target.value))))}
            className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Customer name */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Jmeno zakaznika *
          </label>
          <input
            type="text"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            placeholder="Jan Novak"
            className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Telefon *
          </label>
          <input
            type="tel"
            value={customerPhone}
            onChange={e => setCustomerPhone(e.target.value)}
            placeholder="+420 600 000 000"
            className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Poznamka
          </label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Nepovinne..."
            rows={2}
            className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        {/* Expiration info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2.5">
          <p className="text-xs text-yellow-800">
            <span className="font-semibold">Plati do:</span> {expirationStr}
          </p>
          <p className="text-[10px] text-yellow-600 mt-0.5">
            Rezervace je platna 1 pracovni den od vytvoreni.
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
              ? 'bg-blue-600 text-white active:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Rezervovat
        </button>
        <button
          onClick={() => navigate('search')}
          className="w-full py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
        >
          Zrusit
        </button>
      </div>
    </div>
  );
}
