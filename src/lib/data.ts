import {
  Store, User, Product, StockEntry, Reservation, TransferRequest,
  DamageReport, Notification, AuditEntry
} from './types';

// ==================== STORES (6 prodejen) ====================
export const stores: Store[] = [
  { id: 'P1', name: 'Prodejna Centrum', address: 'Hlavni 12, Praha 1', shortName: 'Centrum' },
  { id: 'P2', name: 'Prodejna Vinohrady', address: 'Vinohradska 45, Praha 2', shortName: 'Vinohrady' },
  { id: 'P3', name: 'Prodejna Smichov', address: 'Plzenska 78, Praha 5', shortName: 'Smichov' },
  { id: 'P4', name: 'Prodejna Karlin', address: 'Krizikova 33, Praha 8', shortName: 'Karlin' },
  { id: 'P5', name: 'Prodejna Letna', address: 'Milady Horakove 90, Praha 7', shortName: 'Letna' },
  { id: 'P6', name: 'Prodejna Chodov', address: 'Roztylska 2, Praha 4', shortName: 'Chodov' },
];

// ==================== USERS (35 zamestnancu) ====================
export const users: User[] = [
  // P1 - Centrum
  { id: 'U01', name: 'Jan Novak', role: 'vedouci', storeId: 'P1', pin: '1234' },
  { id: 'U02', name: 'Petra Svobodova', role: 'prodavac', storeId: 'P1', pin: '1111' },
  { id: 'U03', name: 'Tomas Prochazka', role: 'prodavac', storeId: 'P1', pin: '2222' },
  { id: 'U04', name: 'Lucie Kralova', role: 'prodavac', storeId: 'P1', pin: '3333' },
  { id: 'U05', name: 'Martin Horak', role: 'prodavac', storeId: 'P1', pin: '4444' },
  // P2 - Vinohrady
  { id: 'U06', name: 'Eva Nemcova', role: 'vedouci', storeId: 'P2', pin: '1234' },
  { id: 'U07', name: 'David Kolar', role: 'prodavac', storeId: 'P2', pin: '1111' },
  { id: 'U08', name: 'Hana Maresova', role: 'prodavac', storeId: 'P2', pin: '2222' },
  { id: 'U09', name: 'Jiri Pospisil', role: 'prodavac', storeId: 'P2', pin: '3333' },
  { id: 'U10', name: 'Katerina Hajkova', role: 'prodavac', storeId: 'P2', pin: '4444' },
  // P3 - Smichov
  { id: 'U11', name: 'Michal Jelinek', role: 'vedouci', storeId: 'P3', pin: '1234' },
  { id: 'U12', name: 'Veronika Kopecka', role: 'prodavac', storeId: 'P3', pin: '1111' },
  { id: 'U13', name: 'Ondrej Fiala', role: 'prodavac', storeId: 'P3', pin: '2222' },
  { id: 'U14', name: 'Barbora Vlckova', role: 'prodavac', storeId: 'P3', pin: '3333' },
  { id: 'U15', name: 'Stepan Kriz', role: 'prodavac', storeId: 'P3', pin: '4444' },
  // P4 - Karlin
  { id: 'U16', name: 'Alena Sedlackova', role: 'vedouci', storeId: 'P4', pin: '1234' },
  { id: 'U17', name: 'Pavel Benes', role: 'prodavac', storeId: 'P4', pin: '1111' },
  { id: 'U18', name: 'Marketa Ruzickova', role: 'prodavac', storeId: 'P4', pin: '2222' },
  { id: 'U19', name: 'Vojtech Polak', role: 'prodavac', storeId: 'P4', pin: '3333' },
  { id: 'U20', name: 'Simona Kadlecova', role: 'prodavac', storeId: 'P4', pin: '4444' },
  // P5 - Letna
  { id: 'U21', name: 'Roman Dolezal', role: 'vedouci', storeId: 'P5', pin: '1234' },
  { id: 'U22', name: 'Ivana Blahova', role: 'prodavac', storeId: 'P5', pin: '1111' },
  { id: 'U23', name: 'Filip Koubek', role: 'prodavac', storeId: 'P5', pin: '2222' },
  { id: 'U24', name: 'Tereza Mach', role: 'prodavac', storeId: 'P5', pin: '3333' },
  { id: 'U25', name: 'Daniel Kucera', role: 'prodavac', storeId: 'P5', pin: '4444' },
  // P6 - Chodov
  { id: 'U26', name: 'Lenka Strnadova', role: 'vedouci', storeId: 'P6', pin: '1234' },
  { id: 'U27', name: 'Jakub Vavra', role: 'prodavac', storeId: 'P6', pin: '1111' },
  { id: 'U28', name: 'Nikola Pechova', role: 'prodavac', storeId: 'P6', pin: '2222' },
  { id: 'U29', name: 'Adam Sykora', role: 'prodavac', storeId: 'P6', pin: '3333' },
  // Ridici
  { id: 'U30', name: 'Petr Maly', role: 'ridic', storeId: 'P1', pin: '5555' },
  { id: 'U31', name: 'Radek Vesely', role: 'ridic', storeId: 'P1', pin: '6666' },
  // Majitel
  { id: 'U32', name: 'Karel Dvorak', role: 'majitel', storeId: 'P1', pin: '9999' },
  // Doplneni
  { id: 'U33', name: 'Zuzana Havlickova', role: 'prodavac', storeId: 'P6', pin: '7777' },
  { id: 'U34', name: 'Ales Bartos', role: 'prodavac', storeId: 'P1', pin: '8888' },
  { id: 'U35', name: 'Monika Stastna', role: 'prodavac', storeId: 'P3', pin: '9090' },
];

