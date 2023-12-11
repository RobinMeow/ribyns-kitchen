import { TokenKey } from './TokenKey';

export type DecodedToken = {
  [key in TokenKey]: string;
};
