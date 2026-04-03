import {
  Store, User, Product, StockEntry, Reservation, TransferRequest,
  DamageReport, Notification, AuditEntry
} from './types';

// ==================== STORES (6 prodejen) ====================
export const stores: Store[] = [
  { id: 'P1', name: 'Prodejna Centrum', address: 'Hlavní 12, Praha 1', shortName: 'Centrum' },
  { id: 'P2', name: 'Prodejna Vinohrady', address: 'Vinohradská 45, Praha 2', shortName: 'Vinohrady' },
  { id: 'P3', name: 'Prodejna Smíchov', address: 'Plzeňská 78, Praha 5', shortName: 'Smíchov' },
  { id: 'P4', name: 'Prodejna Karlín', address: 'Křižíkova 33, Praha 8', shortName: 'Karlín' },
  { id: 'P5', name: 'Prodejna Letná', address: 'Milady Horákové 90, Praha 7', shortName: 'Letná' },
  { id: 'P6', name: 'Prodejna Chodov', address: 'Roztylská 2, Praha 4', shortName: 'Chodov' },
];

// ==================== USERS (35 zamestnancu) ====================
export const users: User[] = [
  // P1 - Centrum
  { id: 'U01', name: 'Jan Novák', role: 'vedouci', storeId: 'P1', pin: '1234' },
  { id: 'U02', name: 'Petra Svobodová', role: 'prodavac', storeId: 'P1', pin: '1111' },
  { id: 'U03', name: 'Tomáš Procházka', role: 'prodavac', storeId: 'P1', pin: '2222' },
  { id: 'U04', name: 'Lucie Králová', role: 'prodavac', storeId: 'P1', pin: '3333' },
  { id: 'U05', name: 'Martin Horák', role: 'prodavac', storeId: 'P1', pin: '4444' },
  // P2 - Vinohrady
  { id: 'U06', name: 'Eva Němcová', role: 'vedouci', storeId: 'P2', pin: '1234' },
  { id: 'U07', name: 'David Kolář', role: 'prodavac', storeId: 'P2', pin: '1111' },
  { id: 'U08', name: 'Hana Marešová', role: 'prodavac', storeId: 'P2', pin: '2222' },
  { id: 'U09', name: 'Jiří Pospíšil', role: 'prodavac', storeId: 'P2', pin: '3333' },
  { id: 'U10', name: 'Kateřina Hájková', role: 'prodavac', storeId: 'P2', pin: '4444' },
  // P3 - Smíchov
  { id: 'U11', name: 'Michal Jelínek', role: 'vedouci', storeId: 'P3', pin: '1234' },
  { id: 'U12', name: 'Veronika Kopecká', role: 'prodavac', storeId: 'P3', pin: '1111' },
  { id: 'U13', name: 'Ondřej Fiala', role: 'prodavac', storeId: 'P3', pin: '2222' },
  { id: 'U14', name: 'Barbora Vlčková', role: 'prodavac', storeId: 'P3', pin: '3333' },
  { id: 'U15', name: 'Štěpán Kříž', role: 'prodavac', storeId: 'P3', pin: '4444' },
  // P4 - Karlín
  { id: 'U16', name: 'Alena Sedláčková', role: 'vedouci', storeId: 'P4', pin: '1234' },
  { id: 'U17', name: 'Pavel Beneš', role: 'prodavac', storeId: 'P4', pin: '1111' },
  { id: 'U18', name: 'Markéta Růžičková', role: 'prodavac', storeId: 'P4', pin: '2222' },
  { id: 'U19', name: 'Vojtěch Polák', role: 'prodavac', storeId: 'P4', pin: '3333' },
  { id: 'U20', name: 'Simona Kadlecová', role: 'prodavac', storeId: 'P4', pin: '4444' },
  // P5 - Letná
  { id: 'U21', name: 'Roman Doležal', role: 'vedouci', storeId: 'P5', pin: '1234' },
  { id: 'U22', name: 'Ivana Bláhová', role: 'prodavac', storeId: 'P5', pin: '1111' },
  { id: 'U23', name: 'Filip Koubek', role: 'prodavac', storeId: 'P5', pin: '2222' },
  { id: 'U24', name: 'Tereza Mach', role: 'prodavac', storeId: 'P5', pin: '3333' },
  { id: 'U25', name: 'Daniel Kučera', role: 'prodavac', storeId: 'P5', pin: '4444' },
  // P6 - Chodov
  { id: 'U26', name: 'Lenka Strnadová', role: 'vedouci', storeId: 'P6', pin: '1234' },
  { id: 'U27', name: 'Jakub Vávra', role: 'prodavac', storeId: 'P6', pin: '1111' },
  { id: 'U28', name: 'Nikola Pechová', role: 'prodavac', storeId: 'P6', pin: '2222' },
  { id: 'U29', name: 'Adam Sýkora', role: 'prodavac', storeId: 'P6', pin: '3333' },
  // Řidiči
  { id: 'U30', name: 'Petr Malý', role: 'ridic', storeId: 'P1', pin: '5555' },
  { id: 'U31', name: 'Radek Veselý', role: 'ridic', storeId: 'P1', pin: '6666' },
  // Majitel
  { id: 'U32', name: 'Karel Dvořák', role: 'majitel', storeId: 'P1', pin: '9999' },
  // Doplnění
  { id: 'U33', name: 'Zuzana Havlíčková', role: 'prodavac', storeId: 'P6', pin: '7777' },
  { id: 'U34', name: 'Aleš Bartoš', role: 'prodavac', storeId: 'P1', pin: '8888' },
  { id: 'U35', name: 'Monika Šťastná', role: 'prodavac', storeId: 'P3', pin: '9090' },
];

