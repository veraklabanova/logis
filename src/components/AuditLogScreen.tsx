'use client';
import { useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { auditEntries, getRoleLabel } from '@/lib/data';
import { ArrowLeft, ClipboardList } from 'lucide-react';

type FilterType = 'all' | 'approval' | 'rejection' | 'transfer' | 'damage';

const filterChips: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Vsechny' },
  { value: 'approval', label: 'Schvaleni' },
  { value: 'rejection', label: 'Zamitnuti' },
  { value: 'transfer', label: 'Presuny' },
  { value: 'damage', label: 'Vady' },
];

const categoryColors: Record<string, string> = {
  approval: 'bg-green-100 text-green-700',
  rejection: 'bg-red-100 text-red-700',
  transfer: 'bg-orange-100 text-orange-700',
  damage: 'bg-yellow-100 text-yellow-800',
  system: 'bg-gray-100 text-gray-600',
};

export default function AuditLogScreen() {
  const { navigate } = useAppStore();
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = useMemo(() => {
    let entries = [...auditEntries];
    if (filter !== 'all') {
      entries = entries.filter(e => e.category === filter);
    }
    return entries.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [filter]);

  const formatDateTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="pt-16 pb-24 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('dashboard')} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-semibold text-gray-900">Audit log</h1>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {filterChips.map(chip => (
          <button
            key={chip.value}
            onClick={() => setFilter(chip.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition ${
              filter === chip.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Audit entries */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <ClipboardList size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Zadne zaznamy</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(entry => (
            <div
              key={entry.id}
              className="bg-white rounded-xl border border-gray-200 p-3"
            >
              <div className="flex items-start justify-between mb-1">
                <span className="text-[10px] text-gray-400">
                  {formatDateTime(entry.timestamp)}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    categoryColors[entry.category] ?? 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {entry.action}
                </span>
              </div>
              <p className="text-sm text-gray-900 mb-1">{entry.details}</p>
              <div className="flex flex-wrap gap-x-3 text-xs text-gray-500">
                <span>
                  {entry.userName}{' '}
                  <span className="text-gray-400">
                    ({getRoleLabel(entry.userRole)})
                  </span>
                </span>
                {entry.productSku && (
                  <span className="font-mono">{entry.productSku}</span>
                )}
                {entry.storeName && <span>{entry.storeName}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
