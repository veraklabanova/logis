'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Package, Smartphone, Tablet, Menu, X,
  Home, Search, List, AlertTriangle, Truck, Camera,
  Scale, FileText, Bell, LogOut
} from 'lucide-react';

type DeviceType = 'iphone' | 'ipad';

const SCREENS = [
  { id: 'login', label: 'Přihlášení', icon: LogOut },
  { id: 'dashboard-vedouci', label: 'Dashboard — Vedoucí', icon: Home },
  { id: 'dashboard-prodavac', label: 'Dashboard — Prodavač', icon: Home },
  { id: 'dashboard-ridic', label: 'Dashboard — Řidič', icon: Truck },
  { id: 'dashboard-majitel', label: 'Dashboard — Majitel', icon: Scale },
  { id: 'search', label: 'Vyhledávání SKU', icon: Search },
  { id: 'reservations', label: 'Moje rezervace', icon: List },
  { id: 'damages', label: 'Evidence vad', icon: AlertTriangle },
  { id: 'manifest', label: 'Manifest řidiče', icon: Truck },
  { id: 'scan', label: 'Skenování', icon: Camera },
  { id: 'arbitrage', label: 'Arbitráže', icon: Scale },
  { id: 'audit', label: 'Audit log', icon: FileText },
  { id: 'notifications', label: 'Notifikace', icon: Bell },
];

const DEVICES: { type: DeviceType; label: string; icon: React.ComponentType<{ size?: number; className?: string }>; nativeW: number; nativeH: number; bezelRadius: string; screenRadius: string; padding: string }[] = [
  { type: 'iphone', label: 'iPhone 15 Pro', icon: Smartphone, nativeW: 393, nativeH: 852, bezelRadius: '3rem', screenRadius: '2.5rem', padding: 'p-2.5' },
  { type: 'ipad', label: 'iPad Air', icon: Tablet, nativeW: 820, nativeH: 1180, bezelRadius: '2rem', screenRadius: '1.5rem', padding: 'p-2' },
];

export default function PreviewPage() {
  const [device, setDevice] = useState<DeviceType>('iphone');
  const [activeScreen, setActiveScreen] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const currentDevice = DEVICES.find(d => d.type === device)!;

  // Calculate scale so the phone frame fits the available viewport
  const recalcScale = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const availW = container.clientWidth - 48; // padding
    const availH = container.clientHeight - 48;

    // Total frame dimensions (bezel + padding ≈ extra 30px each side for iPhone, 24 for iPad)
    const bezel = device === 'iphone' ? 30 : 24;
    const frameW = currentDevice.nativeW + bezel * 2;
    const frameH = currentDevice.nativeH + bezel * 2;

    const scaleW = availW / frameW;
    const scaleH = availH / frameH;
    setScale(Math.min(scaleW, scaleH, 1));
  }, [device, currentDevice]);

  useEffect(() => {
    recalcScale();
    window.addEventListener('resize', recalcScale);
    return () => window.removeEventListener('resize', recalcScale);
  }, [recalcScale]);

  // Send navigation command to iframe via postMessage
  const navigateIframe = useCallback((screenId: string) => {
    setActiveScreen(screenId);
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'logis-navigate', screen: screenId }, '*');
    }
  }, []);

  // When device changes, re-send current screen
  useEffect(() => {
    // After iframe reloads on src change, we need to wait and re-send
    const timer = setTimeout(() => {
      navigateIframe(activeScreen);
    }, 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device]);

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
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
          <span>{currentDevice.nativeW} × {currentDevice.nativeH}</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative lg:translate-x-0 z-40 w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-[calc(100vh-57px)] transition-transform duration-200 shrink-0`}>

          {/* Yellow prototype banner — top-left, outside phone frame */}
          <div className="mx-3 mt-3 mb-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
            <p className="text-[10px] text-yellow-800 leading-relaxed">
              <span className="font-bold">Prototyp:</span> Funkční prototyp pro demonstraci UI/UX. Data fiktivní (do 15.2.2025).
            </p>
            <div className="border-t border-yellow-200 pt-1.5 mt-1.5">
              <p className="text-[9px] font-semibold text-yellow-700 mb-0.5">PIN pro testování:</p>
              <div className="grid grid-cols-2 gap-x-2 text-[9px] text-yellow-700">
                <span>Vedoucí: <strong className="font-mono">1234</strong></span>
                <span>Prodavač: <strong className="font-mono">1111</strong></span>
                <span>Řidič: <strong className="font-mono">5555</strong></span>
                <span>Majitel: <strong className="font-mono">9999</strong></span>
              </div>
            </div>
          </div>

          {/* Screen count */}
          <div className="px-4 py-2 border-b border-gray-800">
            <p className="text-xs text-gray-400">{SCREENS.length} Dostupných obrazovek</p>
          </div>

          {/* Screen list */}
          <nav className="flex-1 overflow-y-auto py-1">
            {SCREENS.map(screen => {
              const Icon = screen.icon;
              const isActive = activeScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => {
                    navigateIframe(screen.id);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 text-left transition ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-400'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  <Icon size={15} />
                  <span className="text-xs font-medium">{screen.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-800">
            <p className="text-[10px] text-gray-500">Plně interaktivní iframe</p>
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
        <main ref={containerRef} className="flex-1 flex items-center justify-center p-6 overflow-hidden">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
            className="shrink-0"
          >
            {device === 'iphone' ? (
              /* ─── iPhone 15 Pro Frame ─── */
              <div className="relative">
                <div className="bg-gray-800 rounded-[3rem] p-2.5 shadow-2xl shadow-black/50 ring-1 ring-gray-700">
                  <div className="bg-black rounded-[2.5rem] p-3 relative">
                    {/* Dynamic Island */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10" />
                    {/* Side buttons */}
                    <div className="absolute -left-[11px] top-28 w-[3px] h-8 bg-gray-600 rounded-l" />
                    <div className="absolute -left-[11px] top-40 w-[3px] h-14 bg-gray-600 rounded-l" />
                    <div className="absolute -left-[11px] top-56 w-[3px] h-14 bg-gray-600 rounded-l" />
                    <div className="absolute -right-[11px] top-36 w-[3px] h-16 bg-gray-600 rounded-r" />

                    {/* Screen area */}
                    <div
                      className="bg-white rounded-[2rem] overflow-hidden relative"
                      style={{ width: currentDevice.nativeW, height: currentDevice.nativeH }}
                    >
                      <iframe
                        ref={iframeRef}
                        src="/"
                        className="absolute inset-0 w-full h-full border-0"
                        title="Logis Preview"
                      />
                      {/* Home indicator */}
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-900 rounded-full opacity-20 z-10" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ─── iPad Air Frame ─── */
              <div className="relative">
                <div className="bg-gray-800 rounded-[2rem] p-3 shadow-2xl shadow-black/50 ring-1 ring-gray-700">
                  <div className="bg-black rounded-[1.5rem] p-2 relative">
                    {/* Camera */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gray-700 z-10" />

                    {/* Screen area */}
                    <div
                      className="bg-white rounded-[1rem] overflow-hidden relative"
                      style={{ width: currentDevice.nativeW, height: currentDevice.nativeH }}
                    >
                      <iframe
                        ref={iframeRef}
                        src="/"
                        className="absolute inset-0 w-full h-full border-0"
                        title="Logis Preview"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