// ==================== PRODUCTS (Obuv - MVP) ====================
export const products: Product[] = [
  { id: 'PR01', name: 'Nike Air Max 90', sku: 'NK-AM90-BK42', ean: '8901234567890', category: 'Obuv', size: '42', color: 'Černá' },
  { id: 'PR02', name: 'Nike Air Max 90', sku: 'NK-AM90-WH43', ean: '8901234567891', category: 'Obuv', size: '43', color: 'Bílá' },
  { id: 'PR03', name: 'Adidas Superstar', sku: 'AD-SS-WH41', ean: '8901234567892', category: 'Obuv', size: '41', color: 'Bílá' },
  { id: 'PR04', name: 'Adidas Superstar', sku: 'AD-SS-BK44', ean: '8901234567893', category: 'Obuv', size: '44', color: 'Černá' },
  { id: 'PR05', name: 'Puma RS-X', sku: 'PM-RSX-GR42', ean: '8901234567894', category: 'Obuv', size: '42', color: 'Šedá' },
  { id: 'PR06', name: 'New Balance 574', sku: 'NB-574-NV43', ean: '8901234567895', category: 'Obuv', size: '43', color: 'Tmavě modrá' },
  { id: 'PR07', name: 'New Balance 574', sku: 'NB-574-GR41', ean: '8901234567896', category: 'Obuv', size: '41', color: 'Šedá' },
  { id: 'PR08', name: 'Reebok Classic', sku: 'RB-CL-WH42', ean: '8901234567897', category: 'Obuv', size: '42', color: 'Bílá' },
  { id: 'PR09', name: 'Vans Old Skool', sku: 'VN-OS-BK43', ean: '8901234567898', category: 'Obuv', size: '43', color: 'Černá' },
  { id: 'PR10', name: 'Converse Chuck 70', sku: 'CV-C70-RD42', ean: '8901234567899', category: 'Obuv', size: '42', color: 'Červená' },
  { id: 'PR11', name: 'Nike Air Force 1', sku: 'NK-AF1-WH44', ean: '8901234567900', category: 'Obuv', size: '44', color: 'Bílá' },
  { id: 'PR12', name: 'Adidas Gazelle', sku: 'AD-GZ-GN41', ean: '8901234567901', category: 'Obuv', size: '41', color: 'Zelená' },
  { id: 'PR13', name: 'Asics Gel-Kayano', sku: 'AS-GK-BL43', ean: '8901234567902', category: 'Obuv', size: '43', color: 'Modrá' },
  { id: 'PR14', name: 'Nike Dunk Low', sku: 'NK-DL-PD42', ean: '8901234567903', category: 'Obuv', size: '42', color: 'Panda' },
  { id: 'PR15', name: 'Salomon XT-6', sku: 'SL-XT6-BK41', ean: '8901234567904', category: 'Obuv', size: '41', color: 'Černá' },
];

