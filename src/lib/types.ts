// ==================== TYPES ====================

export type Role = 'vedouci' | 'prodavac' | 'ridic' | 'majitel';

export type TransferStatus =
  | 'DRAFT'
  | 'REQUESTED'
  | 'APPROVED'
  | 'DISPUTED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'REJECTED_AT_RECEIPT'
  | 'RETURN_IN_TRANSIT'
  | 'RETURNED_TO_SOURCE'
  | 'CLOSED';

export type ReservationStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'FULFILLED';

export type DamageType = 'mechanical' | 'manufacturing' | 'packaging' | 'other';

export type DisputeReason =
  | 'last_piece'
  | 'reserved_local'
  | 'damaged'
  | 'other';

export type TransferReason =
  | 'customer_waiting'
  | 'restock'
  | 'other';

export interface Store {
  id: string;
  name: string;
  address: string;
  shortName: string;
}

export interface User {
  id: string;
  name: string;
  role: Role;
  storeId: string;
  pin: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  ean: string;
  category: string;
  size?: string;
  color?: string;
}

export interface StockEntry {
  productId: string;
  storeId: string;
  erpStock: number;
}

export interface Reservation {
  id: string;
  productId: string;
  storeId: string;
  quantity: number;
  customerName: string;
  customerPhone: string;
  note?: string;
  status: ReservationStatus;
  createdAt: string;
  expiresAt: string;
  createdBy: string;
  extensions: number;
}

export interface TransferRequest {
  id: string;
  productId: string;
  sourceStoreId: string;
  targetStoreId: string;
  quantity: number;
  status: TransferStatus;
  reason: TransferReason;
  reasonText?: string;
  disputeReason?: DisputeReason;
  disputeText?: string;
  createdAt: string;
  createdBy: string;
  approvedBy?: string;
  approvedAt?: string;
  arbitratedBy?: string;
  arbitratedAt?: string;
  deliveredAt?: string;
  note?: string;
}

export interface DamageReport {
  id: string;
  productId: string;
  storeId: string;
  quantity: number;
  damageType: DamageType;
  description: string;
  reportedBy: string;
  reportedAt: string;
  resolved: boolean;
  resolvedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'transfer' | 'arbitrage' | 'expiration' | 'delivery' | 'damage';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkedId?: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: Role;
  action: string;
  productSku?: string;
  storeName?: string;
  details: string;
  category: 'approval' | 'rejection' | 'transfer' | 'damage' | 'system';
}

export interface ManifestItem {
  transferId: string;
  productId: string;
  quantity: number;
  sourceStoreId: string;
  targetStoreId: string;
  actionType: 'LOAD' | 'UNLOAD';
  status: 'waiting' | 'done' | 'returned';
}