// ==================== PRODUCTS (Obuv - MVP) ====================
export const products: Product[] = [
  { id: 'PR01', name: 'Nike Air Max 90', sku: 'NK-AM90-BK42', ean: '8901234567890', category: 'Obuv', size: '42', color: 'Cerna' },
  { id: 'PR02', name: 'Nike Air Max 90', sku: 'NK-AM90-WH43', ean: '8901234567891', category: 'Obuv', size: '43', color: 'Bila' },
  { id: 'PR03', name: 'Adidas Superstar', sku: 'AD-SS-WH41', ean: '8901234567892', category: 'Obuv', size: '41', color: 'Bila' },
  { id: 'PR04', name: 'Adidas Superstar', sku: 'AD-SS-BK44', ean: '8901234567893', category: 'Obuv', size: '44', color: 'Cerna' },
  { id: 'PR05', name: 'Puma RS-X', sku: 'PM-RSX-GR42', ean: '8901234567894', category: 'Obuv', size: '42', color: 'Seda' },
  { id: 'PR06', name: 'New Balance 574', sku: 'NB-574-NV43', ean: '8901234567895', category: 'Obuv', size: '43', color: 'Tmave modra' },
  { id: 'PR07', name: 'New Balance 574', sku: 'NB-574-GR41', ean: '8901234567896', category: 'Obuv', size: '41', color: 'Seda' },
  { id: 'PR08', name: 'Reebok Classic', sku: 'RB-CL-WH42', ean: '8901234567897', category: 'Obuv', size: '42', color: 'Bila' },
  { id: 'PR09', name: 'Vans Old Skool', sku: 'VN-OS-BK43', ean: '8901234567898', category: 'Obuv', size: '43', color: 'Cerna' },
  { id: 'PR10', name: 'Converse Chuck 70', sku: 'CV-C70-RD42', ean: '8901234567899', category: 'Obuv', size: '42', color: 'Cervena' },
  { id: 'PR11', name: 'Nike Air Force 1', sku: 'NK-AF1-WH44', ean: '8901234567900', category: 'Obuv', size: '44', color: 'Bila' },
  { id: 'PR12', name: 'Adidas Gazelle', sku: 'AD-GZ-GN41', ean: '8901234567901', category: 'Obuv', size: '41', color: 'Zelena' },
  { id: 'PR13', name: 'Asics Gel-Kayano', sku: 'AS-GK-BL43', ean: '8901234567902', category: 'Obuv', size: '43', color: 'Modra' },
  { id: 'PR14', name: 'Nike Dunk Low', sku: 'NK-DL-PD42', ean: '8901234567903', category: 'Obuv', size: '42', color: 'Panda' },
  { id: 'PR15', name: 'Salomon XT-6', sku: 'SL-XT6-BK41', ean: '8901234567904', category: 'Obuv', size: '41', color: 'Cerna' },
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
    customerName: 'Frantisek Koudelka', customerPhone: '+420601111111', note: 'Vel. 42',
    status: 'ACTIVE', createdAt: '2025-02-14T09:30:00', expiresAt: '2025-02-15T09:30:00',
    createdBy: 'U01', extensions: 0,
  },
  {
    id: 'RES002', productId: 'PR03', storeId: 'P2', quantity: 1,
    customerName: 'Marie Dvorakova', customerPhone: '+420602222222',
    status: 'ACTIVE', createdAt: '2025-02-14T11:00:00', expiresAt: '2025-02-15T11:00:00',
    createdBy: 'U06', extensions: 1,
  },
  {
    id: 'RES003', productId: 'PR09', storeId: 'P1', quantity: 2,
    customerName: 'Jiri Barta', customerPhone: '+420603333333',
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
    customerName: 'Petr Soucek', customerPhone: '+420605555555',
    status: 'FULFILLED', createdAt: '2025-02-12T08:45:00', expiresAt: '2025-02-13T08:45:00',
    createdBy: 'U21', extensions: 0,
  },
  {
    id: 'RES006', productId: 'PR14', storeId: 'P4', quantity: 1,
    customerName: 'Anna Cermakova', customerPhone: '+420606666666',
    status: 'ACTIVE', createdAt: '2025-02-14T16:00:00', expiresAt: '2025-02-15T16:00:00',
    createdBy: 'U16', extensions: 0,
  },
  {
    id: 'RES007', productId: 'PR05', storeId: 'P3', quantity: 1,
    customerName: 'Vaclav Hubicka', customerPhone: '+420607777777',
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
    disputeReason: 'last_piece', disputeText: 'Posledni kus na prodejne, mame zakaznika',
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
    damageType: 'mechanical', description: 'Odlepena podesev, levy bot',
    reportedBy: 'U02', reportedAt: '2025-02-13T11:00:00', resolved: false,
  },
  {
    id: 'DMG002', productId: 'PR05', storeId: 'P3', quantity: 1,
    damageType: 'packaging', description: 'Krabice znicena, boty ok ale nelze prodat jako nove',
    reportedBy: 'U12', reportedAt: '2025-02-11T09:30:00', resolved: false,
  },
  {
    id: 'DMG003', productId: 'PR12', storeId: 'P2', quantity: 1,
    damageType: 'manufacturing', description: 'Spatne prisity pasek, vyrobni vada',
    reportedBy: 'U07', reportedAt: '2025-02-09T16:00:00', resolved: true, resolvedAt: '2025-02-12T10:00:00',
  },
];