// ==================== STOCK ====================
export const stockEntries: StockEntry[] = [
  // P1 - Centrum
  { productId: 'PR01', storeId: 'P1', erpStock: 3 }, { productId: 'PR02', storeId: 'P1', erpStock: 1 },
  { productId: 'PR03', storeId: 'P1', erpStock: 5 }, { productId: 'PR05', storeId: 'P1', erpStock: 2 },
  { productId: 'PR06', storeId: 'P1', erpStock: 0 }, { productId: 'PR09', storeId: 'P1', erpStock: 4 },
  { productId: 'PR11', storeId: 'P1', erpStock: 2 }, { productId: 'PR14', storeId: 'P1', erpStock: 1 },
  // P2 - Vinohrady
  { productId: 'PR01', storeId: 'P2', erpStock: 0 }, { productId: 'PR02', storeId: 'P2', erpStock: 3 },
  { productId: 'PR03', storeId: 'P2', erpStock: 1 }, { productId: 'PR04', storeId: 'P2', erpStock: 4 },
  { productId: 'PR07', storeId: 'P2', erpStock: 2 }, { productId: 'PR08', storeId: 'P2', erpStock: 3 },
  { productId: 'PR10', storeId: 'P2', erpStock: 1 }, { productId: 'PR12', storeId: 'P2', erpStock: 2 },
  // P3 - Smichov
  { productId: 'PR01', storeId: 'P3', erpStock: 2 }, { productId: 'PR03', storeId: 'P3', erpStock: 0 },
  { productId: 'PR05', storeId: 'P3', erpStock: 3 }, { productId: 'PR06', storeId: 'P3', erpStock: 5 },
  { productId: 'PR09', storeId: 'P3', erpStock: 1 }, { productId: 'PR11', storeId: 'P3', erpStock: 0 },
  { productId: 'PR13', storeId: 'P3', erpStock: 4 }, { productId: 'PR15', storeId: 'P3', erpStock: 2 },
  // P4 - Karlin
  { productId: 'PR02', storeId: 'P4', erpStock: 2 }, { productId: 'PR04', storeId: 'P4', erpStock: 1 },
  { productId: 'PR06', storeId: 'P4', erpStock: 3 }, { productId: 'PR08', storeId: 'P4', erpStock: 0 },
  { productId: 'PR10', storeId: 'P4', erpStock: 5 }, { productId: 'PR12', storeId: 'P4', erpStock: 1 },
  { productId: 'PR14', storeId: 'P4', erpStock: 3 }, { productId: 'PR15', storeId: 'P4', erpStock: 0 },
  // P5 - Letna
  { productId: 'PR01', storeId: 'P5', erpStock: 1 }, { productId: 'PR03', storeId: 'P5', erpStock: 2 },
  { productId: 'PR05', storeId: 'P5', erpStock: 0 }, { productId: 'PR07', storeId: 'P5', erpStock: 4 },
  { productId: 'PR09', storeId: 'P5', erpStock: 2 }, { productId: 'PR11', storeId: 'P5', erpStock: 3 },
  { productId: 'PR13', storeId: 'P5', erpStock: 1 }, { productId: 'PR14', storeId: 'P5', erpStock: 0 },
  // P6 - Chodov
  { productId: 'PR02', storeId: 'P6', erpStock: 1 }, { productId: 'PR04', storeId: 'P6', erpStock: 3 },
  { productId: 'PR06', storeId: 'P6', erpStock: 2 }, { productId: 'PR08', storeId: 'P6', erpStock: 4 },
  { productId: 'PR10', storeId: 'P6', erpStock: 0 }, { productId: 'PR12', storeId: 'P6', erpStock: 3 },
  { productId: 'PR13', storeId: 'P6', erpStock: 2 }, { productId: 'PR15', storeId: 'P6', erpStock: 1 },
];

