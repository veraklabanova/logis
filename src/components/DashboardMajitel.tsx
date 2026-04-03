'use client';
import { useAppStore } from '@/lib/store';
import {
  transferRequests, stores, products, getProduct, getStoreShortName, getUserName,
  calculateATP, getATPColor, getATPBgColor, getStatusColor, getStatusLabel
} from '@/lib/data';
import { Scale, ChevronRight, BarChart3 } from 'lucide-react';

export default function DashboardMajitel() {
  const { navigate, selectTransfer } = useAppStore();

  const pendingArbitrages = transferRequests.filter(t => t.status === 'DISPUTED');

  const deliveredToday = transferRequests.filter(t => t.status === 'DELIVERED').length;
  const returnedToday = transferRequests.filter(t => t.status === 'RETURNED_TO_SOURCE').length;
  const pendingCount = transferRequests.filter(t => ['REQUESTED', 'APPROVED', 'IN_TRANSIT'].includes(t.status)).length;

  // ATP grid: stores x category (just Obuv in MVP)
  const atpData = stores.map(store => {
    const totalATP = products.reduce((sum, p) => sum + calculateATP(p.id, store.id), 0);
    return { store, totalATP };
  });

  return (
    <div className="space-y-4">
      {/* Pending Arbitrages */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-800">
            Cekajici arbitraze
            {pendingArbitrages.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {pendingArbitrages.length}
              </span>
            )}
          </h2>
        </div>

        {pendingArbitrages.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <Scale size={24} className="text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-400">Zadne spory k reseni</p>
          </div>
        ) : (
          <div className="space-y-2">
            {pendingArbitrages.map(tr => {
              const product = getProduct(tr.productId);
              const disputeLabels: Record<string, string> = {
                last_piece: 'Posledni kus na prodejne',
                reserved_local: 'Rezervovano pro mistniho zakaznika',
                damaged: 'Zbozi poskozene',
                other: 'Jiny duvod',
              };
              return (
                <button
                  key={tr.id}
                  onClick={() => { selectTransfer(tr.id); navigate('arbitrage-detail'); }}
                  className="w-full bg-white rounded-xl border border-red-200 bg-red-50 p-3 text-left hover:border-red-400 transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {getStoreShortName(tr.targetStoreId)} &larr; {getStoreShortName(tr.sourceStoreId)}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {product?.name} &middot; {tr.quantity} ks
                      </p>
                      <p className="text-[10px] text-red-600 mt-0.5">
                        Duvod: {tr.disputeReason ? disputeLabels[tr.disputeReason] : 'Neuvedeno'}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Od zamitnuti: {new Date(tr.createdAt).toLocaleString('cs')}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ATP Network Overview */}
      <section>
        <h2 className="text-sm font-semibold text-gray-800 mb-2">ATP prehled site</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50 px-3 py-2">
            <span className="text-[10px] font-semibold text-gray-500">Pobocka</span>
            <span className="text-[10px] font-semibold text-gray-500 text-center">Obuv</span>
            <span className="text-[10px] font-semibold text-gray-500 text-right">ATP celkem</span>
          </div>
          {atpData.map(({ store, totalATP }) => (
            <div key={store.id} className={`grid grid-cols-3 px-3 py-2.5 border-b border-gray-50 ${getATPBgColor(totalATP)}`}>
              <span className="text-xs text-gray-800">{store.shortName}</span>
              <span className="text-xs text-center text-gray-500">Obuv</span>
              <span className={`text-xs text-right ${getATPColor(totalATP)}`}>{totalATP}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Stats */}
      <section>
        <h2 className="text-sm font-semibold text-gray-800 mb-2">Denni statistika</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
            <p className="text-lg font-bold text-green-600">{deliveredToday}</p>
            <p className="text-[10px] text-gray-500">Doruceno</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
            <p className="text-lg font-bold text-orange-600">{returnedToday}</p>
            <p className="text-[10px] text-gray-500">Vraceno</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
            <p className="text-lg font-bold text-blue-600">{pendingCount}</p>
            <p className="text-[10px] text-gray-500">Cekajici</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-3 mt-2">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-gray-400" />
            <span className="text-xs text-gray-600">Prumerny cas arbitraze: <strong className="text-gray-900">3.2 hod</strong></span>
          </div>
        </div>
      </section>
    </div>
  );
}
