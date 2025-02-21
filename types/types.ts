import {ReactNode} from 'react';
import {SOCIAL_PROVIDERS, WALLET_PROVIDERS} from './enums';
import {COOKIES_KEYS} from '@/constants/cookies';

export type SOCIAL_PROVIDERS_TYPE = (typeof SOCIAL_PROVIDERS)[keyof typeof SOCIAL_PROVIDERS];
export type WALLET_PROVIDERS_TYPE = (typeof WALLET_PROVIDERS)[keyof typeof WALLET_PROVIDERS];

export type ProfileWallet = {address: string; primary?: boolean};

export type UserProfileType = {
  id: string;
  username: string;
  description?: string;
  points?:number
  email?: string | null;
  google_image_url?: string;
  google_refresh_token?: string;
  youtube_verified?: boolean;
  twitter_username?: string;
  twitter_image_url?: string;
  twitter_refresh_token?: string;
  twitter_id?: string;
  telegram_username?: string | null;
  discord?: string | null;
  discord_username?: string;
  discord_image_url?: string;
  discord_refresh_token?: string;
  youtube_username?: string | null;
  instagram_username?: string | null;
  thumbnail_url?: string | null;
  banner_url?: string | null;
  wallets?: ProfileWallet[];
  referrer_code?: string;
};

export type SignInResponse = {
  token?: string;
  account_exist: boolean;
  profile: Partial<UserProfileType> | null;
  account?: UserProfileType;
  success?: boolean;
};

export type SOCIALS = {
  id: SOCIAL_PROVIDERS_TYPE;
  icon: string;
  account: string;
  linkedAccount: string;
  status: boolean;
  action?: ReactNode;
};

export type WhitelistSpot = {
  amount: number
  collectionId:string
  thumbnail:string
  name:string
  wallet:string
}
export type CookieKeys = (typeof COOKIES_KEYS)[keyof typeof COOKIES_KEYS];