// ==================== RESERVATIONS (dummy do 15.2.2025) ====================
export const reservations: Reservation[] = [
  {
    id: 'RES001', productId: 'PR01', storeId: 'P1', quantity: 1,
    customerName: 'František Koudelka', customerPhone: '+420601111111', note: 'Vel. 42',
    status: 'ACTIVE', createdAt: '2025-02-14T09:30:00', expiresAt: '2025-02-15T09:30:00',
    createdBy: 'U01', extensions: 0,
  },
  {
    id: 'RES002', productId: 'PR03', storeId: 'P2', quantity: 1,
    customerName: 'Marie Dvořáková', customerPhone: '+420602222222',
    status: 'ACTIVE', createdAt: '2025-02-14T11:00:00', expiresAt: '2025-02-15T11:00:00',
    createdBy: 'U06', extensions: 1,
  },
  {
    id: 'RES003', productId: 'PR09', storeId: 'P1', quantity: 2,
    customerName: 'Jiří Bárta', customerPhone: '+420603333333',
    status: 'ACTIVE', createdAt: '2025-02-13T14:15:00', expiresAt: '2025-02-14T14:15:00',
    createdBy: 'U02', extensions: 0,
  },
  {
    id: 'RES004', productId: 'PR06', storeId: 'P3', quantity: 1,
    customerName: 'Helena Urbanová', customerPhone: '+420604444444',
    status: 'EXPIRED', createdAt: '2025-02-10T10:00:00', expiresAt: '2025-02-11T10:00:00',
    createdBy: 'U11', extensions: 3,
  },
  {
    id: 'RES005', productId: 'PR11', storeId: 'P5', quantity: 1,
    customerName: 'Petr Souček', customerPhone: '+420605555555',
    status: 'FULFILLED', createdAt: '2025-02-12T08:45:00', expiresAt: '2025-02-13T08:45:00',
    createdBy: 'U21', extensions: 0,
  },
  {
    id: 'RES006', productId: 'PR14', storeId: 'P4', quantity: 1,
    customerName: 'Anna Čermáková', customerPhone: '+420606666666',
    status: 'ACTIVE', createdAt: '2025-02-14T16:00:00', expiresAt: '2025-02-15T16:00:00',
    createdBy: 'U16', extensions: 0,
  },
  {
    id: 'RES007', productId: 'PR05', storeId: 'P3', quantity: 1,
    customerName: 'Václav Hubička', customerPhone: '+420607777777',
    status: 'CANCELLED', createdAt: '2025-02-08T09:00:00', expiresAt: '2025-02-09T09:00:00',
    createdBy: 'U12', extensions: 0,
  },
];

