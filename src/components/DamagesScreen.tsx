'use client';
import { useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import {
  damageReports, products, getProduct, getStoreName,
  getUserName,
} from '@/lib/data';
import { ArrowLeft, Plus, CheckCircle, X, AlertTriangle } from 'lucide-react';
import { DamageType } from '@/lib/types';

const damageTypeLabels: Record<DamageType, string> = {
  mechanical: 'Mechanické',
  manufacturing: 'Výrobní vada',
  packaging: 'Obal',
  other: 'Jiné',
};

const damageTypeOptions: { value: DamageType; label: string }[] = [
  { value: 'mechanical', label: 'Mechanické poškození' },
  { value: 'manufacturing', label: 'Výrobní vada' },
  { value: 'packaging', label: 'Poškozený obal' },
  { value: 'other', label: 'Jiné' },
];

export default function DamagesScreen() {
  const { currentUser, navigate } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [formProductQuery, setFormProductQuery] = useState('');
  const [formProductId, setFormProductId] = useState('');
  const [formQuantity, setFormQuantity] = useState(1);
  const [formType, setFormType] = useState<DamageType>('mechanical');
  const [formDescription, setFormDescription] = useState('');

  const storeId = currentUser?.storeId ?? '';

  const myDamages = useMemo(() => {
    return damageReports
      .filter(d => d.storeId === storeId)
      .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());
  }, [storeId]);

  const productSuggestions = useMemo(() => {
    if (formProductQuery.length < 2) return [];
    const q = formProductQuery.toLowerCase();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.ean.includes(q)
    ).slice(0, 5);
  }, [formProductQuery]);

  const handleResolve = (dmgId: string) => {
    if (!confirm('Označit vadu jako vyřešenou?')) return;
    alert('Vada označena jako vyřešena.');
  };

  const handleSubmitDamage = () => {
    if (!formProductId || formDescription.trim().length === 0) return;
    const product = getProduct(formProductId);
    alert(
      `Vada nahlášena!\n\nProdukt: ${product?.name}\nTyp: ${damageTypeLabels[formType]}\nPopis: ${formDescription}`
    );
    setShowForm(false);
    setFormProductQuery('');
    setFormProductId('');
    setFormQuantity(1);
    setFormType('mechanical');
    setFormDescription('');
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  return (
    <div className="pt-16 pb-24 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('dashboard')} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-semibold text-gray-900">Evidence vad</h1>
      </div>

      {/* Damage form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Nová vada</h3>
            <button onClick={() => setShowForm(false)}>
              <X size={18} className="text-gray-400" />
            </button>
          </div>

          {/* Product search */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Produkt
            </label>
            {formProductId ? (
              <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-sm text-gray-800">
                  {getProduct(formProductId)?.name}
                </span>
                <button onClick={() => { setFormProductId(''); setFormProductQuery(''); }}>
                  <X size={14} className="text-gray-400" />
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={formProductQuery}
                  onChange={e => setFormProductQuery(e.target.value)}
                  placeholder="Hledat produkt..."
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {productSuggestions.length > 0 && (
                  <div className="mt-1 bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                    {productSuggestions.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setFormProductId(p.id);
                          setFormProductQuery(p.name);
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        {p.name} <span className="text-xs text-gray-400">{p.sku}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Množství
            </label>
            <input
              type="number"
              min={1}
              value={formQuantity}
              onChange={e => setFormQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Typ vady
            </label>
            <select
              value={formType}
              onChange={e => setFormType(e.target.value as DamageType)}
              className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {damageTypeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Popis *
            </label>
            <textarea
              value={formDescription}
              onChange={e => setFormDescription(e.target.value)}
              placeholder="Popište vadu..."
              rows={3}
              className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <button
            onClick={handleSubmitDamage}
            disabled={!formProductId || formDescription.trim().length === 0}
            className={`w-full py-2.5 text-sm font-semibold rounded-xl transition ${
              formProductId && formDescription.trim().length > 0
                ? 'bg-blue-600 text-white active:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Nahlásit vadu
          </button>
        </div>
      )}

      {/* Damage list */}
      {myDamages.length === 0 && !showForm ? (
        <div className="text-center py-12">
          <AlertTriangle size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Žádné evidované vady</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myDamages.map(dmg => {
            const product = getProduct(dmg.productId);
            return (
              <div
                key={dmg.id}
                className={`bg-white rounded-xl border p-3 ${
                  dmg.resolved ? 'border-gray-200 opacity-60' : 'border-orange-200'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {product?.name ?? '—'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product?.sku} | {product?.ean}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-2 ${
                      dmg.resolved
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {dmg.resolved ? 'Vyřešeno' : 'Otevřená'}
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-0.5 mt-2">
                  <p>
                    <span className="text-gray-400">Množství:</span> {dmg.quantity} ks
                  </p>
                  <p>
                    <span className="text-gray-400">Typ:</span>{' '}
                    {damageTypeLabels[dmg.damageType]}
                  </p>
                  <p>
                    <span className="text-gray-400">Popis:</span> {dmg.description}
                  </p>
                  <p>
                    <span className="text-gray-400">Datum:</span>{' '}
                    {formatDate(dmg.reportedAt)}
                  </p>
                </div>
                {!dmg.resolved && (
                  <button
                    onClick={() => handleResolve(dmg.id)}
                    className="mt-2 flex items-center gap-1 text-xs text-green-700 font-medium bg-green-50 px-3 py-1.5 rounded-lg"
                  >
                    <CheckCircle size={14} />
                    Vada vyřešena
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* FAB */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-24 right-4 max-w-md w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center active:bg-blue-700 transition z-40"
        >
          <Plus size={24} />
        </button>
      )}
    </div>
  );
}