// ==================== NOTIFICATIONS ====================
export const notifications: Notification[] = [
  { id: 'N01', userId: 'U01', type: 'transfer', title: 'Novy pozadavek na presun', message: 'Pozadavek TR008: Adidas Superstar BK44 z Vinohrady', timestamp: '2025-02-14T14:05:00', read: false },
  { id: 'N02', userId: 'U06', type: 'transfer', title: 'Pozadavek schvalen', message: 'TR002: New Balance 574 schvalen vedouci Karlin', timestamp: '2025-02-14T08:50:00', read: true },
  { id: 'N03', userId: 'U32', type: 'arbitrage', title: 'Cekajici arbitraz', message: 'Spor TR004: Reebok Classic — Chodov odmitl presun pro Karlin', timestamp: '2025-02-13T15:10:00', read: false },
  { id: 'N04', userId: 'U11', type: 'delivery', title: 'Zbozi doruceno', message: 'TR001: Nike Air Max 90 dorucen na Vinohrady', timestamp: '2025-02-10T14:35:00', read: true },
  { id: 'N05', userId: 'U16', type: 'expiration', title: 'Expirace blizi se', message: 'Rezervace RES006 pro Anna Cermakova expiruje za 2 hodiny', timestamp: '2025-02-15T14:00:00', read: false },
  { id: 'N06', userId: 'U21', type: 'transfer', title: 'Pozadavek odeslan', message: 'TR003: Nike Air Force 1 — cekame na schvaleni Letna', timestamp: '2025-02-14T10:05:00', read: true },
  { id: 'N07', userId: 'U01', type: 'damage', title: 'Nova vada nahlasena', message: 'DMG001: Vans Old Skool — mechanicke poskozeni', timestamp: '2025-02-13T11:05:00', read: true },
  { id: 'N08', userId: 'U30', type: 'transfer', title: 'Manifest pripraven', message: 'Dnesni manifest: 3 pobocky, 4 polozky', timestamp: '2025-02-14T07:45:00', read: true },
];

