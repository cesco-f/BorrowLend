export interface Exchange {
  id: number;
  accepted: boolean;
  isActiveBorr: boolean;
  isActiveLend: boolean;
  itemBorrowedId?: number;
  itemLentId?: number;
  userBorrowingId?: number;
  userLendingId?: number;
  createdAt: Date;
}
