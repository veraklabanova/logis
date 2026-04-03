'use client';
import { useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import {
  products, stores, stockEntries, reservations, damageReports,
  calculateATP, getATPColor, getATPBgColor, getStoreShortName,
} from '@/lib/data';
import { Product } from '@/lib/types';
import { Search, ScanBarcode, ArrowLeft, ShoppingCart, Truck } from 'lucide-react';

export default function SearchScreen() {
  const { currentUser, navigate, selectProduct } = useAppStore();
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const suggestions = useMemo(() => {
    if (query.length < 3) return [];
    const q = query.toLowerCase();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.ean.includes(q)
    );
  }, [query]);

  const storeRows = useMemo(() => {
    if (!selectedProduct) return [];
    return stores
      .map(store => {
        const stock = stockEntries.find(
          s => s.productId === selectedProduct.id && s.storeId === store.id
        );
        const erpStock = stock?.erpStock ?? 0;
        const reserved = reservations
          .filter(
            r =>
              r.productId === selectedProduct.id &&
              r.storeId === store.id &&
              r.status === 'ACTIVE'
          )
          .reduce((sum, r) => sum + r.quantity, 0);
        const damaged = damageReports
          .filter(
            d =>
              d.productId === selectedProduct.id &&
              d.storeId === store.id &&
              !d.resolved
          )
          .reduce((sum, d) => sum + d.quantity, 0);
        const atp = calculateATP(selectedProduct.id, store.id);
        return { store, erpStock, reserved, damaged, atp };
      })
      .sort((a, b) => b.atp - a.atp);
  }, [selectedProduct]);

  const [expandedStoreId, setExpandedStoreId] = useState<string | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuery(product.name);
    setExpandedStoreId(null);
  };

  const handleBack = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
      setQuery('');
      setExpandedStoreId(null);
    } else {
      navigate('dashboard');
    }
  };

  const handleScan = () => {
    alert('Skener neni v prototypu dostupny');
  };

  const handleStoreRowTap = (storeId: string, atp: number) => {
    if (atp <= 0) return;
    setExpandedStoreId(expandedStoreId === storeId ? null : storeId);
  };

  const handleReserve = () => {
    if (!selectedProduct || !currentUser) return;
    selectProduct(selectedProduct.id, currentUser.storeId);
    navigate('reservation-form');
  };

  const handleTransfer = (sourceStoreId: string) => {
    if (!selectedProduct) return;
    selectProduct(selectedProduct.id, sourceStoreId);
    navigate('transfer-form');
  };

  const isOwnStore = (storeId: string) => currentUser?.storeId === storeId;

  return (
    <div className="pt-16 pb-24 px-4 max-w-md mx-auto">
      {/* Search bar */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={handleBack} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              if (selectedProduct) setSelectedProduct(null);
            }}
            placeholder="Nazev, kod nebo EAN..."
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
          />
        </div>
        <button
          onClick={handleScan}
          className="p-2.5 bg-blue-600 rounded-xl text-white"
        >
          <ScanBarcode size={20} />
        </button>
      </div>

      {/* Suggestions dropdown */}
      {!selectedProduct && suggestions.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 mb-4">
          {suggestions.map(p => (
            <button
              key={p.id}
              onClick={() => handleSelectProduct(p)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition"
            >
              <p className="text-sm font-medium text-gray-800">{p.name}</p>
              <p className="text-xs text-gray-500">
                {p.sku} | {p.ean}
                {p.size && ` | Vel. ${p.size}`}
                {p.color && ` | ${p.color}`}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {!selectedProduct && query.length >= 3 && suggestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">Produkt nenalezen</p>
        </div>
      )}

      {/* Product detail */}
      {selectedProduct && (
        <div>
          {/* Product info card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <h2 className="text-base font-semibold text-gray-900">
              {selectedProduct.name}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
              <span>SKU: {selectedProduct.sku}</span>
              <span>EAN: {selectedProduct.ean}</span>
              {selectedProduct.size && <span>Vel.: {selectedProduct.size}</span>}
              {selectedProduct.color && <span>Barva: {selectedProduct.color}</span>}
            </div>
          </div>

          {/* Stock table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
              <span className="text-[10px] font-semibold text-gray-500 uppercase">Pobocka</span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase text-right">ERP</span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase text-right">Rez.</span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase text-right">Vady</span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase text-right">ATP</span>
            </div>
            {storeRows.map(({ store, erpStock, reserved, damaged, atp }) => (
              <div key={store.id}>
                <button
                  onClick={() => handleStoreRowTap(store.id, atp)}
                  className={`w-full grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-2 px-3 py-2.5 border-b border-gray-100 text-left transition ${
                    isOwnStore(store.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
                  } ${atp > 0 ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <span className="text-sm text-gray-800">
                    {getStoreShortName(store.id)}
                    {isOwnStore(store.id) && (
                      <span className="text-[10px] text-blue-600 ml-1">*</span>
                    )}
                  </span>
                  <span className="text-sm text-gray-600 text-right tabular-nums">
                    {erpStock}
                  </span>
                  <span className="text-sm text-gray-600 text-right tabular-nums">
                    {reserved}
                  </span>
                  <span className="text-sm text-gray-600 text-right tabular-nums">
                    {damaged}
                  </span>
                  <span className={`text-sm text-right tabular-nums ${getATPColor(atp)}`}>
                    {atp}
                  </span>
                </button>

                {/* Expanded action row */}
                {expandedStoreId === store.id && atp > 0 && (
                  <div className={`px-3 py-3 border-b border-gray-100 ${getATPBgColor(atp)}`}>
                    {isOwnStore(store.id) ? (
                      <button
                        onClick={handleReserve}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg"
                      >
                        <ShoppingCart size={16} />
                        Rezervovat pro zakaznika
                      </button>
                    ) : (
                      <button
                        onClick={() => handleTransfer(store.id)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-lg"
                      >
                        <Truck size={16} />
                        Pozadat o presun
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