// ==================== AUDIT LOG ====================
export const auditEntries: AuditEntry[] = [
  { id: 'A01', timestamp: '2025-02-14T08:45:00', userId: 'U16', userName: 'Alena Sedlackova', userRole: 'vedouci', action: 'Schvaleni presunu', productSku: 'NB-574-NV43', storeName: 'Karlin → Centrum', details: 'Schvalen presun 2 ks New Balance 574 do Centrum', category: 'approval' },
  { id: 'A02', timestamp: '2025-02-14T07:00:00', userId: 'U01', userName: 'Jan Novak', userRole: 'vedouci', action: 'Schvaleni presunu', productSku: 'AD-SS-WH41', storeName: 'Centrum → Letna', details: 'Schvalen presun 1 ks Adidas Superstar do Letna', category: 'approval' },
  { id: 'A03', timestamp: '2025-02-13T15:05:00', userId: 'U26', userName: 'Lenka Strnadova', userRole: 'vedouci', action: 'Zamitnuti presunu', productSku: 'RB-CL-WH42', storeName: 'Chodov', details: 'Zamitnuto: Posledni kus na prodejne', category: 'rejection' },
  { id: 'A04', timestamp: '2025-02-13T11:00:00', userId: 'U02', userName: 'Petra Svobodova', userRole: 'prodavac', action: 'Nahlaseni vady', productSku: 'VN-OS-BK43', storeName: 'Centrum', details: 'Mechanicke poskozeni — odlepena podesev', category: 'damage' },
  { id: 'A05', timestamp: '2025-02-12T10:00:00', userId: 'U07', userName: 'David Kolar', userRole: 'prodavac', action: 'Vada vyresena', productSku: 'AD-GZ-GN41', storeName: 'Vinohrady', details: 'Vada vyresena — zbozi vraceno do prodeje', category: 'damage' },
  { id: 'A06', timestamp: '2025-02-10T14:30:00', userId: 'U30', userName: 'Petr Maly', userRole: 'ridic', action: 'Doruceni', productSku: 'NK-AM90-BK42', storeName: 'Smichov → Vinohrady', details: 'Dorucen 1 ks Nike Air Max 90', category: 'transfer' },
  { id: 'A07', timestamp: '2025-02-10T09:15:00', userId: 'U11', userName: 'Michal Jelinek', userRole: 'vedouci', action: 'Schvaleni presunu', productSku: 'NK-AM90-BK42', storeName: 'Smichov → Vinohrady', details: 'Schvalen presun 1 ks Nike Air Max 90', category: 'approval' },
  { id: 'A08', timestamp: '2025-02-05T15:00:00', userId: 'U30', userName: 'Petr Maly', userRole: 'ridic', action: 'Doruceni', productSku: 'CV-C70-RD42', storeName: 'Karlin → Chodov', details: 'Dorucen 1 ks Converse Chuck 70', category: 'transfer' },
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
    vedouci: 'Vedouci',
    prodavac: 'Prodavac',
    ridic: 'Ridic',
    majitel: 'Majitel',
  };
  return labels[role] ?? role;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    DRAFT: 'Koncept', REQUESTED: 'Pozadovano', APPROVED: 'Schvaleno',
    DISPUTED: 'Spor', IN_TRANSIT: 'V preprave', DELIVERED: 'Doruceno',
    REJECTED_AT_RECEIPT: 'Odmitnuto pri prijmu', RETURN_IN_TRANSIT: 'Vraceni',
    RETURNED_TO_SOURCE: 'Vraceno', CLOSED: 'Uzavreno',
    ACTIVE: 'Aktivni', EXPIRED: 'Expirovana', CANCELLED: 'Zrusena', FULFILLED: 'Splnena',
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
