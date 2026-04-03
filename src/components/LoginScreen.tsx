'use client';
import { useState } from 'react';
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

  const grouped = stores.map(store => ({
    store,
    users: users.filter(u => u.storeId === store.id),
  }));

  // Add drivers and owner as separate groups
  const drivers = users.filter(u => u.role === 'ridic');
  const owners = users.filter(u => u.role === 'majitel');

  const handlePinInput = (digit: string) => {
    if (locked) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError('');

    if (newPin.length === 4) {
      const user = users.find(u => u.id === selectedUserId);
      if (user && user.pin === newPin) {
        login(user);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setPin('');
        if (newAttempts >= 5) {
          setLocked(true);
          setError('Ucet zamcen na 5 minut');
          setTimeout(() => { setLocked(false); setAttempts(0); }, 300000);
        } else {
          setError('Nespravny PIN');
        }
      }
    }
  };

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
        <p className="text-xs text-gray-500 mt-1">Interni logistika a rezervace</p>
      </div>

      {!selectedUserId ? (
        /* User List */
        <div className="px-4 pb-32">
          {grouped.filter(g => g.users.some(u => u.role !== 'ridic' && u.role !== 'majitel')).map(({ store, users: storeUsers }) => (
            <div key={store.id} className="mb-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 px-1">{store.name}</h3>
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                {storeUsers.filter(u => u.role !== 'ridic' && u.role !== 'majitel').map(user => (
                  <button
                    key={user.id}
                    onClick={() => { setSelectedUserId(user.id); setPin(''); setError(''); }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                  >
                    <span className="text-sm text-gray-800">{user.name}</span>
                    {roleTag(user.role)}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Drivers */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 px-1">Ridici</h3>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {drivers.map(user => (
                <button
                  key={user.id}
                  onClick={() => { setSelectedUserId(user.id); setPin(''); setError(''); }}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                >
                  <span className="text-sm text-gray-800">{user.name}</span>
                  {roleTag(user.role)}
                </button>
              ))}
            </div>
          </div>

          {/* Owner */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 px-1">Vedeni</h3>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {owners.map(user => (
                <button
                  key={user.id}
                  onClick={() => { setSelectedUserId(user.id); setPin(''); setError(''); }}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                >
                  <span className="text-sm text-gray-800">{user.name}</span>
                  {roleTag(user.role)}
                </button>
              ))}
            </div>
          </div>

          {/* Yellow Prototype Banner */}
          <div className="mt-6 mb-8 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
            <p className="text-xs text-yellow-800">
              <span className="font-bold">Prototyp:</span>{' '}
              Toto je funkcni prototyp pro demonstraci UI/UX. Data jsou fiktivni (do 15.2.2025).
              Prepinajte role pomoci seznamu uzivatelu pro zobrazeni ruznych pohledu.
            </p>
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
                className={`w-4 h-4 rounded-full border-2 ${
                  pin.length > i ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                }`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <button
                key={n}
                onClick={() => handlePinInput(String(n))}
                className="h-14 rounded-xl bg-gray-100 hover:bg-gray-200 text-lg font-medium text-gray-800 transition"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => { setSelectedUserId(null); setPin(''); setError(''); }}
              className="h-14 rounded-xl text-sm text-gray-500 hover:bg-gray-100 transition"
            >
              Zpet
            </button>
            <button
              onClick={() => handlePinInput('0')}
              className="h-14 rounded-xl bg-gray-100 hover:bg-gray-200 text-lg font-medium text-gray-800 transition"
            >
              0
            </button>
            <button
              onClick={() => setPin(pin.slice(0, -1))}
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