// ==================== TRANSFER REQUESTS ====================
export const transferRequests: TransferRequest[] = [
  {
    id: 'TR001', productId: 'PR01', sourceStoreId: 'P3', targetStoreId: 'P2',
    quantity: 1, status: 'DELIVERED', reason: 'customer_waiting',
    createdAt: '2025-02-10T08:00:00', createdBy: 'U06',
    approvedBy: 'U11', approvedAt: '2025-02-10T09:15:00',
    deliveredAt: '2025-02-10T14:30:00',
  },
  {
    id: 'TR002', productId: 'PR06', sourceStoreId: 'P4', targetStoreId: 'P1',
    quantity: 2, status: 'APPROVED', reason: 'restock',
    createdAt: '2025-02-14T07:30:00', createdBy: 'U01',
    approvedBy: 'U16', approvedAt: '2025-02-14T08:45:00',
  },
  {
    id: 'TR003', productId: 'PR11', sourceStoreId: 'P5', targetStoreId: 'P3',
    quantity: 1, status: 'REQUESTED', reason: 'customer_waiting',
    createdAt: '2025-02-14T10:00:00', createdBy: 'U11',
  },
  {
    id: 'TR004', productId: 'PR08', sourceStoreId: 'P6', targetStoreId: 'P4',
    quantity: 1, status: 'DISPUTED', reason: 'customer_waiting',
    disputeReason: 'last_piece', disputeText: 'Poslední kus na prodejně, máme zákazníka',
    createdAt: '2025-02-13T15:00:00', createdBy: 'U16',
  },
  {
    id: 'TR005', productId: 'PR03', sourceStoreId: 'P1', targetStoreId: 'P5',
    quantity: 1, status: 'IN_TRANSIT', reason: 'restock',
    createdAt: '2025-02-14T06:30:00', createdBy: 'U21',
    approvedBy: 'U01', approvedAt: '2025-02-14T07:00:00',
  },
  {
    id: 'TR006', productId: 'PR10', sourceStoreId: 'P4', targetStoreId: 'P6',
    quantity: 1, status: 'CLOSED', reason: 'customer_waiting',
    createdAt: '2025-02-05T08:00:00', createdBy: 'U26',
    approvedBy: 'U16', approvedAt: '2025-02-05T09:00:00',
    deliveredAt: '2025-02-05T15:00:00',
  },
  {
    id: 'TR007', productId: 'PR15', sourceStoreId: 'P3', targetStoreId: 'P4',
    quantity: 1, status: 'RETURNED_TO_SOURCE', reason: 'customer_waiting',
    createdAt: '2025-02-12T07:00:00', createdBy: 'U16',
    approvedBy: 'U11', approvedAt: '2025-02-12T08:00:00',
  },
  {
    id: 'TR008', productId: 'PR04', sourceStoreId: 'P2', targetStoreId: 'P1',
    quantity: 1, status: 'REQUESTED', reason: 'customer_waiting',
    createdAt: '2025-02-14T14:00:00', createdBy: 'U01',
  },
];

// ==================== DAMAGE REPORTS ====================
export const damageReports: DamageReport[] = [
  {
    id: 'DMG001', productId: 'PR09', storeId: 'P1', quantity: 1,
    damageType: 'mechanical', description: 'Odlepená podrážka, levý bot',
    reportedBy: 'U02', reportedAt: '2025-02-13T11:00:00', resolved: false,
  },
  {
    id: 'DMG002', productId: 'PR05', storeId: 'P3', quantity: 1,
    damageType: 'packaging', description: 'Krabice zničena, boty ok ale nelze prodat jako nové',
    reportedBy: 'U12', reportedAt: '2025-02-11T09:30:00', resolved: false,
  },
  {
    id: 'DMG003', productId: 'PR12', storeId: 'P2', quantity: 1,
    damageType: 'manufacturing', description: 'Špatně přišitý pásek, výrobní vada',
    reportedBy: 'U07', reportedAt: '2025-02-09T16:00:00', resolved: true, resolvedAt: '2025-02-12T10:00:00',
  },
];

