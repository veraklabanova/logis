'use client';
import { useAppStore } from '@/lib/store';
import {
  reservations, transferRequests, getProduct, getStoreShortName,
  getStatusLabel, getStatusColor
} from '@/lib/data';
import { Clock, ChevronRight, Package, CheckCircle } from 'lucide-react';

export default function DashboardVedouci() {
  const { currentUser, navigate, selectTransfer, selectReservation } = useAppStore();
  if (!currentUser) return null;

  const isVedouci = currentUser.role === 'vedouci';
  const storeId = currentUser.storeId;

  const activeReservations = reservations.filter(
    r => r.storeId === storeId && r.status === 'ACTIVE'
  );

  const pendingApprovals = transferRequests.filter(
    t => t.sourceStoreId === storeId && t.status === 'REQUESTED'
  );

  const recentActivity = transferRequests
    .filter(t => (t.sourceStoreId === storeId || t.targetStoreId === storeId) &&
      ['DELIVERED', 'RETURNED_TO_SOURCE', 'CLOSED'].includes(t.status))
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Active Reservations */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-800">
            Aktivni rezervace
            {activeReservations.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                {activeReservations.length}
              </span>
            )}
          </h2>
          <button onClick={() => navigate('my-reservations')} className="text-xs text-blue-600">
            Vse
          </button>
        </div>

        {activeReservations.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <Package size={24} className="text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-400">Zadne aktivni rezervace</p>
          </div>
        ) : (
          <div className="space-y-2">
            {activeReservations.map(res => {
              const product = getProduct(res.productId);
              return (
                <button
                  key={res.id}
                  onClick={() => { selectReservation(res.id); navigate('reservation-detail'); }}
                  className="w-full bg-white rounded-xl border border-gray-200 p-3 text-left hover:border-blue-300 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product?.name} <span className="text-gray-400 text-xs">{product?.sku}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{res.quantity} ks &middot; {res.customerName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock size={12} className="text-yellow-500" />
                        <span className="text-[10px] text-yellow-600">
                          Expiruje: {new Date(res.expiresAt).toLocaleDateString('cs')} {new Date(res.expiresAt).toLocaleTimeString('cs', {hour:'2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(res.status)}`}>
                      {getStatusLabel(res.status)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Pending Approvals (only vedouci) */}
      {isVedouci && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-800">
              Ke schvaleni
              {pendingApprovals.length > 0 && (
                <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                  {pendingApprovals.length}
                </span>
              )}
            </h2>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <CheckCircle size={24} className="text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400">Zadne cekajici pozadavky</p>
            </div>
          ) : (
            <div className="space-y-2">
              {pendingApprovals.map(tr => {
                const product = getProduct(tr.productId);
                return (
                  <button
                    key={tr.id}
                    onClick={() => { selectTransfer(tr.id); navigate('approval-detail'); }}
                    className="w-full bg-white rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-left hover:border-yellow-400 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {getStoreShortName(tr.targetStoreId)} &rarr; moje pobocka
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {product?.name} &middot; {tr.quantity} ks
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {new Date(tr.createdAt).toLocaleString('cs')}
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
      )}

      {/* Recent Activity */}
      <section>
        <h2 className="text-sm font-semibold text-gray-800 mb-2">Posledni aktivita</h2>
        {recentActivity.length === 0 ? (
          <p className="text-xs text-gray-400 bg-white rounded-xl border p-4 text-center">Zadna nedavna aktivita</p>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {recentActivity.map(tr => {
              const product = getProduct(tr.productId);
              return (
                <div key={tr.id} className="px-3 py-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-700">{product?.sku}</span>
                    <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${getStatusColor(tr.status)}`}>
                      {getStatusLabel(tr.status)}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {new Date(tr.createdAt).toLocaleDateString('cs')}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
