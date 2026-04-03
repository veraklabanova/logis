'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ArrowLeft, Camera, CheckCircle, Keyboard } from 'lucide-react';

export default function ScanScreen() {
  const { navigate } = useAppStore();
  const [showManualInput, setShowManualInput] = useState(false);
  const [ean, setEan] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmitEan = () => {
    if (ean.trim().length === 0) return;
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setEan('');
      setShowManualInput(false);
    }, 2500);
  };

  return (
    <div className="pt-16 pb-24 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('dashboard')} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-semibold text-gray-900">Sken EAN</h1>
      </div>

      {/* Camera placeholder */}
      <div className="bg-gray-200 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center mb-4">
        <Camera size={48} className="text-gray-400 mb-3" />
        <p className="text-sm text-gray-500">Namirte na carovy kod</p>
        <p className="text-xs text-gray-400 mt-1">Kamera neni v prototypu dostupna</p>
      </div>

      {/* Confirmed state */}
      {confirmed && (
        <div className="bg-green-50 border border-green-300 rounded-xl p-4 mb-4 flex items-center gap-3">
          <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-green-800">OK - nalozeni potvrzeno</p>
            <p className="text-xs text-green-600">EAN: {ean || '—'}</p>
          </div>
        </div>
      )}

      {/* Manual input toggle */}
      {!showManualInput ? (
        <button
          onClick={() => setShowManualInput(true)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition"
        >
          <Keyboard size={18} />
          Zadat EAN rucne
        </button>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <label className="block text-xs font-medium text-gray-600">
            EAN kod
          </label>
          <input
            type="text"
            value={ean}
            onChange={e => setEan(e.target.value)}
            placeholder="Zadejte EAN..."
            className="w-full px-3 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmitEan}
              disabled={ean.trim().length === 0}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition ${
                ean.trim().length > 0
                  ? 'bg-blue-600 text-white active:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Potvrdit
            </button>
            <button
              onClick={() => {
                setShowManualInput(false);
                setEan('');
              }}
              className="flex-1 py-2.5 text-sm text-gray-600 bg-gray-100 rounded-xl"
            >
              Zrusit
            </button>
          </div>
        </div>
      )}

      {/* Info banner */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2.5">
        <p className="text-xs text-yellow-800">
          <span className="font-semibold">Prototyp:</span> Sken caroveho kodu
          je simulovany. V produkcni verzi bude vyuzita kamera zarizeni.
        </p>
      </div>
    </div>
  );
}