// ==================== NOTIFICATIONS ====================
export const notifications: Notification[] = [
  { id: 'N01', userId: 'U01', type: 'transfer', title: 'Nový požadavek na přesun', message: 'Požadavek TR008: Adidas Superstar BK44 z Vinohrady', timestamp: '2025-02-14T14:05:00', read: false },
  { id: 'N02', userId: 'U06', type: 'transfer', title: 'Požadavek schválen', message: 'TR002: New Balance 574 schválen vedoucí Karlín', timestamp: '2025-02-14T08:50:00', read: true },
  { id: 'N03', userId: 'U32', type: 'arbitrage', title: 'Čekající arbitráž', message: 'Spor TR004: Reebok Classic — Chodov odmítl přesun pro Karlín', timestamp: '2025-02-13T15:10:00', read: false },
  { id: 'N04', userId: 'U11', type: 'delivery', title: 'Zboží doručeno', message: 'TR001: Nike Air Max 90 doručen na Vinohrady', timestamp: '2025-02-10T14:35:00', read: true },
  { id: 'N05', userId: 'U16', type: 'expiration', title: 'Expirace se blíží', message: 'Rezervace RES006 pro Anna Čermáková expiruje za 2 hodiny', timestamp: '2025-02-15T14:00:00', read: false },
  { id: 'N06', userId: 'U21', type: 'transfer', title: 'Požadavek odeslán', message: 'TR003: Nike Air Force 1 — čekáme na schválení Letná', timestamp: '2025-02-14T10:05:00', read: true },
  { id: 'N07', userId: 'U01', type: 'damage', title: 'Nová vada nahlášena', message: 'DMG001: Vans Old Skool — mechanické poškození', timestamp: '2025-02-13T11:05:00', read: true },
  { id: 'N08', userId: 'U30', type: 'transfer', title: 'Manifest připraven', message: 'Dnešní manifest: 3 pobočky, 4 položky', timestamp: '2025-02-14T07:45:00', read: true },
];

// ==================== AUDIT LOG ====================
export const auditEntries: AuditEntry[] = [
  { id: 'A01', timestamp: '2025-02-14T08:45:00', userId: 'U16', userName: 'Alena Sedláčková', userRole: 'vedouci', action: 'Schválení přesunu', productSku: 'NB-574-NV43', storeName: 'Karlín → Centrum', details: 'Schválen přesun 2 ks New Balance 574 do Centrum', category: 'approval' },
  { id: 'A02', timestamp: '2025-02-14T07:00:00', userId: 'U01', userName: 'Jan Novák', userRole: 'vedouci', action: 'Schválení přesunu', productSku: 'AD-SS-WH41', storeName: 'Centrum → Letná', details: 'Schválen přesun 1 ks Adidas Superstar do Letná', category: 'approval' },
  { id: 'A03', timestamp: '2025-02-13T15:05:00', userId: 'U26', userName: 'Lenka Strnadová', userRole: 'vedouci', action: 'Zamítnutí přesunu', productSku: 'RB-CL-WH42', storeName: 'Chodov', details: 'Zamítnuto: Poslední kus na prodejně', category: 'rejection' },
  { id: 'A04', timestamp: '2025-02-13T11:00:00', userId: 'U02', userName: 'Petra Svobodová', userRole: 'prodavac', action: 'Nahlášení vady', productSku: 'VN-OS-BK43', storeName: 'Centrum', details: 'Mechanické poškození — odlepená podrážka', category: 'damage' },
  { id: 'A05', timestamp: '2025-02-12T10:00:00', userId: 'U07', userName: 'David Kolář', userRole: 'prodavac', action: 'Vada vyřešena', productSku: 'AD-GZ-GN41', storeName: 'Vinohrady', details: 'Vada vyřešena — zboží vráceno do prodeje', category: 'damage' },
  { id: 'A06', timestamp: '2025-02-10T14:30:00', userId: 'U30', userName: 'Petr Malý', userRole: 'ridic', action: 'Doručení', productSku: 'NK-AM90-BK42', storeName: 'Smíchov → Vinohrady', details: 'Doručen 1 ks Nike Air Max 90', category: 'transfer' },
  { id: 'A07', timestamp: '2025-02-10T09:15:00', userId: 'U11', userName: 'Michal Jelínek', userRole: 'vedouci', action: 'Schválení přesunu', productSku: 'NK-AM90-BK42', storeName: 'Smíchov → Vinohrady', details: 'Schválen přesun 1 ks Nike Air Max 90', category: 'approval' },
  { id: 'A08', timestamp: '2025-02-05T15:00:00', userId: 'U30', userName: 'Petr Malý', userRole: 'ridic', action: 'Doručení', productSku: 'CV-C70-RD42', storeName: 'Karlín → Chodov', details: 'Doručen 1 ks Converse Chuck 70', category: 'transfer' },
];

