'use client';
import { useState } from 'react';
import {
  Package, Smartphone, Tablet, Monitor, Menu, X,
  Home, Search, List, AlertTriangle, Truck, Camera,
  Scale, FileText, Bell, LogOut, ArrowRight, ChevronRight
} from 'lucide-react';

type DeviceType = 'iphone' | 'ipad' | 'desktop';

const SCREENS = [
  { id: 'login', label: 'Přihlášení', icon: LogOut, roles: ['all'] },
  { id: 'dashboard-vedouci', label: 'Dashboard — Vedoucí', icon: Home, roles: ['vedouci'] },
  { id: 'dashboard-prodavac', label: 'Dashboard — Prodavač', icon: Home, roles: ['prodavac'] },
  { id: 'dashboard-ridic', label: 'Dashboard — Řidič', icon: Truck, roles: ['ridic'] },
  { id: 'dashboard-majitel', label: 'Dashboard — Majitel', icon: Scale, roles: ['majitel'] },
  { id: 'search', label: 'Vyhledávání SKU', icon: Search, roles: ['vedouci', 'prodavac', 'majitel'] },
  { id: 'reservations', label: 'Moje rezervace', icon: List, roles: ['vedouci', 'prodavac'] },
  { id: 'damages', label: 'Evidence vad', icon: AlertTriangle, roles: ['vedouci', 'prodavac'] },
  { id: 'manifest', label: 'Manifest řidiče', icon: Truck, roles: ['ridic'] },
  { id: 'scan', label: 'Skenování', icon: Camera, roles: ['ridic'] },
  { id: 'arbitrage', label: 'Arbitráže', icon: Scale, roles: ['majitel'] },
  { id: 'audit', label: 'Audit log', icon: FileText, roles: ['majitel'] },
  { id: 'notifications', label: 'Notifikace', icon: Bell, roles: ['all'] },
];

const DEVICES: { type: DeviceType; label: string; icon: React.ComponentType<{ size?: number; className?: string }>; width: number; height: number }[] = [
  { type: 'iphone', label: 'iPhone 15 Pro', icon: Smartphone, width: 393, height: 852 },
  { type: 'ipad', label: 'iPad Air', icon: Tablet, width: 820, height: 1180 },
  { type: 'desktop', label: 'Desktop', icon: Monitor, width: 1280, height: 800 },
];

export default function PreviewPage() {
  const [device, setDevice] = useState<DeviceType>('iphone');
  const [activeScreen, setActiveScreen] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentDevice = DEVICES.find(d => d.type === device)!;

  // Build the URL for the iframe — we use the main app route with a hash to indicate screen
  const iframeSrc = `/?preview=true#${activeScreen}`;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Top Bar */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-800 transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">Logis — Preview</h1>
              <p className="text-[10px] text-gray-400">Interní logistika a rezervace</p>
            </div>
          </div>
        </div>

        {/* Device Selector */}
        <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
          {DEVICES.map(d => {
            const Icon = d.icon;
            return (
              <button
                key={d.type}
                onClick={() => setDevice(d.type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  device === d.type
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{d.label}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport info */}
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
          <span>{currentDevice.width} × {currentDevice.height}</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative lg:translate-x-0 z-40 w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-[calc(100vh-57px)] transition-transform duration-200`}>
          {/* Screen count */}
          <div className="px-4 py-3 border-b border-gray-800">
            <p className="text-xs text-gray-400">{SCREENS.length} Dostupných obrazovek</p>
          </div>

          {/* Screen list */}
          <nav className="flex-1 overflow-y-auto py-2">
            {SCREENS.map(screen => {
              const Icon = screen.icon;
              const isActive = activeScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => {
                    setActiveScreen(screen.id);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-400'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-xs font-medium">{screen.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer info */}
          <div className="px-4 py-3 border-t border-gray-800">
            <p className="text-[10px] text-gray-500">Plně interaktivní iframe</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Data fiktivní do 15.2.2025</p>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Preview Area */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-auto">
          {device === 'desktop' ? (
            /* Desktop: no phone frame, just bordered iframe */
            <div className="w-full max-w-5xl h-[calc(100vh-120px)] bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <iframe
                src="/"
                className="w-full h-full border-0"
                title="Logis Preview"
              />
            </div>
          ) : device === 'ipad' ? (
            /* iPad frame */
            <div className="relative flex-shrink-0" style={{ width: Math.min(currentDevice.width * 0.6, 500) }}>
              <div className="bg-gray-800 rounded-[2rem] p-3 shadow-2xl shadow-black/50">
                <div className="bg-black rounded-[1.5rem] p-2 relative">
                  {/* Camera */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-800 z-10" />
                  <div
                    className="bg-white rounded-[1rem] overflow-hidden relative"
                    style={{
                      width: '100%',
                      aspectRatio: `${currentDevice.width}/${currentDevice.height}`,
                    }}
                  >
                    <iframe
                      src="/"
                      className="w-full h-full border-0 origin-top-left"
                      title="Logis Preview"
                      style={{
                        width: currentDevice.width,
                        height: currentDevice.height,
                        transform: `scale(${Math.min(500, currentDevice.width * 0.6) / currentDevice.width})`,
                        transformOrigin: 'top left',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* iPhone frame */
            <div className="relative flex-shrink-0" style={{ width: Math.min(currentDevice.width * 0.85, 370) }}>
              <div className="bg-gray-800 rounded-[3rem] p-2.5 shadow-2xl shadow-black/50 ring-1 ring-gray-700">
                <div className="bg-black rounded-[2.5rem] p-3 relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10" />
                  {/* Side buttons */}
                  <div className="absolute -left-3 top-28 w-1 h-8 bg-gray-700 rounded-l-lg" />
                  <div className="absolute -left-3 top-40 w-1 h-14 bg-gray-700 rounded-l-lg" />
                  <div className="absolute -left-3 top-56 w-1 h-14 bg-gray-700 rounded-l-lg" />
                  <div className="absolute -right-3 top-36 w-1 h-16 bg-gray-700 rounded-r-lg" />

                  {/* Screen */}
                  <div
                    className="bg-white rounded-[2rem] overflow-hidden relative"
                    style={{
                      width: '100%',
                      aspectRatio: `${currentDevice.width}/${currentDevice.height}`,
                    }}
                  >
                    {/* Status bar */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-gray-50 z-10 flex items-end justify-between px-8 pb-1">
                      <span className="text-[11px] font-semibold text-gray-900">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                          {[1,2,3,4].map(i => (
                            <div key={i} className={`w-0.5 rounded-full bg-gray-900`} style={{height: 4 + i * 2}} />
                          ))}
                        </div>
                        <svg width="15" height="11" viewBox="0 0 15 11" className="text-gray-900"><path d="M.5 4A.5.5 0 011 3.5h13a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H1A.5.5 0 01.5 7V4z" fill="none" stroke="currentColor" strokeWidth=".8"/><rect x="1.5" y="4.5" width="11" height="2" rx=".5" fill="currentColor"/></svg>
                      </div>
                    </div>

                    <iframe
                      src="/"
                      className="w-full h-full border-0 origin-top-left"
                      title="Logis Preview"
                      style={{
                        width: currentDevice.width,
                        height: currentDevice.height,
                        transform: `scale(${Math.min(370, currentDevice.width * 0.85) / currentDevice.width})`,
                        transformOrigin: 'top left',
                      }}
                    />

                    {/* Home indicator */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-900 rounded-full opacity-30" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
