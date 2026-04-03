'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { users, stores, getRoleLabel } from '@/lib/data';
import { Package } from 'lucide-react';

export default function LoginScreen() {
  const login = useAppStore(s => s.login);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  // Store groups for 2x3 grid (only store staff)
  const storeGroups = stores.map(store => ({
    store,
    users: users.filter(u => u.storeId === store.id && u.role !== 'ridic' && u.role !== 'majitel'),
  }));

  const drivers = users.filter(u => u.role === 'ridic');
  const owners = users.filter(u => u.role === 'majitel');

  const handlePinInput = useCallback((digit: string) => {
    if (locked) return;
    setPin(prev => {
      const newPin = prev + digit;
      setError('');

      if (newPin.length === 4) {
        const user = users.find(u => u.id === selectedUserId);
        if (user && user.pin === newPin) {
          // Delay login slightly so state updates cleanly
          setTimeout(() => login(user), 50);
        } else {
          setAttempts(prev => {
            const newAttempts = prev + 1;
            if (newAttempts >= 5) {
              setLocked(true);
              setError('Účet zamčen na 5 minut');
              setTimeout(() => { setLocked(false); setAttempts(0); }, 300000);
            } else {
              setError('Nesprávný PIN');
            }
            return newAttempts;
          });
          return '';
        }
      }

      return newPin.length <= 4 ? newPin : prev;
    });
  }, [locked, selectedUserId, login]);

  const handleBackspace = useCallback(() => {
    setPin(prev => prev.slice(0, -1));
  }, []);

  // Keyboard support for numeric input
  useEffect(() => {
    if (!selectedUserId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handlePinInput(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        setSelectedUserId(null);
        setPin('');
        setError('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedUserId, handlePinInput, handleBackspace]);

  const roleTag = (role: string) => {
    const colors: Record<string, string> = {
      vedouci: 'bg-blue-100 text-blue-700',
      prodavac: 'bg-gray-100 text-gray-600',
      ridic: 'bg-orange-100 text-orange-700',
      majitel: 'bg-purple-100 text-purple-700',
    };
    return (
      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${colors[role] ?? 'bg-gray-100'}`}>
        {getRoleLabel(role)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Logo */}
      <div className="pt-10 pb-6 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Package size={32} className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Logis</h1>
        <p className="text-xs text-gray-500 mt-1">Interní logistika a rezervace</p>
      </div>

      {!selectedUserId ? (
        /* User Selection */
        <div className="px-4 pb-32">
          {/* 2x3 Grid of Stores */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {storeGroups.map(({ store, users: storeUsers }) => (
              <div key={store.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-3 py-1.5 border-b border-gray-100">
                  <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{store.shortName}</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {storeUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => { setSelectedUserId(user.id); setPin(''); setError(''); }}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition"
                    >
                      <span className="text-xs text-gray-800 truncate">{user.name}</span>
                      {roleTag(user.role)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Drivers + Management row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Drivers */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-orange-50 px-3 py-1.5 border-b border-orange-100">
                <h3 className="text-[10px] font-semibold text-orange-600 uppercase tracking-wider">Řidiči</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {drivers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => { setSelectedUserId(user.id); setPin(''); setError(''); }}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition"
                  >
                    <span className="text-xs text-gray-800">{user.name}</span>
                    {roleTag(user.role)}
                  </button>
                ))}
              </div>
            </div>

            {/* Management / Owner */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-purple-50 px-3 py-1.5 border-b border-purple-100">
                <h3 className="text-[10px] font-semibold text-purple-600 uppercase tracking-wider">Vedení</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {owners.map(user => (
                  <button
                    key={user.id}
                    onClick={() => { setSelectedUserId(user.id); setPin(''); setError(''); }}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition"
                  >
                    <span className="text-xs text-gray-800">{user.name}</span>
                    {roleTag(user.role)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Yellow Prototype Banner with PIN info */}
          <div className="mt-6 mb-8 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
            <p className="text-xs text-yellow-800 mb-2">
              <span className="font-bold">Prototyp:</span>{' '}
              Toto je funkční prototyp pro demonstraci UI/UX. Data jsou fiktivní (do 15.2.2025).
              Přepínejte role pomocí seznamu uživatelů pro zobrazení různých pohledů.
            </p>
            <div className="border-t border-yellow-200 pt-2 mt-2">
              <p className="text-[10px] font-semibold text-yellow-700 mb-1">PIN pro testování:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px] text-yellow-700">
                <span>Vedoucí: <strong className="font-mono">1234</strong></span>
                <span>Prodavač: <strong className="font-mono">1111</strong></span>
                <span>Řidič: <strong className="font-mono">5555</strong></span>
                <span>Majitel: <strong className="font-mono">9999</strong></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* PIN Input */
        <div className="px-8 text-center">
          <p className="text-sm text-gray-600 mb-1">
            {users.find(u => u.id === selectedUserId)?.name}
          </p>
          <p className="text-xs text-gray-400 mb-6">Zadejte PIN</p>

          {/* PIN dots */}
          <div className="flex justify-center gap-3 mb-4">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  pin.length > i ? 'bg-blue-600 border-blue-600 scale-110' : 'border-gray-300'
                }`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

          {/* Hint for keyboard */}
          <p className="text-[10px] text-gray-300 mb-3">Můžete použít i numerickou klávesnici</p>

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <button
                key={n}
                onClick={() => handlePinInput(String(n))}
                className="h-14 rounded-xl bg-gray-100 hover:bg-gray-200 text-lg font-medium text-gray-800 transition active:scale-95"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => { setSelectedUserId(null); setPin(''); setError(''); }}
              className="h-14 rounded-xl text-sm text-gray-500 hover:bg-gray-100 transition"
            >
              Zpět
            </button>
            <button
              onClick={() => handlePinInput('0')}
              className="h-14 rounded-xl bg-gray-100 hover:bg-gray-200 text-lg font-medium text-gray-800 transition active:scale-95"
            >
              0
            </button>
            <button
              onClick={() => handleBackspace()}
              className="h-14 rounded-xl text-sm text-gray-500 hover:bg-gray-100 transition"
            >
              Smazat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
