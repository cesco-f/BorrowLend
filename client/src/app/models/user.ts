import { Item } from './item';
import { Exchange } from './exchange';

export interface User {
  id: number;
  username: string;
  password: string;
  location: string;
  email: string;
  exchangesBorr?: Exchange[];
  exchangesLend?: Exchange[];
  toBorrowList?: Item[];
  toLendList?: Item[];
}