// ==================== HELPERS ====================
export function getStoreName(storeId: string): string {
  return stores.find(s => s.id === storeId)?.name ?? storeId;
}

export function getStoreShortName(storeId: string): string {
  return stores.find(s => s.id === storeId)?.shortName ?? storeId;
}

export function getProduct(productId: string): Product | undefined {
  return products.find(p => p.id === productId);
}

export function getUserName(userId: string): string {
  return users.find(u => u.id === userId)?.name ?? userId;
}

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    vedouci: 'Vedoucí',
    prodavac: 'Prodavač',
    ridic: 'Řidič',
    majitel: 'Majitel',
  };
  return labels[role] ?? role;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    DRAFT: 'Koncept', REQUESTED: 'Požadováno', APPROVED: 'Schváleno',
    DISPUTED: 'Spor', IN_TRANSIT: 'V přepravě', DELIVERED: 'Doručeno',
    REJECTED_AT_RECEIPT: 'Odmítnuto při příjmu', RETURN_IN_TRANSIT: 'Vracení',
    RETURNED_TO_SOURCE: 'Vráceno', CLOSED: 'Uzavřeno',
    ACTIVE: 'Aktivní', EXPIRED: 'Expirovaná', CANCELLED: 'Zrušená', FULFILLED: 'Splněná',
  };
  return labels[status] ?? status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    DRAFT: 'bg-gray-100 text-gray-700',
    REQUESTED: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    DISPUTED: 'bg-red-100 text-red-800',
    IN_TRANSIT: 'bg-orange-100 text-orange-800',
    DELIVERED: 'bg-green-100 text-green-800',
    REJECTED_AT_RECEIPT: 'bg-red-100 text-red-800',
    RETURN_IN_TRANSIT: 'bg-orange-100 text-orange-800',
    RETURNED_TO_SOURCE: 'bg-gray-100 text-gray-700',
    CLOSED: 'bg-gray-100 text-gray-600',
    ACTIVE: 'bg-green-100 text-green-800',
    EXPIRED: 'bg-red-100 text-red-800',
    CANCELLED: 'bg-gray-100 text-gray-600',
    FULFILLED: 'bg-blue-100 text-blue-800',
  };
  return colors[status] ?? 'bg-gray-100 text-gray-700';
}

/** ATP = ERP_Stock - Active_Reservations - Damage */
export function calculateATP(productId: string, storeId: string): number {
  const stock = stockEntries.find(s => s.productId === productId && s.storeId === storeId);
  const erpStock = stock?.erpStock ?? 0;

  const reserved = reservations
    .filter(r => r.productId === productId && r.storeId === storeId && r.status === 'ACTIVE')
    .reduce((sum, r) => sum + r.quantity, 0);

  const damaged = damageReports
    .filter(d => d.productId === productId && d.storeId === storeId && !d.resolved)
    .reduce((sum, d) => sum + d.quantity, 0);

  return Math.max(0, erpStock - reserved - damaged);
}

export function getATPColor(atp: number): string {
  if (atp === 0) return 'text-red-600 font-bold';
  if (atp <= 2) return 'text-yellow-600 font-semibold';
  return 'text-green-600 font-semibold';
}

export function getATPBgColor(atp: number): string {
  if (atp === 0) return 'bg-red-100';
  if (atp <= 2) return 'bg-yellow-50';
  return 'bg-green-50';
}

export const ERP_LAST_SYNC = '2025-02-14T18:42:00';
