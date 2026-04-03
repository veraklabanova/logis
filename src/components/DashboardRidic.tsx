'use client';
import { useAppStore } from '@/lib/store';
import { transferRequests, getProduct, getStoreShortName, stores } from '@/lib/data';
import { Truck, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function DashboardRidic() {
  const { navigate } = useAppStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Manifest items: APPROVED and IN_TRANSIT transfers
  const manifestItems = transferRequests.filter(
    t => ['APPROVED', 'IN_TRANSIT'].includes(t.status)
  );

  // Group by stores on route
  const storeStops = new Map<string, typeof manifestItems>();
  manifestItems.forEach(tr => {
    // Source store: LOAD
    const sourceKey = tr.sourceStoreId;
    if (!storeStops.has(sourceKey)) storeStops.set(sourceKey, []);
    storeStops.get(sourceKey)!.push(tr);
    // Target store: UNLOAD
    const targetKey = `${tr.targetStoreId}_unload`;
    if (!storeStops.has(targetKey)) storeStops.set(targetKey, []);
    storeStops.get(targetKey)!.push(tr);
  });

  const totalItems = manifestItems.length;
  const doneItems = manifestItems.filter(t => t.status === 'DELIVERED' || t.status === 'RETURNED_TO_SOURCE').length;
  const isBeforeCutoff = false; // Simulating after 07:45 for demo

  const uniqueStores = [...new Set(manifestItems.flatMap(t => [t.sourceStoreId, t.targetStoreId]))];

  return (
    <div className="space-y-4">
      {/* Date and shift status */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">14. unora 2025, patek</p>
            <p className="text-xs text-green-600 mt-0.5">Smena otevrena</p>
          </div>
          <Truck size={20} className="text-blue-500" />
        </div>
      </div>

      {/* Manifest Summary */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-800">Dnesni manifest</h2>
          <span className="text-[10px] text-gray-400">Uzamcen od 07:45</span>
        </div>

        {manifestItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Truck size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Dnes zadne presuny</p>
          </div>
        ) : (
          <>
            {/* Summary bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-3 mb-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Pobocek: {uniqueStores.length}</span>
                <span>Polozek: {totalItems}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2 transition-all"
                  style={{ width: `${totalItems > 0 ? (doneItems / totalItems) * 100 : 0}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">{doneItems} z {totalItems} vyrizeno</p>
            </div>

            {/* Store accordion */}
            <div className="space-y-2">
              {uniqueStores.map((storeId, idx) => {
                const store = stores.find(s => s.id === storeId);
                const loads = manifestItems.filter(t => t.sourceStoreId === storeId);
                const unloads = manifestItems.filter(t => t.targetStoreId === storeId);
                const isExpanded = expanded === storeId;

                return (
                  <div key={storeId} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setExpanded(isExpanded ? null : storeId)}
                      className="w-full px-4 py-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center justify-center font-semibold">
                          {idx + 1}
                        </span>
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">{store?.name}</p>
                          <p className="text-[10px] text-gray-400">{store?.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {loads.length > 0 && (
                          <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">
                            &uarr; {loads.length}
                          </span>
                        )}
                        {unloads.length > 0 && (
                          <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                            &darr; {unloads.length}
                          </span>
                        )}
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-gray-100 px-4 py-2 space-y-2">
                        {loads.map(tr => {
                          const product = getProduct(tr.productId);
                          return (
                            <div key={`load-${tr.id}`} className="flex items-center justify-between py-1">
                              <div>
                                <p className="text-xs text-gray-800">{product?.name} <span className="text-gray-400">{product?.sku}</span></p>
                                <p className="text-[10px] text-gray-500">{tr.quantity} ks &middot; EAN: {product?.ean}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded">NALOZIT</span>
                                <span className="text-[10px] text-gray-400">
                                  {tr.status === 'IN_TRANSIT' ? '●' : '○'} {tr.status === 'IN_TRANSIT' ? 'Hotovo' : 'Ceka'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                        {unloads.map(tr => {
                          const product = getProduct(tr.productId);
                          return (
                            <div key={`unload-${tr.id}`} className="flex items-center justify-between py-1">
                              <div>
                                <p className="text-xs text-gray-800">{product?.name} <span className="text-gray-400">{product?.sku}</span></p>
                                <p className="text-[10px] text-gray-500">{tr.quantity} ks &middot; EAN: {product?.ean}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded">VYLOZIT</span>
                                <span className="text-[10px] text-gray-400">○ Ceka</span>
                              </div>
                            </div>
                          );
                        })}
                        <button
                          onClick={() => navigate('scan')}
                          className="w-full mt-1 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition"
                        >
                          Skenovat
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Close shift button */}
            <div className="mt-4">
              {doneItems < totalItems ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                  <p className="text-xs text-red-600">Nelze uzavrit — {totalItems - doneItems} polozek zbyva</p>
                  <button disabled className="mt-2 w-full py-2.5 bg-gray-300 text-gray-500 text-sm font-medium rounded-xl cursor-not-allowed">
                    Uzavrit smenu
                  </button>
                </div>
              ) : (
                <button className="w-full py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition">
                  Uzavrit smenu
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
